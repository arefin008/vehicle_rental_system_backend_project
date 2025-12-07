import express, { Request, Response } from "express";
import initDB from "./config/db";
import { userRoutes } from "./modules/user/user.routes";

const app = express();
app.use(express.json());

initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Vehicle Rental System!");
});

//* users CRUD
app.use("/api/v1/users", userRoutes);

//* Todos crud
// app.use("/todos", todoRoutes);

// auth routes
// app.use("/auth", authRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

export default app;
