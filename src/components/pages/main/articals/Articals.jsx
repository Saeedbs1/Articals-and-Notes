import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import ArticalsList from "./ArticalsList";
import { MdAdd } from "react-icons/md";
import Search from "../common/Search";
import moment from "moment";
import Addartical from "../common/Add";

const Articals = () => {
  const [articals, setArticals] = useState([
    {
      id: nanoid(),
      title: "This is my first artical!",
      body: "This is my new artical!",
      date: "Sep 10, 2023",
    },
    {
      id: nanoid(),
      title: "This is my second artical!",
      body: "This is my new artical!",
      date: "Sep 21, 2020",
    },
  ]);
 
  const [searchText, setSearchText] = useState("");
  const [add, setAdd] = useState(false);
  const [articalCount, setArticalCount] = useState(articals.length);

  const [editingArticalId, setEditingArticalId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedBody, setEditedBody] = useState("");


  useEffect(() => {
    const savedArticals = JSON.parse(localStorage.getItem("articals"));
  
    if (savedArticals) {
      setArticals(savedArticals);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("articals", JSON.stringify(articals));
  }, [articals]); 

  const addArtical = (title, body) => {
    const date = moment().format('ll');
    const newArtical = {
      id: nanoid(),
      title: title,
      body: body,
      date: date,
    };
    const newArticals = [...articals, newArtical];
    setArticals(newArticals);
    setArticalCount(newArticals.length);
    setAdd(false);
  };

  const deleteArtical = (id) => {
    const newArticals = articals.filter((artical) => artical.id !== id);
    setArticals(newArticals);
    setArticalCount(newArticals.length);
  };

  const handleEditArtical = (editedId, editedTitle, editedBody) => {
    const updatedArticals = articals.map((artical) =>
      artical.id === editedId
        ? {
            ...artical,
            title: editedTitle,
            body: editedBody,
          }
        : artical
    );
    setArticals(updatedArticals);
    setEditingArticalId(null);
    setEditedTitle("");
    setEditedBody("");
  };

  const handleCancelEdit = () => {
    setEditingArticalId(null);
    setEditedTitle("");
    setEditedBody("");
  };

  const addhandler = () => {
    setAdd(!add);
  };

  return (
    <div className="articals-container">
      <div className="articals-header">
        <h3>
          Articals<span>{articalCount}</span>
        </h3>
        <MdAdd className="addicon" onClick={addhandler} />
      </div>
      <div className="articals">
        <Search handleSearch={setSearchText} />
        {add && <Addartical handleAdd={addArtical} toggleAdd={true} />}
        <ArticalsList
          articals={articals.filter(
            (artical) =>
              artical.title?.toLowerCase().includes(searchText.toLowerCase()) ||
              artical.body?.toLowerCase().includes(searchText.toLowerCase())
          )}
          handleDeleteArtical={deleteArtical}
          editingArticalId={editingArticalId}
          handleEditArtical={handleEditArtical}
          handleCancelEdit={handleCancelEdit}
          editedTitle={editedTitle}
          editedBody={editedBody}
          searchText={searchText}
        />
      </div>
    </div>
  );
};

export default Articals;
