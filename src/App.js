import "./App.css";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="app">
      <div className="app-container">
        <h1 className="app-title">Todo List</h1>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
