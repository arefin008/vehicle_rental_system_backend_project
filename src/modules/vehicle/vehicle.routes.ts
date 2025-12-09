import express from "express";
import { vehicleControllers } from "./vehicle.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/", auth("admin"), vehicleControllers.addNewVehicle);

router.get("/", vehicleControllers.getAllVehicle);
router.get("/:vehicleId", vehicleControllers.getSingleVehicle),
  router.put("/:vehicleId", auth("admin"), vehicleControllers.updateVehicle),
  router.delete("/:vehicleId", auth("admin"), vehicleControllers.deleteVehicle);

export const vehicleRoutes = router;
