let router = require("express").Router();
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const BCRYPT_SALT_ROUNDS = 12;

let {
  getUsers,
  emailExists,
  userResetReq,
  findToken,
  userExists,
  updateUserPassword
} = require("../db/users");

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
  userExists(req.body.user).then(user => {
    if (user != null) {
      console.log("user exists in db");
      bcrypt
        .hash(req.body.password, BCRYPT_SALT_ROUNDS)
        .then(hashedPassword => {
          updateUserPassword(req.body.user, hashedPassword);
        })
        .then(data => {
          console.log("password updated");
          console.log(data);

          res.status(200).send({ message: "password updated" });
        });
    } else {
      console.log("no user exists in db to update");
      res.status(404).json("no user exists in db to update");
    }
  });
});

router.get("/reset", (req, res) => {
  findToken(req.query.resetPasswordToken).then(user => {
    if (user == null) {
      console.log("password reset link is invalid or has expired");
      res.json("password reset link is invalid or has expired");
    } else {
      console.log("good link");

      res.status(200).send({
        username: user.user_name,
        message: "password reset link a-ok"
      });
    }
  });
});

module.exports = router;
