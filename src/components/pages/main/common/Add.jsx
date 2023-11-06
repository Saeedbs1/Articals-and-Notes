import { useState } from 'react';
import { BsCheck2Circle } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';

const AddNote = ({ handleAdd,toggleAdd}) => {
  const [cancelAdd, setCancelAdd] = useState(toggleAdd);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteBody, setNoteBody] = useState('');

  const handleCancelAddNote = () => {
    setCancelAdd(!toggleAdd);
  };

  const handleAddNoteClick = () => {
    if (noteTitle.trim() !== '' && noteBody.trim() !== '') {
      handleAdd(noteTitle, noteBody);
      setNoteTitle('');
      setNoteBody('');
      setCancelAdd(toggleAdd);
    }
  };

  if (!cancelAdd) {
    return null;
  }

  return (
    <div className="add">
      <div className="add-details">
        <input
          type="text"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
        <textarea
          rows="8"
          value={noteBody}
          onChange={(e) => setNoteBody(e.target.value)}
        />
      </div>
      <div className="add-actions">
        <MdCancel className="cancel" onClick={handleCancelAddNote} />
        <BsCheck2Circle className="check" onClick={handleAddNoteClick} />
      </div>
    </div>
  );
};

export default AddNote;
