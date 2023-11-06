import { useState } from 'react';
import Navbar from './Navbar/Navbar';
import Notes from './Notes/Notes';
import Todos from './Todo/Todos';
import CompletedTodos from './Complete/CompletedTodos';
import './Main.scss';

function Main() {
  const [selectedComponent, setSelectedComponent] = useState('all');

  const handleSelectChange = (event) => {
    setSelectedComponent(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="content">
        <div className="filter">
          <select
            onChange={handleSelectChange}
            value={selectedComponent}
            className="filter-button"
          >
            <option value="all">Show All</option>
            <option value="todos">Todos</option>
            <option value="notes">Notes</option>
          </select>
        </div>
        <div className="todo-content">
          {(selectedComponent === "all" || selectedComponent === "todos") && (
            <Todos />
          )}
          {(selectedComponent === "all" || selectedComponent === "todos") && (
            <CompletedTodos/>
          )}
         
          {(selectedComponent === "all" || selectedComponent === "notes") && (
            <Notes />
          )}
        </div>
      </div>
    </>
  );
}

export default Main;
