import { Request, Response } from "express";
import User from "../model/userSchema";
import bcrypt from "bcryptjs";
import {loginDetails } from "../types";

/**
 * @desc User Signup
 * @route POST /auth/signup
 */
export const signupController = async (req: Request, res: Response) => {
  try {

    const parsed = loginDetails.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error,
      });
    }

    const { email, password } = parsed.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({
      message: "User signed up successfully",
      user: { email: newUser.email },
      token: "dummy-signup-token",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

/**
 * @desc User Login
 * @route POST /auth/login
 */
export const loginController = async (req: Request, res: Response) => {
  try {

    const parsed = loginDetails.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error,
      });
    }

    const { email, password } = parsed.data;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.json({
      message: "Login successful",
      user: { email: user.email },
      token: "dummy-login-token",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
