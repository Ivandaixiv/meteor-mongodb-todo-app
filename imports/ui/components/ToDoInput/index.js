import React from "react";
import PropTypes from "prop-types";
const ToDoInput = React.forwardRef(({ addToDo }, ref) => (
  <div className="add-todo">
    <form name="addTodo" onSubmit={addToDo}>
      <input type="text" ref={ref} />
      <span>(press enter to add) </span>
    </form>
  </div>
));
ToDoInput.propTypes = {
  addToDo: PropTypes.func.isRequired
};
export default ToDoInput;
