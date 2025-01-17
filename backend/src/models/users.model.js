import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
            index: true,
        },
        mobile: {
            type: String,
            required: false,
            unique: true,
            sparse: true,
            trim: true,
            validate: {
                validator: function(v) {
                    if (!v) return true; // Allow empty/null values
                    return /^\d{10}$/.test(v);
                },
                message: props => `${props.value} is not a valid 10-digit mobile number!`
            }
        },
        emailVerified: {
            type: Boolean,
            default: false,
            required: true
        },
        numberVerified: {
            type: Boolean,
            default: false,
            required: true
        },
        emailVerificationToken: String,
        emailVerificationTokenExpiry: Date,
        mobileVerificationOTP: String,
        mobileVerificationOTPExpiry: Date,
        alternateMobile: {
            type: String,
            required: false,
            unique: true,
            sparse: true,
            trim: true,
            validate: {
                validator: function(v) {
                    if (!v) return true; // Allow empty/null values
                    return /^\d{10}$/.test(v);
                },
                message: props => `${props.value} is not a valid 10-digit mobile number!`
            }
        },
        password: {
            type: String,
            required: false,
        },
        role: {
            type: String,
            required: true,
        },
        googleAuthId: {
            type: String,
            required: false,
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date
    },
    {
        timestamps: true,
    }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to check password
UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Method to generate access token
UserSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName,
            role: this.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        }
    );
};

UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
        }
    );
};

export const User = mongoose.model("User", UserSchema);
