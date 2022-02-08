import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NewTaskForm from '../new-task-form';
import './header.css';

export default class Header extends Component {
  static defaultProps = {
    onTaskAdded: () => {},
  };

  static propTypes = {
    onTaskAdded: PropTypes.func,
  };

  render() {
    const { onTaskAdded } = this.props;

    return (
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onTaskAdded={onTaskAdded} />
      </header>
    );
  }
}
