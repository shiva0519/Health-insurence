// Loading.js

import React from 'react';
import { Spinner } from 'react-bootstrap'; // Example: Using a spinner from a UI library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSpinner } from '@fortawesome/free-solid-svg-icons'; // Example: Using Font Awesome icon
import './Loading.css'


const Loading = ({text}) => {
  return (
    <div className="loading-overlay">
      <div className="loading-text">{text}</div>
      <FontAwesomeIcon icon={faSpinner} className="spinner-icon" spin />
    </div>
  );
};

export default Loading;
