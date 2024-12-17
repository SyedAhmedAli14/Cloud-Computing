import { sendEmail } from "firebase-functions/v2/https";  // Replace with actual email sending service if needed

export const sendEmailNotification = async (email, cities) => {
  try {
    const emailContent = `Your favorite cities list has been updated to: ${cities.join(", ")}`;
    
    // You can use Firebase Cloud Functions or an external API to send emails
    await sendEmail({
      to: email,
      subject: "Favorite Cities Updated",
      body: emailContent,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};