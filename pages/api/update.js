import pool from "../lib/db";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id, todo, status } = req.body;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    await pool.query("UPDATE todos SET todo = ?, status = ? WHERE id = ?", [todo, status, id]);
    return res.status(200).json({ message: "To-do updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
