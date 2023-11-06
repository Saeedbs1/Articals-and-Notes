import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import NotesList from "./NoteList";
import { MdAdd } from "react-icons/md";
import Search from "../common/Search";
import moment from "moment";
import AddNote from "../common/Add";

const Notes = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      title: "This is my first note!",
      body: "This is my new note!",
      date: "Sep 10, 2023",
    },
    {
      id: nanoid(),
      title: "This is my second note!",
      body: "This is my new note!",
      date: "Sep 21, 2020",
    },
  ]);
 
  const [searchText, setSearchText] = useState("");
  const [add, setAdd] = useState(false);
  const [noteCount, setNoteCount] = useState(notes.length);

  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedBody, setEditedBody] = useState("");


  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("Notes"));
  
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]); 

  const addNote = (title, body) => {
    const date = moment().format('ll');
    const newNote = {
      id: nanoid(),
      title: title,
      body: body,
      date: date,
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    setNoteCount(newNotes.length);
    setAdd(false);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    setNoteCount(newNotes.length);
  };

  const handleEditNote = (editedId, editedTitle, editedBody) => {
    const updatedNotes = notes.map((note) =>
      note.id === editedId
        ? {
            ...note,
            title: editedTitle,
            body: editedBody,
          }
        : note
    );
    setNotes(updatedNotes);
    setEditingNoteId(null);
    setEditedTitle("");
    setEditedBody("");
  };

  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setEditedTitle("");
    setEditedBody("");
  };

  const addhandler = () => {
    setAdd(!add);
  };

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h3>
          Notes<span>{noteCount}</span>
        </h3>
        <MdAdd className="addicon" onClick={addhandler} />
      </div>
      <div className="notes">
        <Search handleSearch={setSearchText} />
        {add && <AddNote handleAdd={addNote} toggleAdd={true}/>}
        <NotesList
          notes={notes.filter(
            (note) =>
              note.title?.toLowerCase().includes(searchText.toLowerCase()) ||
              note.body?.toLowerCase().includes(searchText.toLowerCase())
          )}
          handleDeleteNote={deleteNote}
          editingNoteId={editingNoteId}
          handleEditNote={handleEditNote}
          handleCancelEdit={handleCancelEdit}
          editedTitle={editedTitle}
          editedBody={editedBody}
        />
      </div>
    </div>
  );
};

export default Notes;
