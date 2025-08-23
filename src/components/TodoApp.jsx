import React, { useState, useEffect } from "react";

export default function TodoApp() {
  const [todos, setTodos] = useState(() => {

    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState("");


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() === "") return;
    setTodos([...todos, { text: inputValue, done: false }]);
    setInputValue("");
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleDone = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow mt-10">
      <h1 className="text-2xl font-bold mb-4">Todo Application</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          className="border p-2 rounded w-full"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
          >
            <span
              onClick={() => toggleDone(index)}
              className={`cursor-pointer ${
                todo.done ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(index)}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
