import Todo from "./completedTodo";
const TodosList = ({
  todos,
  handleDeleteTodo,
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
          handleDeleteTodo={handleDeleteTodo}
        />
      ))}
    </div>
  );
};

export default TodosList;
