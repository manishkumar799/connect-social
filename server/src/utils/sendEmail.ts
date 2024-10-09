import nodemailer, { SentMessageInfo } from "nodemailer";
import transporter from "./../config/nodemailer.config";

const sendEmail = async (message:object) => {
  const info:SentMessageInfo = await transporter.sendMail(message);
  return {
    messageId: info.messageId,
    previewUrl: nodemailer.getTestMessageUrl(info),
  };
};
export default sendEmail;
