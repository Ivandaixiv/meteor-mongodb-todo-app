import React from "react";
import PropTypes from "prop-types";

const ToDoCount = ({ number }) => {
  return <span>{number > 1 ? `Todos: ${number}` : `Todo: ${number}`}</span>;
};

ToDoCount.propTypes = {
  number: PropTypes.number.isRequired
};
export default ToDoCount;
