import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './task.css';

export default class Task extends Component {
  static defaultProps = {
    timeCreating: Date.now(),
    label: '',
    editing: false,
    completed: false,
    onDeleted: () => {},
    onToggleEditing: () => {},
    onToggleCompleted: () => {},
    onChange: () => {},
    id: 100,
  };

  static propTypes = {
    timeCreating: PropTypes.number,
    label: PropTypes.string,
    editing: PropTypes.bool,
    completed: PropTypes.bool,
    onDeleted: PropTypes.func,
    onToggleEditing: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    onChange: PropTypes.func,
    id: PropTypes.number,
  };

  state = {
    inputValue: this.props.label,
  };

  onSubmit = (ev) => {
    ev.preventDefault();

    if (this.state.inputValue.length === 0) {
      this.props.onDeleted(this.props.id);
      return;
    }

    this.props.onChanged(this.props.id, this.state.inputValue);
  };

  onChangeTask = (ev) => {
    this.setState({
      inputValue: ev.target.value,
    });
  };

  render() {
    const { label, editing, completed, onDeleted, onToggleEditing, onToggleCompleted, timeCreating } = this.props;

    let isInputChecked = false;
    let className = '';

    if (editing) className += 'editing';

    if (completed) {
      className += ' completed';
      isInputChecked = true;
    }

    const timeStr = `created ${formatDistanceToNow(timeCreating, { includeSeconds: true })} ago`;

    const formInput = (
      <form onSubmit={this.onSubmit}>
        <input type="text" className="edit" value={this.state.inputValue} onChange={this.onChangeTask} />
      </form>
    );

    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={onToggleCompleted} checked={isInputChecked} />
          <label>
            <span className="description">{label}</span>
            <span className="created">{timeStr}</span>
          </label>
          <button className="icon icon-edit" onClick={onToggleEditing} />
          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>
        {editing && formInput}
      </li>
    );
  }
}
