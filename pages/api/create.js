import pool from "../lib/db";


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { todo, status } = req.body;

  if (!todo) {
    return res.status(400).json({ message: "To-do item is required" });
  }

  try {
    const [result] = await pool.query("INSERT INTO todos (todo, status) VALUES (?, ?)", [todo, status || "pending"]);
    return res.status(201).json({ id: result.insertId, todo, status: status || "pending" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
