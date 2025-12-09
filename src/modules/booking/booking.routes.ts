import express from "express";
import { bookingControllers } from "./booking.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/", auth(), bookingControllers.createBooking);
router.get("/", auth(), bookingControllers.getAllBooking);
router.put("/:bookingId", auth(), bookingControllers.updateBooking);

export const bookingRoutes = router;
