const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express();
const otpGenerator = require("otp-generator");
const transporter = require("../utils/mailer");
const Otp = require("../models/Otp");
const axios = require("axios");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/user-signup", async (req, res) => {
  const { username, email, password } = req.body.formData;
  const { otp } = req.body;

  try {
    const existingOtp = await Otp.findOne({ email });

    if (!existingOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or not found. Please request a new one.",
      });
    }

    if (existingOtp.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please try again.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    await Otp.deleteOne({ email });

    res
      .status(201)
      .json({ success: true, message: "Registered successfully!" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
});

router.post("/send-otp", async (req, res) => {
  const { username, email } = req.body.formData;
  if (!email)
    return res.status(400).json({ success: false, message: "Email required" });

  const existingEmail = await User.findOne({ email });
  const existingUsername = await User.findOne({ username });

  if (existingEmail) {
    return res
      .status(409)
      .send({ success: false, message: "Email is already in use!" });
  }

  if (existingUsername) {
    return res
      .status(409)
      .send({ success: false, message: "Username is already taken!" });
  }

  const existingOtp = await Otp.findOne({ email });

  if (existingOtp) {
    return res.status(429).json({
      success: false,
      message: "OTP already sent. Please try again after 5 minutes.",
    });
  }

  const otp = otpGenerator.generate(4, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });

  try {
    var mailOptions = {
      from: "TripTogether <triptogether11@gmail.com>",
      to: email,
      subject: "🔐 Verify Your Email - TripTogether OTP Inside!",
      html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #2e86de;">Welcome to TripTogether! 🌍</h2>
      <p>Hi there,</p>
      <p>We're thrilled to have you onboard. To verify your email address, please use the verification code below:</p>
      <div style="font-size: 24px; font-weight: bold; background: #f1f1f1; padding: 10px 20px; display: inline-block; border-radius: 8px; margin: 15px 0;">
        ${otp}
      </div>
      <p>This code will expire in <strong>5 minutes</strong>.</p>
      <p>If you did not request this, please ignore this message.</p>
      <br/>
      <p>Cheers,</p>
      <p><strong>The TripTogether Team</strong></p>
    </div>
  `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    const otpEntry = new Otp({ email, otp });
    await otpEntry.save();

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Mail error:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

router.post("/user-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      res.send({ success: false, message: "User does not exist!" });
    } else {
      const match = bcrypt.compare(password, existingUser.password);

      if (match) {
        var token = jwt.sign(
          {
            userID: existingUser._id,
            email: existingUser.email,
            username: existingUser.username,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "15d" }
        );

        res
          .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
          })
          .send({
            success: true,
            message: "Logged In Successfully!",
            user: {
              _id: existingUser._id,
              username: existingUser.username,
              email: existingUser.username,
            },
          });
      } else {
        res.send({ success: false, message: "Invalid credentails!" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/google-signup", async (req, res) => {
  const { googleToken } = req.body;

  try {
    const googleRes = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${googleToken}`,
        },
      }
    );

    const { email, name, picture } = googleRes.data;

    const generateUniqueUsername = async (baseName) => {
      let username;
      let exists = true;

      baseName = baseName.toLowerCase().replace(/\s+/g, "");

      while (exists) {
        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        username = `${baseName}${randomSuffix}`;
        exists = await User.findOne({ username });
      }

      return username;
    };

    let user = await User.findOne({ email });

    if (!user) {
      const username = await generateUniqueUsername(name);
      user = new User({ username, email, profilePic: picture });
      await user.save();
    }

    const token = jwt.sign(
      {
        userID: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
      })
      .status(200)
      .send({
        success: true,
        message: "Logged in successfully",
        user: {
          username: user.username,
          _id: user._id,
        },
      });
  } catch (err) {
    console.error("Error fetching Google user info:", err.message);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
});

router.get('/getUser', authMiddleware, (req, res) => {
  res.send({
    success: true,
    user: req.user,
  });
})

module.exports = router;
