import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    try {
        // Create transporter for Zoho
        const transporter = nodemailer.createTransport({
            host: 'smtp.zoho.in', // Zoho India SMTP server
            port: 465, // SSL port
            secure: true, // Use SSL
            auth: {
                user: process.env.ZOHO_MAIL,
                pass: process.env.ZOHO_PASSWORD
            }
        });

        // Log configuration (remove in production)
        console.log("Email Configuration:", {
            from: process.env.ZOHO_MAIL,
            service: 'Zoho'
        });

        // Prepare mail options
        const mailOptions = {
            from: `"${process.env.MAIL_FROM_NAME}" <${process.env.ZOHO_MAIL}>`,
            to: options.email,
            subject: options.subject,
            text: options.message, // Plain text version
            html: options.html || options.message // HTML version
        };

        // Log email attempt (remove in production)
        console.log("Sending email to:", options.email);

        // Verify SMTP connection
        await transporter.verify();
        console.log("SMTP connection verified");

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.messageId);
        return info;
    } catch (error) {
        console.error("Email sending failed:", {
            error: error.message,
            name: error.name,
            stack: error.stack,
            code: error.code
        });
        throw new Error(`Failed to send email: ${error.message}`);
    }
};

export { sendEmail };
