import express from "express";
import { vehicleControllers } from "./vehicle.controller";

const router = express.Router();

router.post("/", vehicleControllers.addNewVehicle);

router.get("/", vehicleControllers.getAllVehicle);
router.get("/:vehicleId", vehicleControllers.getSingleVehicle),
  router.put("/:vehicleId", vehicleControllers.updateVehicle),
  router.delete("/:vehicleId", vehicleControllers.deleteVehicle);

export const vehicleRoutes = router;
