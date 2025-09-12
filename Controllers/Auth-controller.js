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


module.exports={registerUser}
