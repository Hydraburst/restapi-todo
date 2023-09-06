import React from "react";
import ToDo from "../ToDo/ToDo";


export default function ToDoList(props) {
  let todosList = <h2>No tasks found. Add some!</h2>; 
  if (props.error) {
    todosList = "Try again"
  }
  if (props.loading) {
    todosList = "Loading..."
  } 
  if(props.todosList.length > 0) {
    todosList = (<ul>
      {props.todosList.map((todo) => (
        <li key={todo.id}>
        
          <ToDo todo={todo} removeTask={todo.id} onRemoveTask ={props.onRemoveTask} />
        </li>
      ))}
    </ul>)
  } 
  
  return (
   <>{todosList}</>
    
  )
}
