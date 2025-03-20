import { useState, useEffect } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null); // Store the todo being edited
  const [editedText, setEditedText] = useState(""); // Store updated text

  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch all todos
  const fetchTodos = async () => {
    const res = await fetch("/api/read");
    const data = await res.json();
    setTodos(data);
  };

  // Add a new todo
  const addTodo = async () => {
    if (!todo.trim()) return;

    const res = await fetch("/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo }),
    });

    if (res.ok) {
      fetchTodos();
      setTodo("");
    }
  };

  // Start editing a todo
  const startEditing = (todoItem) => {
    setEditingTodo(todoItem.id);
    setEditedText(todoItem.todo);
  };

  // Update the edited todo
  const updateTodo = async () => {
    if (!editedText.trim()) return;

    const res = await fetch("/api/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingTodo, todo: editedText, status: "pending" }),
    });

    if (res.ok) {
      fetchTodos();
      setEditingTodo(null);
      setEditedText("");
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    const res = await fetch("/api/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      fetchTodos();
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input value={todo} onChange={(e) => setTodo(e.target.value)} placeholder="Enter a task" />
      <button onClick={addTodo}>Add</button>
      
      <ul>
        {todos.map((item) => (
          <li key={item.id}>
            {editingTodo === item.id ? (
              <>
                <input
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button onClick={updateTodo}>Save</button>
                <button onClick={() => setEditingTodo(null)}>Cancel</button>
              </>
            ) : (
              <>
                {item.todo} - {item.status}
                <button onClick={() => startEditing(item)}>Edit</button>
                <button onClick={() => deleteTodo(item.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
