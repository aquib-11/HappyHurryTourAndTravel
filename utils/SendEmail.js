import nodemailer from "nodemailer";

const SendEmail = async ({to, subject, html}) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "micaela11@ethereal.email",
      pass: "za1Rc9eNNbmCPqqb7v",
    },
  });

      const info = await transporter.sendMail({
        from: '"Aquib Ahmad" <aquib445488@gmail.com>', // sender address
       to,
       subject, 
       html,
      });
};

export default SendEmail