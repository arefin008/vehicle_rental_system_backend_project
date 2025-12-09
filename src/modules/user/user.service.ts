import { pool } from "../../config/db";

const getAllUser = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

const updateUser = async (
  id: string,
  name: string,
  email: string,
  phone: string,
  role: string
) => {
  const result = await pool.query(
    `UPDATE users SET name = $1, email = $2,phone = $3, role =$4 WHERE id =$5 RETURNING *`,
    [name, email, phone, role, id]
  );
  return result;
};

const deleteUser = async (id: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
  return result;
};
const checkActiveBookings = async (id: string) => {
  const result = await pool.query(
    `SELECT * FROM bookings WHERE id = $1 AND status = 'active'`,
    [id]
  );
  return (result.rowCount ?? 0) > 0;
};

export const userServices = {
  getAllUser,
  updateUser,
  deleteUser,
  checkActiveBookings,
};
