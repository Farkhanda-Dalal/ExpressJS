import { Schema, model } from "mongoose";

//require, minLength, maxLength, min, max, enum, match, lowercase, uppercase etc are autofire
//However, uniques needs to be checked in controller

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "User Name is required"],
      maxLength: [100, "User Name cannot be greater than 100 charachters"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: [true, "Email should only contail lowercase letters !"],
      match: [/^\S+@\S+\.\S+$/, "Please Enter valid email "], //Checks if email has @sign and domain name part after .
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password  field is required"],
      minLength: [8, "Password must alteast have 8 charachters"],
      //Dont put regex matching here as it will not match after the password is hashed
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
