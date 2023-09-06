import React from "react";
import { useState } from "react";


export default function ToDoForm(props) {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  };

  const enterTaskHandler = async (userInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-http-175ac-default-rtdb.firebaseio.com/tasks.json",
        {
          method: "POST",
          body: JSON.stringify({ text: userInput }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const data = await response.json();

      const generatedId = data.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: userInput };
      console.log(createdTask);
      props.addTask(createdTask);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim().length > 0) {
      enterTaskHandler(userInput);
    }
    setUserInput("");
  };

  return (
    <>
        <h3 className="form-title">Todo App</h3>
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <input
              value={userInput}
              onChange={handleChange}
              className="form-input"
              type="text"
              placeholder="Type some here..."
            />
            <button className="form-button"> {error && <p>{error}</p>}
        {isLoading ? "Sending..." : "Add"}</button>
          </form>
        </div>
    </>
  );
}
