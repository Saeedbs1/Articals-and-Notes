import Note from "./Note";

import "./Notes.scss";

const NotesList = ({
  notes,
  handleCancelEdit,
  handleDeleteNote,
  handleEditNote,

}) => {
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          body={note.body}
          date={note.date}
          category={note.category}
          handleCancelEdit={handleCancelEdit}
          handleDeleteNote={handleDeleteNote}
          handleEditNote={handleEditNote}
        />
      ))}
    </div>
  );
};

export default NotesList;
