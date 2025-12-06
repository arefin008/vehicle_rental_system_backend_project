import express, { Request, Response } from "express";
// import { userRoutes } from "./modules/user/user.routes";
// import { todoRoutes } from "./modules/todo/todo.routes";
// import { authRoutes } from "./modules/auth/auth.routes";
import initDB from "./config/db";

const app = express();
// console.log({ pool });

//* parser -> json body parse korar jonno middleware (for post method)
app.use(express.json());
//// app.use(express.urlencoded()) // this is for form data

//* initializing DB
initDB();

//* Root Route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Vehicle Rental System!");
});

//* users CRUD
// app.use("/users", userRoutes);

//* Todos crud
// app.use("/todos", todoRoutes);

// auth routes
// app.use("/auth", authRoutes);

// Route not found -> root path theke route vul korle not found route work korbe
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

export default app;
