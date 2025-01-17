import { Router } from 'express';
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    forgotPassword,
    resetPassword,
    changeCurrentPassword,
    getCurrentUser,
    updateUserProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    getAllAddresses,
    getDefaultAddress,
    getAllSessions,
    terminateSession,
    terminateAllSessions,
    verifyEmail,
    verifyMobile,
    sendVerificationSMS,
    resendVerificationEmail,
    deleteUser,
    deleteMyAccount
} from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

// Authentication routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/refresh-token', refreshAccessToken);

// Verification routes
router.get('/verify-email/:token', verifyEmail);
router.post('/resend-verification-email', resendVerificationEmail);
router.post('/send-mobile-verification', authenticate, sendVerificationSMS);
router.post('/verify-mobile', authenticate, verifyMobile);

// Password management routes
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/change-password', authenticate, changeCurrentPassword);

// Profile routes
router.get('/me', authenticate, getCurrentUser);
router.patch('/update-profile', authenticate, updateUserProfile);

// Address routes
router.post('/addresses', authenticate, addAddress);
router.patch('/addresses/:addressId', authenticate, updateAddress);
router.delete('/addresses/:addressId', authenticate, deleteAddress);
router.get('/addresses', authenticate, getAllAddresses);
router.get('/addresses/default', authenticate, getDefaultAddress);

// Session management routes
router.get('/sessions', authenticate, getAllSessions);
router.delete('/sessions/:sessionId', authenticate, terminateSession);
router.delete('/sessions', authenticate, terminateAllSessions);

// Account deletion routes
router.delete('/delete-account', authenticate, deleteMyAccount); // Delete own account
router.delete('/:userId', authenticate, deleteUser); // Admin route to delete any user

export default router;
