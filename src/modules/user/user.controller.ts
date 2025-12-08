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
  try {
    const result = await userServices.updateUser(
      name,
      email,
      phone,
      role,
      req.params.id!
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// const deleteUser = async (req: Request, res: Response) => {
//   try {
//     const hasActiveBookings = await userServices.checkActiveBookings(
//       req.params.customer_id!
//     );
//     if (hasActiveBookings) {
//       return res.status(400).json({
//         success: false,
//         message: "User cannot be deleted because they have active bookings",
//       });
//     }
//     const result = await userServices.deleteUser(req.params.customer_id!);
//     if (result.rowCount === 0) {
//       res.status(400).json({
//         success: false,
//         message: "User not found",
//       });
//     } else {
//       res.status(200).json({
//         success: true,
//         message: "User deleted successfully",
//       });
//     }
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const hasActiveBookings = await userServices.checkActiveBookings(userId!);
    if (hasActiveBookings) {
      return res.status(400).json({
        success: false,
        message: "User cannot be deleted because they have active bookings",
      });
    }

    const result = await userServices.deleteUser(userId!);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err: any) {
    return res.status(500).json({
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
