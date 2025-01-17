import { createSlice } from '@reduxjs/toolkit';
import { UserState } from './userTypes';
import {
    getCurrentUser,
    updateProfile,
    changePassword,
    addAddress,
    updateAddress,
    deleteAddress,
    getAllAddresses,
    getAllSessions,
    terminateSession,
    terminateAllSessions,
    deleteAccount
} from './userThunks';

const initialState: UserState = {
    profile: null,
    sessions: [],
    loading: false,
    error: null,
    successMessage: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUserError: (state) => {
            state.error = null;
        },
        clearSuccessMessage: (state) => {
            state.successMessage = null;
        },
        resetUserState: () => initialState
    },
    extraReducers: (builder) => {
        // Get Current User
        builder
            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Update Profile
        builder
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
                state.successMessage = 'Profile updated successfully';
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Change Password
        builder
            .addCase(changePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.loading = false;
                state.successMessage = 'Password changed successfully';
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Add Address
        builder
            .addCase(addAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.loading = false;
                if (state.profile && state.profile.addresses) {
                    state.profile.addresses.push(action.payload);
                }
                state.successMessage = 'Address added successfully';
            })
            .addCase(addAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Update Address
        builder
            .addCase(updateAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                state.loading = false;
                if (state.profile && state.profile.addresses) {
                    const index = state.profile.addresses.findIndex(addr => addr._id === action.payload._id);
                    if (index !== -1) {
                        state.profile.addresses[index] = action.payload;
                    }
                }
                state.successMessage = 'Address updated successfully';
            })
            .addCase(updateAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Delete Address
        builder
            .addCase(deleteAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.loading = false;
                if (state.profile && state.profile.addresses) {
                    state.profile.addresses = state.profile.addresses.filter(
                        addr => addr._id !== action.meta.arg
                    );
                }
                state.successMessage = 'Address deleted successfully';
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Get All Addresses
        builder
            .addCase(getAllAddresses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllAddresses.fulfilled, (state, action) => {
                state.loading = false;
                if (state.profile) {
                    state.profile.addresses = action.payload;
                }
            })
            .addCase(getAllAddresses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Get All Sessions
        builder
            .addCase(getAllSessions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllSessions.fulfilled, (state, action) => {
                state.loading = false;
                state.sessions = action.payload;
            })
            .addCase(getAllSessions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Terminate Session
        builder
            .addCase(terminateSession.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(terminateSession.fulfilled, (state, action) => {
                state.loading = false;
                state.sessions = state.sessions.filter(
                    session => session._id !== action.meta.arg
                );
                state.successMessage = 'Session terminated successfully';
            })
            .addCase(terminateSession.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Terminate All Sessions
        builder
            .addCase(terminateAllSessions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(terminateAllSessions.fulfilled, (state) => {
                state.loading = false;
                state.sessions = [];
                state.successMessage = 'All sessions terminated successfully';
            })
            .addCase(terminateAllSessions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Delete Account
        builder
            .addCase(deleteAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAccount.fulfilled, () => {
                return initialState;
            })
            .addCase(deleteAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearUserError, clearSuccessMessage, resetUserState } = userSlice.actions;
export default userSlice.reducer;