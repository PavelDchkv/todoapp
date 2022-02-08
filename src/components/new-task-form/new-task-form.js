import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends Component {
  static defaultProps = {
    onTaskAdded: () => {},
  };

  static propTypes = {
    onTaskAdded: PropTypes.func,
  };

  state = {
    label: '',
  };

  onLabelChange = (ev) => {
    this.setState({
      label: ev.target.value,
    });
  };

  onSubmit = (ev) => {
    ev.preventDefault();
    this.props.onTaskAdded(this.state.label);
    this.setState({
      label: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={this.state.label}
          autoFocus
        />
      </form>
    );
  }
}
