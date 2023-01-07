import React from "react";
import "./TodoList.css";
import { ImCheckmark } from "react-icons/im";
import { ImMenu } from "react-icons/im";
import { useState, useEffect, useRef } from "react";

function TodoList() {
  //Getting the locally stored list
  const [list, setList] = useState(() => {
    return JSON.parse(localStorage.getItem("todoList")) || [];
  });
  const [todo, setTodo] = useState("");

  //Store the list locally
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(list));
  }, [list]);

  //Functionality to use the Enter-key to add to list
  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        handleAdd();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [handleAdd]);

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  //Handles the drag and drop functionality and order the list after
  function handleSort() {
    const newList = [...list];
    const draggedItemContent = newList.splice(dragItem.current, 1)[0];

    newList.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = 0;
    dragOverItem.current = 0;
    setList(newList);
  }

  function handleChange(event) {
    setTodo(event.target.value);
  }

  //Add new todo to the list
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleAdd() {
    if (todo !== "") {
      const newList = list.concat({ todo });
      setTodo("");
      setList(newList);
    } else {
      alert("Can't be empty!");
    }
  }

  //Removing a finished todo from the list
  function handleRemove(key) {
    const removeTodo = [...list].filter((item, index) => index !== key);
    setList(removeTodo);
  }

  return (
    <div className="todo-container">
      <div className="todo-form">
        <input
          className="todo-input"
          type="text"
          placeholder="New Todo"
          value={todo}
          onChange={handleChange}
        ></input>
        <button className="todo-add-button" onClick={handleAdd}>
          Add Todo
        </button>
      </div>
      <div className="todo-list">
        {list.map((item, index) => (
          <div
            className="todo-item"
            key={index}
            draggable
            onDragStart={(e) => (dragItem.current = index)}
            onDragEnter={(e) => (dragOverItem.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="todo-drag">
              <ImMenu size={25} cursor={"move"} />
            </div>
            <div className="todo-text">{item.todo}</div>
            <div className="todo-check">
              <ImCheckmark
                size={25}
                cursor={"pointer"}
                onClick={() => handleRemove(index)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
