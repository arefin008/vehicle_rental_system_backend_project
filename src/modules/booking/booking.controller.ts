import { Request, Response } from "express";
import { bookingServices } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.createBooking(req.body);
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.getAllBooking();
    res.status(200).json({
      success: true,
      message: "Booking retrived successfully.",
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

const updateBooking = async (req: Request, res: Response) => {
  //   console.log(req.params.bookingId);
  try {
    const data = await bookingServices.updateBooking(
      req.params.bookingId!,
      req.body.status
    );

    res.json({
      success: true,
      message:
        req.body.status === "returned"
          ? "Booking marked as returned. Vehicle is now available"
          : "Booking cancelled successfully",
      data,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const bookingControllers = {
  createBooking,
  getAllBooking,
  updateBooking,
};
