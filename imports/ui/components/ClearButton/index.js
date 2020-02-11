import React from "react";
import PropTypes from "prop-types";

const ClearButton = ({ removeCompleted }) => {
  let clearBtn = (
    <button onClick={() => removeCompleted()}>Clear Completed</button>
  );
  return clearBtn;
};

ClearButton.propTypes = {
  removeCompleted: PropTypes.func.isRequired
};

export default ClearButton;
