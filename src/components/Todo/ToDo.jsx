import React from "react";
import styles from "./ToDo.module.css";
import { useState } from "react";
import { TiDelete } from "react-icons/ti";
import Checkbox from "./Checkbox";
export default function ToDo(props) {
  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked((prevState) => !prevState);
  };
  const onDeleteTodoClicked = (e, user) => {
    props.onRemoveTask(user);
  };
  return (
    <div className={styles["todo-wrap"]} onClick={handleToggle}>
      <div className={styles["todo-item"]}>
        <Checkbox checked={checked} />
        {/* <p className={`item-text${checked ? ' line-through' : ' '}`}>{props.todo.task}</p> task */}
        <p className={`${checked ? " line-through" : " "}`}>
          {props.todo.text}
        </p>
      </div>
      <div className={styles['delete']}>
        <TiDelete
          className={styles['delete-item']}
          onClick={(e) => onDeleteTodoClicked(e, props.removeTask)}
        />
      </div>
    </div>
  );
}
