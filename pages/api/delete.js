import pool from "../lib/db";


export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    await pool.query("DELETE FROM todos WHERE id = ?", [id]);
    return res.status(200).json({ message: "To-do deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
