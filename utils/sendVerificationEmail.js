import SendEmail from "./SendEmail.js";

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;
  const message = `<p>Please confirm your email by clicking on the following link :<a href="${verifyEmail}">verify email</a></p>`;
  return SendEmail({
    to: email,
    subject: "Email Confirmation",
    html: `Hello ${name}, ${message}`,
  });
};
export default sendVerificationEmail