import React from 'react';
import PropTypes from 'prop-types';

import './task-list.css';
import Task from '../task';

const TaskList = ({ todoData, onDeleted, onToggleCompleted, onToggleEditing, onChanged }) => {
  const itemsList = todoData.map((item) => {
    const { id } = item;

    return (
      <Task
        {...item}
        onDeleted={() => onDeleted(id)}
        onToggleCompleted={() => onToggleCompleted(id)}
        onToggleEditing={() => onToggleEditing(id)}
        onChanged={onChanged}
        key={id}
      />
    );
  });

  return (
    <section className="main">
      <ul className="todo-list">{itemsList}</ul>
    </section>
  );
};

TaskList.defaultProps = {
  onDeleted: () => {},
  onToggleCompleted: () => {},
  onToggleEditing: () => {},
  onChanged: () => {},
  todoData: [],
};

TaskList.propTypes = {
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onToggleEditing: PropTypes.func,
  onChanged: PropTypes.func,
  todoData: PropTypes.array,
};

export default TaskList;
