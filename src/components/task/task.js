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
    timer: 0,
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
    timer: PropTypes.number,
  };

  state = {
    inputValue: this.props.label,
    intervalId: null,
  };

  componentWillUnmount() {
    this.onPause();
  }

  updateTimer = () => {
    const { id, onChanged, timer } = this.props;
    onChanged(id, 'timer', timer + 1000);
  };

  onPlay = () => {
    if (this.state.intervalId !== null || this.props.completed) return;
    const intervalId = setInterval(this.updateTimer, 1000);
    this.setState({
      intervalId,
    });
  };

  onPause = () => {
    if (this.state.intervalId === null) return;
    clearInterval(this.state.intervalId);
    this.setState({
      intervalId: null,
    });
  };

  onSubmit = (ev) => {
    ev.preventDefault();

    if (this.state.inputValue.length === 0) {
      this.props.onDeleted(this.props.id);
      return;
    }

    this.props.onChanged(this.props.id, 'label', this.state.inputValue);
  };

  onChangeTask = (ev) => {
    this.setState({
      inputValue: ev.target.value,
    });
  };

  onToggleCompletedMod = () => {
    this.props.onToggleCompleted();
    if (this.state.intervalId === null) return;
    this.onPause();
  };

  formattedTimer(time) {
    let seconds = time / 1000;
    const sec = seconds % 60;
    const hours = Math.floor(seconds / 3600);
    const min = ((seconds % 3600) - sec) / 60;
    return `${hours ? hours + ':' : ''}${('0' + min).slice(-2)}:${('0' + sec).slice(-2)}`;
  }

  render() {
    const { label, editing, completed, onDeleted, onToggleEditing, timeCreating, timer } = this.props;

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

    const timerFormatted = this.formattedTimer(timer);

    const buttonTimer =
      this.state.intervalId === null ? (
        <button className="icon icon-play" onClick={this.onPlay}></button>
      ) : (
        <button className="icon icon-pause" onClick={this.onPause}></button>
      );

    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={this.onToggleCompletedMod} checked={isInputChecked} />
          <label>
            <span className="title">{label}</span>
            {buttonTimer}
            <span className="description">{timerFormatted}</span>
            <span className="description">{timeStr}</span>
          </label>
          <button className="icon icon-edit" onClick={onToggleEditing} />
          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>
        {editing && formInput}
      </li>
    );
  }
}
