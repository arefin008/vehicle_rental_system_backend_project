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
    const user = req.user;

    const bookings = await bookingServices.getAllBooking(user!);

    const finalData = [];

    for (const booking of bookings) {
      const vehicle = await bookingServices.getVehicle(booking.vehicle_id);

      const formatted: any = {
        ...booking,
      };

      if (user?.role === "admin") {
        formatted.customer = await bookingServices.getCustomer(
          booking.customer_id
        );
      }

      formatted.vehicle = {
        vehicle_name: vehicle.vehicle_name,
        registration_number: vehicle.registration_number,
      };

      finalData.push(formatted);
    }

    return res.status(200).json({
      success: true,
      message:
        user?.role === "admin"
          ? "Bookings retrieved successfully"
          : "Your bookings retrieved successfully",
      data: finalData,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
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
