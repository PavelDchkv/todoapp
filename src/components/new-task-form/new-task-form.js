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
    timerMin: '',
    timerSec: '',
  };

  onInputChange = (ev, type) => {
    let newValue = type === 'label' ? ev.target.value.replace(/^(\s)/g, '') : ev.target.value.replace(/^(0+)|\D/g, '');
    if (type === 'timerSec' && newValue > 59) newValue = 59;
    this.setState({
      [type]: newValue,
    });
  };

  onSubmit = (ev) => {
    ev.preventDefault();
    const { label, timerMin, timerSec } = this.state;
    if (!label) return;
    const timer = timerSec * 1000 + timerMin * 60000;
    this.props.onTaskAdded(this.state.label, timer);
    this.setState({
      label: '',
      timerMin: '',
      timerSec: '',
    });
  };

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="Task"
          onChange={(e) => this.onInputChange(e, 'label')}
          value={this.state.label}
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={(e) => this.onInputChange(e, 'timerMin')}
          value={this.state.timerMin}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={(e) => this.onInputChange(e, 'timerSec')}
          value={this.state.timerSec}
        />
        <input className="new-todo--form__submit" type="submit" />
      </form>
    );
  }
}
