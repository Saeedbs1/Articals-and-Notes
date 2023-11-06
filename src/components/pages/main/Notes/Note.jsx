import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import { BsCheck2Circle } from "react-icons/bs";
import { MdCancel } from "react-icons/md";

const Note = ({
  id,
  title,
  body,
  date,
  handleDeleteNote,
  handleCancelEdit,
  handleEditNote,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedBody, setEditedBody] = useState(body);
const[category,setCategory] = useState('category');
  const handleEditClick = () => {
    setIsEditing(true);
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

  const handleAddNoteClick = (e) => {
    e.preventDefault();
    setIsEditing(false);
    handleEditNote(id, editedTitle, editedBody);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setIsEditing(false);
    handleCancelEdit(id, title, body);
  };

  const handleCategoryChange = (e) => {
   setCategory(e.target.value);
  
  };

  return (
    <div className="note">
      <div className="note-container">
        {isEditing ? (
          <div className="edit-note">
            <div className="editnote-details">
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
            <div className="addNote-actions">
              <MdCancel className="cancel" onClick={handleCancel} />
              <BsCheck2Circle className="check" onClick={handleAddNoteClick} />
            </div>
          </div>
        ) : (
          <div className="note-body">
          
            <h4>{renderCategoryDot()}{title}</h4>
            <p>{body}</p>
          </div>
        )}
        <div className="note-actions">
          {!isEditing && (
            <>
              <BiSolidEdit className="edit-icon" onClick={handleEditClick} />
              <RiDeleteBin6Line
                onClick={() => handleDeleteNote(id)}
                className="delete-icon"
              />
            </>
          )}
        </div>
      </div>
      <div className="note-footer">
        <div className="category-select">
          <label>
            <select
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="category">Category</option>
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

export default Note;
