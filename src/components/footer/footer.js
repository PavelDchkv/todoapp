import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../tasks-filter';
import './footer.css';

const Footer = ({ tasksLeft, onDeletedCompeted, onFiltered, filterStatus }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{tasksLeft} items left</span>
      <TasksFilter onFiltered={onFiltered} filterStatus={filterStatus} />
      <button className="clear-completed" onClick={onDeletedCompeted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  tasksLeft: 0,
  onDeletedCompeted: () => {},
  onFiltered: () => {},
  filterStatus: 'all',
};

Footer.propTypes = {
  tasksLeft: PropTypes.number,
  onDeletedCompeted: PropTypes.func,
  onFiltered: PropTypes.func,
  filterStatus: PropTypes.string,
};

export default Footer;
