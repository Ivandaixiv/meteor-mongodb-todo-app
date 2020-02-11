import React from "react";
import PropTypes from "prop-types";

const ToDoCount = ({ number }) => {
  return <span>{number > 0 ? `Todos: ${number}` : `There are no todos`}</span>;
};

ToDoCount.propTypes = {
  number: PropTypes.number.isRequired
};
export default ToDoCount;
