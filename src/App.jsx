import React from "react";
import "./App.css";
import ToDoForm from "./components/AddTodo/ToDoForm";
import ToDoList from "./components/TodosList/ToDoList";
import Card from "./components/UI/Card";
import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const url = "https://react-http-175ac-default-rtdb.firebaseio.com/tasks";

  const taskAddHandler = (todo) => {
    setTodos((prevTodos) => prevTodos.concat(todo));
  };

  const deleteTask = async (id) => {
    console.log(id);
    await fetch(
      "https://react-http-175ac-default-rtdb.firebaseio.com/tasks/" +
        id +
        ".json",
      {
        method: "DELETE",
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    fetchTasks();
  };

  const fetchTasks = async (taskText) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url + ".json");

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      const loadedTasks = [];

      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }

      setTodos(loadedTasks);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
    console.log(isLoading);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Card className="section">
      <Card className="card-wrap">
        <ToDoForm addTask={taskAddHandler} />
        <ToDoList
          todosList={todos}
          error={error}
          loading={isLoading}
          onRemoveTask={deleteTask}
        />
      </Card>
    </Card>
  );
}
export default App;
