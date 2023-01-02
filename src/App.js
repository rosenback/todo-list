import "./App.css";
import { ImCross } from "react-icons/im";

function App() {
  function handleAdd() {}

  function handleDelete() {}

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Todo List</h1>
        <table>
          <tr>
            <td>test</td>
            <td>test</td>
            <div className="delete-button" onclick={handleDelete}>
              <ImCross size={15} />
            </div>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default App;
