import { Request, Response } from "express";
import { authSevices } from "./auth.services";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await authSevices.createUser(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authSevices.loginUser(email, password);
    res.status(200).json({
      success: true,
      message: "Login successufully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const authController = {
  createUser,
  loginUser,
};
