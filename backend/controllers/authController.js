const User = require("../models/User");
const jwt = require("jsonwebtoken");

//generate jwt token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

//register user
const registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required()" });
  }

  try {
    //check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    //create the user
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });
    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
      message: "User registered successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Internal server error (registerUser) and error is " + error,
      });
  }
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All field are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
      message: "User logged in successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Internal server error (loginUser) and error is " + error,
      });
  }
};

//get user info
const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if(!user){
        return res.status(404).json({message: "User not found"});
    }

    res.status(200).json({user});
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Internal server error (getUserInfo) and error is " + error,
      });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserInfo,
};
