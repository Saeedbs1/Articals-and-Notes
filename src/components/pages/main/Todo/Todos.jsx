import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import axios from "axios";
import { MdAdd } from "react-icons/md";
import TodoList from "./TodoList";
import moment from "moment";
import Search from "../common/Search";
import AddNote from "../common/Add";
import "./Todos.scss";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [add, setAdd] = useState(false);
  const [todoCount, setTodoCount] = useState(todos.length);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedBody, setEditedBody] = useState("");

  const url = "https://jsonplaceholder.typicode.com/todos?_limit=50";

  const fetchTodos = async () => {
    try {
      const response = await axios.get(url);
      const date = moment().format('ll');
      const data = response.data;
      const incompleteTodos = data.filter(todo => todo.completed === false);
      const updatedIncompleteTodos = incompleteTodos.map(todo => ({
        ...todo,
        date: date,
      }));
      setTodos(updatedIncompleteTodos);
      setTodoCount(updatedIncompleteTodos.length);
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    fetchTodos();
    const savedTodos = JSON.parse(localStorage.getItem("Todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = async (title, body) => {
    const date = moment().format("ll");
    const newTodo = {
      id: nanoid(),
      title: title,
      body: body,
      date: date,
    };
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        newTodo
      );
      if (response.status === 200) {
        const addedTodo = response.data;
        setTodos([...todos, addedTodo]);
        setTodoCount(todos.length + 1);
        setAdd(false);
      } else {
        console.error("Failed to add todo:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`,id);
    if (response.status === 200) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    setTodoCount(newTodos.length);
  };}

  const handleEditTodo = async (editedId, editedTitle, editedBody) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editedId
        ? {
            ...todo,
            title: editedTitle,
            body: editedBody,
          }
        : todo
    );
    const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${editedId}`,updatedTodos);
    setTodos(updatedTodos);
    if (response.status === 200) {
    setEditingTodoId(null);
    setEditedTitle("");
    setEditedBody("");
    }
  };
  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditedTitle("");
    setEditedBody("");
  };

  const addhandler = () => {
    setAdd(!add);
  };

  return (
    <div className="todos-container">
      <div className="todos-header">
        <h3>
          Todos<span>{todoCount}</span>
        </h3>
        <MdAdd className="addicon" onClick={addhandler} />
      </div>
      <div className="todos">
        <Search handleSearch={setSearchText} />
        {add && <AddNote handleAdd={addTodo} toggleAdd={add} />}
        <TodoList
          todos={todos.filter(
            (todo) =>
            (todo.title?.toLowerCase().includes(searchText.toLowerCase()) ||
            todo.body?.toLowerCase().includes(searchText.toLowerCase()))
          )}
          handleDeleteTodo={deleteTodo}
          editingTodoId={editingTodoId}
          handleEditTodo={handleEditTodo}
          handleCancelEdit={handleCancelEdit}
          editedTitle={editedTitle}
          editedBody={editedBody}
        />
      </div>
    </div>
  );
};

export default Todos;
