import Todo from "./Todo";
const TodosList = ({
  todos,
  handleCancelEdit,
  handleDeleteTodo,
  handleEditTodo,
}) => {
  return (
    <div className="todos-list">
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          title={todo.title}
          body={todo.body}
          date={todo.date}
          handleCancelEdit={handleCancelEdit}
          handleDeleteTodo={handleDeleteTodo}
          handleEditTodo={handleEditTodo}
        />
      ))}
    </div>
  );
};

export default TodosList;
