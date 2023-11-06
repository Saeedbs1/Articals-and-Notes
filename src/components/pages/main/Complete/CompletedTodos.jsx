import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import axios from "axios";
import { MdAdd } from "react-icons/md";
import TodoList from "../Complete/CompletedTodoList";
import moment from "moment";
import Search from "../common/Search";
import AddNote from "../common/Add";
import "./CompletedTodos.scss";

const CompletedTodos = () => {
  const [todos, setTodos] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [add, setAdd] = useState(false);
  const [todoCount, setTodoCount] = useState(todos.length);

  const url = "https://jsonplaceholder.typicode.com/todos?_limit=50";

  const fetchTodos = async () => {
    try {
      const response = await axios.get(url);
      const date = moment().format('ll');
      const data = response.data;
      const completedTodos = data.filter(todo => todo.completed === true);
      const updatedCompletedTodos = completedTodos.map(todo => ({
        ...todo,
        date: date,
      }));
      setTodos(updatedCompletedTodos);
      setTodoCount(updatedCompletedTodos.length);
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
    const date = moment().format('ll');
    const newTodo = {
      id: nanoid(),
      title: title,
      body: body,
      date: date,
    };
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos', newTodo);
      if (response.status === 201) {
        const addedTodo = response.data;

        setTodos([...todos, addedTodo]);
        setTodoCount(todos.length + 1);
        setAdd(false);
      } else {
        console.error('Failed to add todo:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while adding todo:', error);
    }
  };


  const deleteTodo = async (id) => {
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    if (response.status === 200) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    setTodoCount(newTodos.length);
  };}

  const addhandler = () => {
    setAdd(!add);
  };

  return (
    <div className="completedTodos-container">
      <div className="todos-header">
        <h3>
          Todos<span>{todoCount}</span>
        </h3>
        <MdAdd className="addicon" onClick={addhandler} />
      </div>
      <div className="completedTodos">
        <Search handleSearch={setSearchText} />
        {add && <AddNote handleAdd={addTodo} toggleAdd={add} />}
        <TodoList
          todos={todos.filter(
            (todo) =>
            todo.title?.toLowerCase().includes(searchText.toLowerCase()) ||
            todo.body?.toLowerCase().includes(searchText.toLowerCase())
          )}
          handleDeleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
};

export default CompletedTodos;
