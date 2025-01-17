const generateVerificationEmail = (verificationUrl, userName) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
  <div style="text-align: center; margin-bottom: 20px;">
    <img src="https://example.com/logo.png" alt="Swarnuts Logo" style="width: 150px;">
  </div>

  <h1 style="color: #333; font-size: 24px; text-align: center;">Welcome to Swarnuts, ${userName}!</h1>
  
  <p style="color: #555; font-size: 16px; text-align: center; line-height: 1.6;">
    Thank you for registering with us! To complete your registration, please verify your email address by clicking the button below:
  </p>

  <div style="text-align: center; margin: 30px 0;">
    <a href="${verificationUrl}" 
       style="background-color: #4CAF50; color: #fff; padding: 12px 25px; 
              text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; display: inline-block;">
      Verify Email Address
    </a>
  </div>

  <p style="color: #777; font-size: 14px; line-height: 1.6;">
    If the button above doesn't work, copy and paste the following link into your browser:
  </p>
  <p style="color: #3a7afe; font-size: 14px; word-wrap: break-word; text-align: center;">
    <a href="${verificationUrl}" style="color: #3a7afe; text-decoration: none;">${verificationUrl}</a>
  </p>

  <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

  <p style="color: #999; font-size: 12px; text-align: center; line-height: 1.6;">
    If you did not create an account with Swarnuts, please ignore this email.<br>
    For any questions, contact our support team at 
    <a href="mailto:support@swarnuts.com" style="color: #3a7afe; text-decoration: none;">support@swarnuts.com</a>.
  </p>

  <div style="text-align: center; margin-top: 20px;">
    <a href="https://example.com" style="color: #3a7afe; text-decoration: none; font-size: 14px;">Visit our website</a>
  </div>
</div>
`;

export default generateVerificationEmail;
