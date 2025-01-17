// Combines user management, authentication, sessions, and address management.
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/users.model.js";
import { Session } from "../models/sessions.model.js";
import { Address } from "../models/addresses.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";
import generateVerificationEmail from "../utils/emailVerifications.js";

const generateAccessAndRefreshTokens = async (userId, deviceInfo = "", userAgent = "", ipAddress = "") => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // Create or update session
        await Session.findOneAndUpdate(
            { userId: user._id, deviceInfo },
            {
                refreshToken,
                deviceInfo,
                userAgent,
                ipAddress,
                isActive: true
            },
            { upsert: true, new: true }
        );

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
};

// Cookie options
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // secure in production
    sameSite: "strict",
    path: "/",
    domain: process.env.NODE_ENV === "production" ? process.env.DOMAIN : "localhost",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, mobile } = req.body;

    if (!fullName || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(409, "User with email already exists");
    }

    // Generate email verification token
    const emailVerificationToken = crypto.randomBytes(20).toString("hex");
    const emailVerificationTokenExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    const user = await User.create({
        fullName,
        email,
        password,
        mobile: mobile || null,
        role: "user",
        emailVerificationToken,
        emailVerificationTokenExpiry
    });

    // Remove sensitive fields from the response
    const createdUser = await User.findById(user._id).select("-password -emailVerificationToken -emailVerificationTokenExpiry");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    const verificationUrl = `${req.protocol}://${req.get(
        "host"
    )}/api/v1/users/verify-email/${emailVerificationToken}`;
    // Send verification email before responding
    const emailContent = generateVerificationEmail(user.fullName, verificationUrl);
    await sendEmail({
        email: user.email,
        subject: "Verify your email",
        message: emailContent,
        html: emailContent
    });

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully. Please verify your email.")
    );
});

const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.params;

    const user = await User.findOne({
        emailVerificationToken: token,
        emailVerificationTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
        throw new ApiError(400, "Invalid or expired verification token");
    }

    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpiry = undefined;

    await user.save({ validateBeforeSave: false });

    return res.status(200).json(
        new ApiResponse(200, {}, "Email verified successfully")
    );
});

const sendVerificationSMS = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user.mobile) {
        throw new ApiError(400, "No mobile number associated with account");
    }

    if (user.numberVerified) {
        throw new ApiError(400, "Mobile number already verified");
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    user.mobileVerificationOTP = otp;
    user.mobileVerificationOTPExpiry = otpExpiry;
    await user.save({ validateBeforeSave: false });

    // Here you would integrate with an SMS service to send the OTP
    // For now, we'll just console.log it
    console.log(`OTP for ${user.mobile}: ${otp}`);

    return res.status(200).json(
        new ApiResponse(200, {}, "OTP sent successfully")
    );
});

const verifyMobile = asyncHandler(async (req, res) => {
    const { otp } = req.body;

    if (!otp) {
        throw new ApiError(400, "OTP is required");
    }

    const user = await User.findById(req.user._id);

    if (!user.mobileVerificationOTP || !user.mobileVerificationOTPExpiry) {
        throw new ApiError(400, "Please request a new OTP");
    }

    if (Date.now() > user.mobileVerificationOTPExpiry) {
        throw new ApiError(400, "OTP has expired");
    }

    if (otp !== user.mobileVerificationOTP) {
        throw new ApiError(400, "Invalid OTP");
    }

    user.numberVerified = true;
    user.mobileVerificationOTP = undefined;
    user.mobileVerificationOTPExpiry = undefined;

    await user.save({ validateBeforeSave: false });

    return res.status(200).json(
        new ApiResponse(200, {}, "Mobile number verified successfully")
    );
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const deviceInfo = req.headers["user-agent"] || "";
    const ipAddress = req.ip;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new ApiError(401, "Invalid credentials");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    if (!user.emailVerified) {
        throw new ApiError(403, "Please verify your email before logging in");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        user._id,
        deviceInfo,
        deviceInfo,
        ipAddress
    );

    const loggedInUser = await User.findById(user._id).select("-password");

    // Set cookies
    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,
                accessToken,
                refreshToken
            },
            "User logged in successfully"
        )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
    try {
        // Get user ID from either auth middleware or refresh token
        let userId;
        const refreshToken = req.cookies.refreshToken;

        if (req.user?._id) {
            // User is authenticated through middleware
            userId = req.user._id;
        } else if (refreshToken) {
            // Try to get user from refresh token
            try {
                const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                userId = decoded._id;
            } catch (error) {
                // Invalid or expired refresh token, just clear cookies
                console.log("Invalid refresh token during logout:", error);
            }
        }

        if (userId) {
            // Deactivate all sessions for this user
            await Session.updateMany(
                { userId },
                { isActive: false }
            );
        }

        // Clear cookies in all cases
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            domain: process.env.NODE_ENV === "production" ? process.env.DOMAIN : "localhost"
        });
        
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            domain: process.env.NODE_ENV === "production" ? process.env.DOMAIN : "localhost"
        });

        return res.status(200).json(
            new ApiResponse(200, {}, "Logged out successfully")
        );
    } catch (error) {
        // Even if there's an error, try to clear cookies
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        
        console.error("Error during logout:", error);
        return res.status(200).json(
            new ApiResponse(200, {}, "Logged out successfully")
        );
    }
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    const deviceInfo = req.headers["user-agent"] || "";
    const ipAddress = req.ip;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Refresh token is required");
    }

    try {
        // Verify the refresh token
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        // Find the session with this refresh token
        const session = await Session.findOne({
            userId: decodedToken?._id,
            refreshToken: incomingRefreshToken,
            isActive: true
        });

        if (!session) {
            throw new ApiError(401, "Invalid refresh token or session expired");
        }

        // Find the user
        const user = await User.findById(decodedToken?._id);
        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        // Generate new tokens
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
            user._id,
            deviceInfo,
            deviceInfo,
            ipAddress
        );

        // Set new cookies
        res.cookie("accessToken", accessToken, cookieOptions);
        res.cookie("refreshToken", refreshToken, cookieOptions);

        return res.status(200).json(
            new ApiResponse(
                200,
                { accessToken, refreshToken },
                "Access token refreshed successfully"
            )
        );
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new ApiError(401, "Refresh token has expired");
        }
        if (error instanceof jwt.JsonWebTokenError) {
            throw new ApiError(401, "Invalid refresh token");
        }
        throw error;
    }
});

const resendVerificationEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.emailVerified) {
        throw new ApiError(400, "Email is already verified");
    }

    // Generate new verification token
    const emailVerificationToken = crypto.randomBytes(20).toString("hex");
    const emailVerificationTokenExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    user.emailVerificationToken = emailVerificationToken;
    user.emailVerificationTokenExpiry = emailVerificationTokenExpiry;
    await user.save({ validateBeforeSave: false });

    const verificationUrl = `${req.protocol}://${req.get(
        "host"
    )}/api/v1/users/verify-email/${emailVerificationToken}`;
    
    const emailContent = generateVerificationEmail(user.fullName, verificationUrl);
    await sendEmail({
        email: user.email,
        subject: "Verify your email",
        message: emailContent,
        html: emailContent
    });

    return res.status(200).json(
        new ApiResponse(200, {}, "Verification email sent successfully")
    );
});

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get(
        "host"
    )}/api/v1/users/reset-password/${resetToken}`;

    const message = `Your password reset link is:\n\n${resetUrl}\n\nIf you have not requested this email, please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: "Royal Spice Password Recovery",
            message,
        });

        res.status(200).json(
            new ApiResponse(
                200,
                {},
                `Email sent to: ${user.email}`
            )
        );
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        throw new ApiError(500, "Email could not be sent");
    }
});

const resetPassword = asyncHandler(async (req, res) => {
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        throw new ApiError(400, "Invalid or expired reset token");
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Password reset successful"
        )
    );
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "Current user fetched successfully"));
});

const updateUserProfile = asyncHandler(async (req, res) => {
    const { fullName, mobile, alternateMobile } = req.body;

    if (!fullName) {
        throw new ApiError(400, "Full name is required");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                mobile: mobile || null,
                alternateMobile: alternateMobile || null
            }
        },
        { new: true }
    ).select("-password -refreshToken");

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Profile updated successfully"));
});

// Address Management
const addAddress = asyncHandler(async (req, res) => {
    const {
        addressType,
        addressLine1,
        addressLine2,
        city,
        state,
        country,
        postalCode,
        isDefault
    } = req.body;

    if (!addressLine1 || !city || !state || !country || !postalCode) {
        throw new ApiError(400, "Required address fields are missing");
    }

    if (isDefault) {
        // Remove default status from other addresses
        await Address.updateMany(
            { userId: req.user._id },
            { $set: { isDefault: false } }
        );
    }

    const address = await Address.create({
        userId: req.user._id,
        addressType: addressType || "Home",
        addressLine1,
        addressLine2,
        city,
        state,
        country,
        postalCode,
        isDefault: isDefault || false
    });

    console.log(address)

    return res
        .status(201)
        .json(new ApiResponse(201, address, "Address added successfully"));
});

const updateAddress = asyncHandler(async (req, res) => {
    const { addressId } = req.params;
    const {
        addressType,
        addressLine1,
        addressLine2,
        city,
        state,
        country,
        postalCode,
        isDefault
    } = req.body;

    const address = await Address.findOne({
        _id: addressId,
        userId: req.user._id
    });

    if (!address) {
        throw new ApiError(404, "Address not found");
    }

    if (isDefault) {
        // Remove default status from other addresses
        await Address.updateMany(
            { userId: req.user._id, _id: { $ne: addressId } },
            { $set: { isDefault: false } }
        );
    }

    Object.assign(address, {
        addressType: addressType || address.addressType,
        addressLine1: addressLine1 || address.addressLine1,
        addressLine2: addressLine2 || address.addressLine2,
        city: city || address.city,
        state: state || address.state,
        country: country || address.country,
        postalCode: postalCode || address.postalCode,
        isDefault: isDefault || address.isDefault
    });

    await address.save();

    return res
        .status(200)
        .json(new ApiResponse(200, address, "Address updated successfully"));
});

const deleteAddress = asyncHandler(async (req, res) => {
    const { addressId } = req.params;

    const address = await Address.findOneAndDelete({
        _id: addressId,
        userId: req.user._id
    });

    if (!address) {
        throw new ApiError(404, "Address not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Address deleted successfully"));
});

const getAllAddresses = asyncHandler(async (req, res) => {
    const addresses = await Address.find({ userId: req.user._id });

    return res
        .status(200)
        .json(new ApiResponse(200, addresses, "Addresses fetched successfully"));
});

const getDefaultAddress = asyncHandler(async (req, res) => {
    const address = await Address.findOne({
        userId: req.user._id,
        isDefault: true
    });

    if (!address) {
        throw new ApiError(404, "No default address found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, address, "Default address fetched successfully"));
});

// Session Management
const getAllSessions = asyncHandler(async (req, res) => {
    const sessions = await Session.find({ userId: req.user._id });

    return res
        .status(200)
        .json(new ApiResponse(200, sessions, "Sessions fetched successfully"));
});

const terminateSession = asyncHandler(async (req, res) => {
    const { sessionId } = req.params;

    const session = await Session.findOneAndDelete({
        _id: sessionId,
        userId: req.user._id
    });

    if (!session) {
        throw new ApiError(404, "Session not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Session terminated successfully"));
});

const terminateAllSessions = asyncHandler(async (req, res) => {
    await Session.updateMany({ userId: req.user._id }, { isActive: false });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "All sessions terminated successfully"));
});

const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Check if the requesting user has permission
    // Only allow users to delete their own account or admin/superadmin to delete any account
    if (req.user.role !== "superadmin" &&
        req.user.role !== "admin" &&
        req.user._id.toString() !== userId) {
        throw new ApiError(403, "You don't have permission to delete this account");
    }

    // Delete all sessions for the user
    await Session.deleteMany({ userId });

    // Delete the user
    await User.findByIdAndDelete(userId);

    // If user is deleting their own account, logout
    if (req.user._id.toString() === userId) {
        // Clear refresh token cookie
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true
        });
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "User deleted successfully")
    );
});

const deleteMyAccount = asyncHandler(async (req, res) => {
    // Delete all sessions
    await Session.deleteMany({ userId: req.user._id });

    // Delete the user
    await User.findByIdAndDelete(req.user._id);

    // Clear refresh token cookie
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true
    });

    return res.status(200).json(
        new ApiResponse(200, {}, "Your account has been deleted successfully")
    );
});

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateUserProfile,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendVerificationEmail,
    verifyMobile,
    sendVerificationSMS,
    addAddress,
    updateAddress,
    deleteAddress,
    getAllAddresses,
    getDefaultAddress,
    getAllSessions,
    terminateSession,
    terminateAllSessions,
    deleteUser,
    deleteMyAccount
};