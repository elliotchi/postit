import React, { PropTypes } from 'react';
import { button } from './styles.css';

const FacebookAuthButton = ({isFetching, onAuth}) => (
  <button onClick={onAuth} className={button}>
    {isFetching ? 'Loading' : 'Login with facebook'}
  </button>
)

FacebookAuthButton.propTypes = {
  onAuth: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default FacebookAuthButton;
