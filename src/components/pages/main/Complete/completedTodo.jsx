import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsCheck2Circle } from "react-icons/bs";

const Todo = ({ id, title, body, date, handleDeleteTodo }) => {
  const [category, setCategory] = useState("category");

  const renderCategoryDot = () => {
    switch (category) {
      case "work":
        return <div className="work-dot"></div>;
      case "personal":
        return <div className="personal-dot"></div>;
      case "others":
        return <div className="others-dot"></div>;
      default:
        return null;
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="todo">
      <div className="todo-container">
        <div className="todo-body">
          <h4>
            {renderCategoryDot()}
            {title}
          </h4>
          <p>{body}</p>
        </div>
        <div className="todo-actions">
          <RiDeleteBin6Line
            onClick={() => handleDeleteTodo(id)}
            className="delete-icon"
          />
          <BsCheck2Circle className="check" />
        </div>
      </div>
      <div className="todo-footer">
        <div className="category-select">
          <label>
            <select value={category} onChange={handleCategoryChange}>
              <option defaultValue="category">Category</option>
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="others">Others</option>
            </select>
          </label>
        </div>
        <small>Created on {date}</small>
      </div>
    </div>
  );
};

export default Todo;
