import express from "express";
import { bookingControllers } from "./booking.controller";

const router = express.Router();

router.post("/", bookingControllers.createBooking);
router.get("/", bookingControllers.getAllBooking);
router.get("/:bookingId", bookingControllers.getSingleBooking);
router.put("/:bookingId", bookingControllers.updateBooking);

export const bookingRoutes = router;
