import React from 'react';
import PropTypes from 'prop-types';

import './Square.css'

const Square = (props) => {
  
  // For Wave 1 enable this 
  //  Component to alert a parent 
  //  component when it's clicked on.

const handleButtonClick = () => {
  console.log(props.id);
  props.onClickCallback(props.id);
  // which button has been clicked? Result? props.id is the square clicked
}

  console.log(props);

  // shows a button and gives the button value as text when clicked
  return <button className="square" onClick={handleButtonClick}>{props.value}</button>
}

// Use these prop types to identify what to pass in the component
Square.propTypes = {
  value: PropTypes.string.isRequired,
  onClickCallback: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default Square;
