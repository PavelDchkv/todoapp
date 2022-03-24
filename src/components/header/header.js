import React from 'react';
import PropTypes from 'prop-types';

import NewTaskForm from '../new-task-form';
import './header.css';

const Header = ({ onTaskAdded }) => {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onTaskAdded={onTaskAdded} />
    </header>
  );
};

Header.defaultProps = {
  onTaskAdded: () => {},
};

Header.propTypes = {
  onTaskAdded: PropTypes.func,
};

export default Header;
