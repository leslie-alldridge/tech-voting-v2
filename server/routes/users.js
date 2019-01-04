let router = require("express").Router();
const nodemailer = require("nodemailer");
const crypto = require("crypto");

let { getUsers, emailExists, userResetReq } = require("../db/users");

router.get("/all", (req, res) => {
  getUsers().then(data => {
    res.json(data);
  });
});

router.post("/forgot", (req, res) => {
  console.log(req.body);

  emailExists(req.body.email).then(user => {
    console.log(user);

    if (user === undefined) {
      console.log("email not in database");
      res.json("email not in db");
    } else {
      const token = crypto.randomBytes(20).toString("hex");
      userResetReq(req.body.email, token, Date.now() + 360000);
      console.log(process.env.EMAIL_ADDRESS);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: `${process.env.EMAIL_ADDRESS}`,
          pass: `${process.env.EMAIL_PASSWORD}`
        }
      });

      const mailOptions = {
        from: `lesliedevtest1@gmail.com`,
        to: `${req.body.email}`,
        subject: `Link To Reset Password`,
        text:
          `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
          `Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n` +
          `https://users-leslie.herokuapp.com/#/reset/${token}\n\n` +
          `If you did not request this, please ignore this email and your password will remain unchanged.\n`
      };

      console.log("sending mail");

      transporter.sendMail(mailOptions, function(err, response) {
        if (err) {
          console.error("there was an error: ", err);
        } else {
          console.log("here is the res: ", response);
          res.status(200).json("recovery email sent");
        }
      });
    }
  });
});

router.post("/password", (req, res) => {
  console.log(req.body);
});

module.exports = router;
