import { User } from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    //Get form data from req body
    const { userName, email, password, confirmPassword, role } = req.body;

    //Check if userName already exists
    const uName = await User.findOne({ userName });
    if (uName)
      throw new Error(
        "User Name is already taken ! Please enter a different User Name"
      );

    //Check if email is already registered
    const mail = await User.findOne({ email });
    if (mail)
      throw new Error(
        "This Email is already registered ! Please go to Login Page"
      );

    //Check userName and email together
    // const checkExisitingUser = await User.findOne({
    //   $or: [{ userName }, { email }],
    // });
    // if (checkExisitingUser)
    //   throw new Error("User Name or Email is already registered !");

    // Password regex validation (before hashing)
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new Error(
        "Password must contain at least one uppercase, one lowercase, one number, and one special character"
      );
    }

    //Check if password and confirmPassword fields have same value
    if (password !== confirmPassword)
      throw new Error("Password and Confirm Password do not match !");

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create new user
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    if (newUser)
      //201 = created
      res.status(201).json({
        success: true,
        message: "User was created successfully !",
        data: newUser,
      });
    else throw new Error("Failer to register !");
  } catch (error) {
    //Status 500= Internal Server Error
    res.status(500).json({
      success: false,
      message: `${error.message}`,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    //Find if user is registered
    const user = await User.findOne({ userName });

    if (user) {
      //Check if password matches
      //Takes a string and a hash value and compares to see if both are same
      const validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {
        const accessToken = jwt.sign(
          {
            userId: user._id,
            userName: user.userName,
            role: user.role,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "2d",
          }
        );

        res.status(200).json({
          success: true,
          message: "Logged in Successfully !",
          data: accessToken,
        });
      } else {
        res.status(400).json({ message: "Incorrect Password !" });
      }
    } else {
      throw new Error(
        "User Name is not Registered. Please Go to Sign Up Page !"
      );
    }
  } catch (error) {
    //Status 500= Internal Server Error
    res.status(500).json({
      success: false,
      message: `${error.message}`,
    });
  }
};
