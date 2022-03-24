import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './task.css';

const Task = ({
  timeCreating,
  label,
  editing,
  completed,
  onDeleted,
  onToggleEditing,
  onToggleCompleted,
  onChanged,
  id,
  timer,
}) => {
  const [inputValue, setInputValue] = useState(label);
  const [isTimerActive, setTimerActive] = useState(false);

  let intervalId = null;

  const updateTimer = useCallback(() => {
    onChanged(id, 'timer', timer - 1000);
    if (timer === 1000) setTimerActive(false);
  }, [timer]);

  useEffect(() => {
    if (isTimerActive) {
      intervalId = setInterval(updateTimer, 1000);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isTimerActive, updateTimer]);

  const onPlay = () => {
    if (intervalId !== null || completed || !timer) return;
    setTimerActive(true);
  };

  const onPause = () => {
    if (intervalId === null) return;
    setTimerActive(false);
  };

  const onSubmit = (ev) => {
    ev.preventDefault();

    if (inputValue.length === 0) {
      onDeleted(id);
      return;
    }

    onChanged(id, 'label', inputValue);
  };

  const onChangeTask = (ev) => {
    setInputValue(ev.target.value);
  };

  const onToggleCompletedMod = () => {
    onToggleCompleted();
    if (intervalId === null) return;
    onPause();
  };

  const formattedTimer = (time) => {
    let seconds = time / 1000;
    const sec = seconds % 60;
    const hours = Math.floor(seconds / 3600);
    const min = ((seconds % 3600) - sec) / 60;
    return `${hours ? hours + ':' : ''}${('0' + min).slice(-2)}:${('0' + sec).slice(-2)}`;
  };

  let isInputChecked = false;
  let className = '';

  if (editing) className += 'editing';

  if (completed) {
    className += ' completed';
    isInputChecked = true;
  }

  const timeStr = `created ${formatDistanceToNow(timeCreating, { includeSeconds: true })} ago`;

  const formInput = (
    <form onSubmit={onSubmit}>
      <input type="text" className="edit" value={inputValue} onChange={onChangeTask} />
    </form>
  );

  const timerFormatted = formattedTimer(timer);

  const buttonTimer = isTimerActive ? (
    <button className="icon icon-pause" onClick={onPause}></button>
  ) : (
    <button className="icon icon-play" onClick={onPlay}></button>
  );

  return (
    <li className={className}>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={onToggleCompletedMod} checked={isInputChecked} />
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
};

Task.defaultProps = {
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

Task.propTypes = {
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

export default Task;
