import { useState } from "react";
import "./App.css";
import apiService from "../apiService";

const App = () => {
  const [text, setText] = useState();
  const [todos, setTodos] = useState([]);
  //get all todos
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
  //add todo
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await apiService.post("/todos", { text });
      setTodos([res.data, ...todos]);
    } catch (err) {
      console.log(err.message);
    }
    setText("");
  };
  //delet todo
  const handleDelete = async (id) => {
    try {
      await apiService.delete(`todos/${id}`);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      console.log(err.message);
    }
  };
  //update
  const handleUpdate = async (id, completed) => {
    try {
      const updatedCompleted = !completed;

      // Update the state directly without waiting for the API response
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, completed: updatedCompleted } : todo
        )
      );

      // Send the PATCH request to update the todo on the server
      await apiService.patch(`todos/${id}`, { completed: updatedCompleted });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <main className="bg-slate-950 min-h-screen">
      <div className="mx-8 ">
        {/* add todo form */}
        <input
          type="text"
          value={text}
          className="my-6 w-5/12 py-2 px-4 rounded-l-md border border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Add your Todo"
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="py-2 px-4 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none"
          onClick={handleAdd}
        >
          Add
        </button>
        {/* table to desplay todos */}
        <div className="bg-gray-900 p-6">
          <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="py-3 px-4 font-semibold text-sm">Todos List</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-white">
              {todos &&
                todos.map((t) => (
                  <tr key={t._id}>
                    <td
                      className={`py-2 px-4 cursor-pointer ${
                        t.completed ? "line-through text-gray-500" : ""
                      }`}
                      onClick={() => handleUpdate(t._id, t.completed)}
                    >
                      {t.text}
                    </td>
                    <td className="py-2 px-4">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(t._id)}
                      >
                        X Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default App;
