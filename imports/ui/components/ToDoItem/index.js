import React from "react";
import PropTypes from "prop-types";
const ToDoItem = ({ todo, toggleComplete, removeTodo }) => {
  return (
    <li>
      {todo.title}
      {/* Other solution is defaultChecked */}
      <input
        type="checkbox"
        id={todo._id}
        checked={todo.complete}
        onChange={toggleComplete}
      />
      <label htmlFor={todo._id} />
      <button onClick={removeTodo}>
        <i className="fa fa-trash" />
      </button>
    </li>
  );
};

ToDoItem.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired
  }).isRequired
};
export default ToDoItem;
