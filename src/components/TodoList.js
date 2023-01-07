import "./TodoList.css";
import { ImCheckmark } from "react-icons/im";
import { useState } from "react";

var key = 0;

function TodoList({ dataParentToChild }) {
  const [list, setList] = useState([]);
  const [todo, setTodo] = useState("");

  function handleChange(event) {
    setTodo(event.target.value);
  }

  function handleAdd() {
    if (todo !== "") {
      key = Date.now();
      const newList = list.concat({ todo, key });
      setTodo("");
      setList(newList);
    } else {
      alert("Can't be empty!");
    }
  }

  function handleRemove(key) {
    const removeTodo = [...list].filter((item) => item.key !== key);
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
        {list.map((item) => (
          <div className="todo-item" key={item.key}>
            <div className="todo-text">{item.todo}</div>
            <div className="todo-edit">
              <ImCheckmark
                size={25}
                color={"#00b0b9"}
                cursor={"pointer"}
                onClick={() => handleRemove(item.key)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
