const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (email, otp) => {
  try {
    const msg = {
      from: "palak21scse1010804@galgotiasuniversity.edu.in",
      to: email,
      subject: ` Your OTP is ${otp}`,
      html: `  <div>
          <h1>Welcome!!!!</h1>
          <p>your OTP is </p>
          <h1>${otp}</h1>
        </div>`,
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      // secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    transporter.sendMail(msg, (err) => {
      if (err) {
        console.log(err);
        return false;
      } else {
        console.log("Mail sent successfully");
        return true;
      }
    });
  } catch (error) {
    // return next(error);
    console.log(error);
  }
};

module.exports = { sendEmail };
