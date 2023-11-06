import { useState} from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import { BsCheck2Circle } from "react-icons/bs";
import { MdCancel } from "react-icons/md";

const Todo = ({ id, title, body, date, handleDeleteTodo, handleCancelEdit, handleEditTodo}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedBody, setEditedBody] = useState(body);
  const[category,setCategory] = useState('category');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleAddTodoClick = (e) => {
    e.preventDefault();
    setIsEditing(false);
    handleEditTodo(id, editedTitle, editedBody);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setIsEditing(false);
    handleCancelEdit(id, title, body);
  };

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
        {isEditing ? (
          <div className="edit-todo">
            <div className="editTodo-details">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <textarea
                rows="8"
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
              />
            </div>
            <div className="addTodo-actions">
              <MdCancel className="cancel" onClick={handleCancel} />
              <BsCheck2Circle className="check" onClick={handleAddTodoClick} />
            </div>
          </div>
        ) : (
          <div className="todo-body">
            <h4>
              {renderCategoryDot()}
              {title}
            </h4>
            <p>{body}</p>
          </div>
        )}
        <div className="todo-actions">
          {!isEditing && (
            <>
             <BsCheck2Circle className="check"/>
              <BiSolidEdit className="edit-icon" onClick={handleEditClick} />
              <RiDeleteBin6Line onClick={() => handleDeleteTodo(id)} className="delete-icon" />
            </>
          )}
        </div>
      </div>
      <div className="todo-footer">
        <div className="category-select">
          <label>
            <select
              value={category}
              onChange={handleCategoryChange}
            >
              <option defaultValue='category'>Category</option>
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
