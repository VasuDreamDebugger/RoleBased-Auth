const jwt =require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const USER = require("../Models/User");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //check if user exists

    const checkUserExistince = await USER.findOne({
      $or: [{ username }, { email }],
    });

    if (checkUserExistince) {
      res.status(400).json({
        success: false,
        message: "User already Exists",
      });
    } else {
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new USER({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(200).json({
        success: true,
        message: "User registered Successfully",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    //check if user exists
    const user = await USER.findOne({ username });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "username doesn't exist",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: "15m" }
    );

    if(accessToken){
      res.status(200).json({
        success:true,
        message:"Login successful",
        accessToken
      })
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { registerUser, loginUser };
