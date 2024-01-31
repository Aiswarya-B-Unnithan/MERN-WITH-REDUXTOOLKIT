import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";
import Admin from "../models/adminModel.js";
// import bcryptjs from 'bcryptjs';
import { generateadminToken } from "../utils/generateToken.js";

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await password) === admin.password) {
    console.log("  admin");
    generateadminToken(res, admin._id);

    res.status(201).json({
      message: "Logged in Successfully",
      _id: admin._id,
      email: admin.email,
      name: admin.name,
    });
  } else {
    res.status(401);
    throw new Error("invalid Credentials");
  }
});

const logout = asyncHandler(async (req, res) => {
  res.cookie("admintoken", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "admin loggged out" });
});

const addUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  const user = req.body;
console.log("req.body step3",req.body)
  const userExists = await User.findOne({ email });
  if (userExists) {
   return res.status(400).json({ message: "User already exists" });
  } else {
    const newUser = new User(user);
    console.log("adduser", newUser);
    try {
      await newUser.save();
    return  res.status(201).json(newUser);
    } catch (error) {
     return res.status(404).json({ message: error.message });
    }
    res.status(200).json({ message: "User added successfully" });
  }
});

const searchUsers = asyncHandler(async (req, res) => {
  const { name } = req.query;
  console.log("name", name);

  try {
    // Use a regular expression to perform a case-insensitive search by name
    const users = await User.find({ name: { $regex: new RegExp(name, "i") } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const allUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    res.status(404);
  }
};

// const editUser = async (req, res) => {
//     let user = req.body
//     const editUser = new User(user)
//     console.log(user, 'edit user')
//     try {
//         await User.updateOne({ _id: req.params.id }, editUser)
//         res.status(201).json(editUser)

//     } catch (error) {
//         res.status(409)
//     }
// };
const editUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user, "==user");
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      const updatedUser = await user.save();

      return res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    } else {
      res.status(404);
      // throw new Error('User Not Found')
    }
    //   return  res.status(200).json({ message: "updated User" })
  } catch (error) {
    console.log(error.message);
  }
});

const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "user delete sucessfully" });
  } catch (error) {
    res.status(400).json({ message: "djgdjgdjhjd" });
  }
};

export {
  adminLogin,
  logout,
  addUser,
  allUser,
  getUser,
  editUser,
  deleteUser,
  searchUsers,
};
