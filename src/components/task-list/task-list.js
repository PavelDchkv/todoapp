import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './task-list.css';
import Task from '../task';

export default class TaskList extends Component {
  static defaultProps = {
    onDeleted: () => {},
    onToggleCompleted: () => {},
    onToggleEditing: () => {},
    onChanged: () => {},
    todoData: [],
  };

  static propTypes = {
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    onToggleEditing: PropTypes.func,
    onChanged: PropTypes.func,
    todoData: PropTypes.array,
  };

  render() {
    const { todoData, onDeleted, onToggleCompleted, onToggleEditing, onChanged } = this.props;

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
  }
}
