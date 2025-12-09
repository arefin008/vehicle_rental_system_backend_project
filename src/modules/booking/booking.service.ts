import { pool } from "../../config/db";

const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const start = new Date(String(rent_start_date));
  const end = new Date(String(rent_end_date));

  if (start >= end) {
    throw new Error("Invalid rent period");
  }

  const booked_vehicle = await pool.query(
    `
      SELECT *
      FROM bookings
      WHERE vehicle_id=$1
        AND status='active'
        AND $2 < rent_end_date
        AND $3 > rent_start_date
    `,
    [vehicle_id, start, end]
  );

  if (booked_vehicle.rows.length > 0) {
    throw new Error("Vehicle is already booked for this period");
  }

  const vehicleRes = await pool.query(
    `SELECT vehicle_name, daily_rent_price FROM vehicles WHERE id=$1`,
    [vehicle_id]
  );

  if (vehicleRes.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

  const vehicle = vehicleRes.rows[0];

  const days = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  const total = Number(vehicle.daily_rent_price) * days;

  const result = await pool.query(
    `
    INSERT INTO bookings
      (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
    VALUES ($1,$2,$3,$4,$5,'active')
    RETURNING *
    `,
    [customer_id, vehicle_id, start, end, total]
  );

  await pool.query(
    `UPDATE vehicles SET availability_status='booked' WHERE id=$1`,
    [vehicle_id]
  );

  return {
    ...result.rows[0],
    vehicle: {
      vehicle_name: vehicle.vehicle_name,
      daily_rent_price: Number(vehicle.daily_rent_price),
    },
  };
};

const getAllBooking = async (user: Record<string, any>) => {
  let query = `SELECT * FROM bookings`;
  let params: any[] = [];

  if (user.role === "customer") {
    query += ` WHERE customer_id = $1`;
    params.push(user.id);
  }
  const result = await pool.query(query, params);
  return result.rows;
};

const getVehicle = async (vehicleId: number) => {
  const res = await pool.query(
    `SELECT vehicle_name, registration_number, type FROM vehicles WHERE id=$1`,
    [vehicleId]
  );
  return res.rows[0];
};

const getCustomer = async (customerId: number) => {
  const res = await pool.query(`SELECT name, email FROM users WHERE id=$1`, [
    customerId,
  ]);
  return res.rows[0];
};

const updateBooking = async (bookingId: string, newStatus: string) => {
  const bookingRes = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [
    bookingId,
  ]);

  if (bookingRes.rows.length === 0) {
    throw new Error("Booking not found!");
  }

  const booking = bookingRes.rows[0];

  const userRes = await pool.query(`SELECT * FROM users WHERE id=$1`, [
    booking.customer_id,
  ]);

  if (userRes.rows.length === 0) {
    throw new Error("User not found!");
  }

  const user = userRes.rows[0];

  if (user.role === "customer") {
    if (newStatus !== "cancelled") {
      throw new Error("Customers can only cancel bookings!");
    }

    if (new Date(booking.rent_start_date) <= new Date()) {
      throw new Error("Cannot cancel after rent start date!");
    }
  }

  if (user.role === "admin") {
    if (newStatus !== "returned") {
      throw new Error("Admin can only mark booking as returned!");
    }
  }

  const updateRes = await pool.query(
    `
      UPDATE bookings
      SET status=$1
      WHERE id=$2
      RETURNING *
    `,
    [newStatus, bookingId]
  );

  const updatedBooking = updateRes.rows[0];

  if (newStatus === "returned" || newStatus === "cancelled") {
    await pool.query(
      `
      UPDATE vehicles 
      SET availability_status='available'
      WHERE id=$1
      `,
      [booking.vehicle_id]
    );
  }

  return updatedBooking;
};

export const bookingServices = {
  createBooking,
  getAllBooking,
  getVehicle,
  getCustomer,
  updateBooking,
};
