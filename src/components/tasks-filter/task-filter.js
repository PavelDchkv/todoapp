import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './task-filter.css';

export default class TasksFilter extends Component {
  static defaultProps = {
    onFiltered: () => {},
    filterStatus: 'all',
  };

  static propTypes = {
    onFiltered: PropTypes.func,
    filterStatus: PropTypes.string,
  };

  render() {
    const { onFiltered, filterStatus } = this.props;

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
  }
}
