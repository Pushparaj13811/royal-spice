interface UserProfile {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
}

export async function updateUserProfile(data: UserProfile): Promise<void> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
}