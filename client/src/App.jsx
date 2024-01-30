import { useState } from "react";
import "./App.css";
import apiService from "../apiService";

const App = () => {
  const [input, setInput] = useState();
  const [todos, setTodos] = useState([]);
  useState(() => {
    const fetchApi = async () => {
      try {
        const res = await apiService.get("/todos");
        setTodos(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchApi();
  }, []);
  const addTodo = async (e) => {
    e.preventDefault();
    if (input.length === 0) return null;
    const res = await apiService.post("/todos", [
      {
        ...todos,
        text: input,
        completed: false,
      },
    ]);
    setInput("");
    fetchApi();
    return res.data;
  };
  const handleDelete = async (id) => {
    const res = await apiService.delete(`todos/${id}`, { id });
    fetchData();
    return res.data;
  };
  const handleUpdate = async (id) => {
    const res = await apiService.put(`todos/${id}`, { id });
  };
  return (
    <main className="bg-slate-950 min-h-screen">
      <input
        type="text"
        className="ms-6 my-6 w-5/12 py-2 px-4 rounded-l-md border border-gray-300 focus:outline-none focus:border-blue-500"
        value=""
        placeholder="Add your Todo"
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="py-2 px-4 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none"
        onClick={(e) => addTodo(e)}
      >
        Add
      </button>
      <div>
        {todos.map((t) => {
          <div key={t._id}>
            <p className="cursor-pointer" onClick={handleUpdate(t._id)}>
              {t.text}
            </p>
            <button onClick={handleDelete(t._id)}>X</button>
          </div>;
        })}
      </div>
    </main>
  );
};

export default App;
