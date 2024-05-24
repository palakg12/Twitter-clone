const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/Usermodel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    
   
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
  
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  console.log(email,password)
  // Check for user email
  const user = await User.findOne({ email })
console.log(user)
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      followers: [],
    following: [],
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return next(new ErrorHandler(400, "Email Required"));
    }

    if (!validatemail(email)) {
      return next(new ErrorHandler(400, "Incorrect email format provided"));
    }

    const isUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!isUser) {
      return next(new ErrorHandler(400, "User by this email does not exist"));
    }
    // console.log(isUser);
    const OTPtoMail = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // console.log(OTPtoMail);

    mailer.sendEmail(email, OTPtoMail);

    const findOtp = await Otp.findOne({ email });

    // console.log(findOtp, "find otp");
    if (findOtp) {
      let date = new Date();
      date = date.getTime() / 1000;
      // console.log(date, "date");
      let otpDate = new Date(findOtp.updatedAt);
      otpDate = otpDate.getTime() / 1000;
      // console.log(otpDate, "otp date");
      // console.log(date, otpDate);
      if (date < otpDate + 10) {
        return next(new ErrorHandler(400, "Wait for some time resend otp"));
      }
    }

    if (findOtp) {
      findOtp.otp = OTPtoMail;
      await findOtp.save();
    } else {
      Otp.create({
        email: email.toLowerCase(),
        otp: OTPtoMail,
      });
    }

    return res.status(200).json({
      success: true,
      msg: `OTP sent on Email ${email}`,
    });
  } catch (error) {
    next(error);
  }
};

const OtpVerify = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email) {
      return next(new ErrorHandler(400, "Email Required for otp verification"));
    }

    if (!otp) {
      return next(new ErrorHandler(400, "OTP Required for verification"));
    }

    if (!validatemail(email)) {
      return next(new ErrorHandler(400, "Incorrect Email format."));
    }

    const findOtp = await Otp.findOne({
      email: email,
    });
    // console.log(findOtp);
    if (!findOtp) {
      return next(new ErrorHandler(400, "Otp is expired."));
    }

    // console.log(findOtp);
    if (findOtp.otp != otp) {
      return next(new ErrorHandler(400, "Incorrect Otp"));
    }

    await findOtp.save();

    const findUser = await User.findOne({
      email: email.toLowerCase(),
    });
    var user;
    user = findUser;
    // console.log(user);

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_ACCESS_KEY,
      {
        expiresIn: "1d",
      }
    );
    if (user) {
      return res
        .status(200)
        .json({ success: true, msg: "OTP Verified.", token });
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  forgotPassword,
  OtpVerify
}
