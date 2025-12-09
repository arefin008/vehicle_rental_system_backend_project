import { Request, Response } from "express";
import { userServices } from "./user.service";

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUser();
    res.status(200).json({
      success: true,
      message: "Users retrived successfully.",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { name, email, phone, role } = req.body;
  const targetUserId = req.params.userId;
  const currentUser = req.user;

  try {
    const isAdmin = currentUser?.role === "admin";
    const isSelf = currentUser?.id === targetUserId;

    if (!isAdmin && !isSelf) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this user",
      });
    }

    let finalRole = role;
    if (!isAdmin && currentUser) {
      finalRole = currentUser.role;
    }

    const result = await userServices.updateUser(
      targetUserId!,
      name,
      email,
      phone,
      finalRole
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { password: _, ...safeUser } = result.rows[0];

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: safeUser,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const isActive = await userServices.checkActiveBookings(userId!);
    if (isActive) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete user with active bookings",
      });
    }
    const result = await userServices.deleteUser(userId!);
    if ((result.rowCount ?? 0) === 0) {
      res.status(404).json({
        success: false,
        message: "User Not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const userControllers = {
  getAllUser,
  updateUser,
  deleteUser,
};
