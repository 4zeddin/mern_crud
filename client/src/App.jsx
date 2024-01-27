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
  const addTodo = async(e) => {
    e.preventDefault();
    if( input.length === 0 ) return null;
    await axios.post("/todos",[
      {
        ...todos,
        text: input,
        completed: false,
      },
    ]);
    setInput("");
    fetchApi();
  }
  return (
    <main>
      <div>
        <input
          type="text"
          value=""
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={(e)=>addTodo(e)}>Add</button>
      </div>
      <div>{/* {todo.map()} */}</div>
    </main>
  );
};

export default App;
