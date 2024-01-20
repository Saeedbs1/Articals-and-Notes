import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import { BsCheck2Circle } from "react-icons/bs";
import { MdCancel } from "react-icons/md";

const Artical = ({
  id,
  title,
  body,
  date,
  handleDeleteArtical,
  handleCancelEdit,
  handleEditartical,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedBody, setEditedBody] = useState(body);
  const handleEditClick = () => {
    setIsEditing(true);
  };


  const handleAddarticalClick = (e) => {
    e.preventDefault();
    setIsEditing(false);
    handleEditartical(id, editedTitle, editedBody);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setIsEditing(false);
    handleCancelEdit(id, title, body);
  };


  return (
    <div className="artical">
      <div className="artical-container">
        {isEditing ? (
          <div className="edit-artical">
            <div className="editartical-details">
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
            <div className="addartical-actions">
              <MdCancel className="cancel" onClick={handleCancel} />
              <BsCheck2Circle className="check" onClick={handleAddarticalClick} />
            </div>
          </div>
        ) : (
          <div className="artical-body">
          
            <h4>{title}</h4>
            <p>{body}</p>
          </div>
        )}
        <div className="artical-actions">
          {!isEditing && (
            <>
              <BiSolidEdit className="edit-icon" onClick={handleEditClick} />
              <RiDeleteBin6Line
                onClick={() => handleDeleteArtical(id)}
                className="delete-icon"
              />
            </>
          )}
        </div>
      </div>
      <div className="artical-footer">
        <small>Created on {date}</small>
      </div>
    </div>
  );
};

export default Artical;
