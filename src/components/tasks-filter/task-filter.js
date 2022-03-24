import React from 'react';
import PropTypes from 'prop-types';

import './task-filter.css';

const TasksFilter = ({ onFiltered, filterStatus }) => {
  const filters = [
    { status: 'all', label: 'All' },
    { status: 'active', label: 'Active' },
    { status: 'completed', label: 'Completed' },
  ];

  const filterList = filters.map(({ status, label }) => {
    const className = status === filterStatus ? 'selected' : '';

    return (
      <li key={status}>
        <button className={className} onClick={() => onFiltered(status)}>
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{filterList}</ul>;
};

TasksFilter.defaultProps = {
  onFiltered: () => {},
  filterStatus: 'all',
};

TasksFilter.propTypes = {
  onFiltered: PropTypes.func,
  filterStatus: PropTypes.string,
};

export default TasksFilter;
