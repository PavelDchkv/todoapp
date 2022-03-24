import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

const NewTaskForm = ({ onTaskAdded }) => {
  const [label, setLabel] = useState('');
  const [timerMin, setMin] = useState('');
  const [timerSec, setSec] = useState('');

  const onInputChange = (ev, type) => {
    let newValue = type === 'label' ? ev.target.value.replace(/^(\s)/g, '') : ev.target.value.replace(/^(0+)|\D/g, '');
    if (type === 'timerSec') {
      if (newValue > 59) newValue = 59;
      setSec(newValue);
    }

    if (type === 'label') {
      setLabel(newValue);
      return;
    }

    setMin(newValue);
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!label) return;
    const timer = timerSec * 1000 + timerMin * 60000;
    onTaskAdded(label, timer);
    setSec('');
    setMin('');
    setLabel('');
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        className="new-todo"
        placeholder="Task"
        onChange={(e) => onInputChange(e, 'label')}
        value={label}
        autoFocus
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={(e) => onInputChange(e, 'timerMin')}
        value={timerMin}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={(e) => onInputChange(e, 'timerSec')}
        value={timerSec}
      />
      <input className="new-todo--form__submit" type="submit" />
    </form>
  );
};

NewTaskForm.defaultProps = {
  onTaskAdded: () => {},
};
NewTaskForm.propTypes = {
  onTaskAdded: PropTypes.func,
};

export default NewTaskForm;
