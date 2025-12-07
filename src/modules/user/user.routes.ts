import express from "express";
import { userControllers } from "./user.controller";

const router = express.Router();

router.get("/", userControllers.getAllUser);
router.put("/:userId", userControllers.updateUser);
router.delete("/:userId", userControllers.deleteUser);

export const userRoutes = router;
