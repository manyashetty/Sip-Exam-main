import express from 'express';
import mongoose from 'mongoose';
import { login, register } from "../controller/userController.js";

import { router } from '../database/userDB';
const router = express.Router();

const passwordChecker = async (password) => {
    try {
        if (password.length < 8) {
          return { success: false, message: 'Password should be at least 8 characters long' };
        }
    
        // Check if the password contains at least one uppercase letter, one lowercase letter, and one digit.
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const digitRegex = /\d/;
    
        if (!uppercaseRegex.test(password) || !lowercaseRegex.test(password) || !digitRegex.test(password)) {
          return { success: false, message: 'Password should contain at least one uppercase letter, one lowercase letter, and one digit' };
        }
    
        return { success: true };
      } catch (e) {
        console.log(e);
        return { success: false, message: 'Something went wrong with password validation' };
      }
};

const register = async (data) => {
  try {
    var checker = await passwordChecker(data.password);
    if (await User.findOne({ 'email': data.email })) {
      return { success: false, message: 'Email already exists' };
    } else if (!(await User.findOne({ 'email': data.email })) || data.email.includes('@')) {
      return { success: false, message: 'Email does not exist' };
    } else if (!checker.success) {
      return checker;
    } else if (!(data.bio.length <= 250)) {
      return { success: false, message: 'Bio should be at most 250 characters long' };
    }
    const user = new User(data);
    const info = await user.save();
    if (!info) {
      return { success: true };
    }
    return { success: false };
  } catch (e) {
    console.log(e);
    return { success: false };
  }
};

const login = async (email, password) => {
  try {
    if (await User.findOne({ 'email': email, 'password': password })) {
      return { success: true, token: await createToken(await User.findOne({ 'email': email, 'password': password })) };
    } else if (!(await User.findOne({ 'email': email })) || email.includes('@')) {
      return { success: false, message: 'User does not exist' };
    }
    return { success: false };
  } catch (e) {
    console.log(e);
    return { success: false, message: 'Something went wrong' };
  }
};

export { register, login, passwordChecker};



// import mongoose from "mongoose";
// import { User } from "../database/userDB.js";
// const router = express.Router();
// const register = async(data) => {
//     /**
//      * Display a list of available food items with details.
//      */

//     try {
//         var checker = await passwordChecker(data.password)
//         if (await User.findOne({ 'email': data.email })) {
//             return { success: false, message: "Email already exists" }
//         } else if (!(await User.findOne({ 'email': data.email })) || data.email.includes('@')) {
//             return { success: false, message: "Email does not exist" }
//         } else if (!checker.success) {
//             return checker
//         } else if (!(data.bio.length <= 250)) {
//             return { success: false, message: "Bio should be at most 250 characters long" }
//         }
//         const user = new User(data);
//         const info = await user.save();
//         if (!info) {
//             return { success: true }
//         }
//         return { success: false }
//     } catch (e) {
//         return { success: false }
//     }
// }


// // login

// const login = async(email, password) => {
//     try {
//         if (await authors.findOne({ 'email': email, 'password': password })) {
//             return { success: true, token: await createToken(await authors.findOne({ 'email': email, 'password': password })) }
//         } else if (!(await authors.findOne({ 'email': email })) || email.includes('@')) {
//             return { success: false, message: "User does not exist" }
//         }
//         return { success: false }
//     } catch (e) {
//         console.log(e);
//         return { success: false, message: "Something went wrong" }
//     }
// }

// module.exports = (
//     register,
//     login
// )