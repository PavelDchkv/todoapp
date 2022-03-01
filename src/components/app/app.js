import React, { Component } from 'react';

import Header from '../header';
import TaskList from '../task-list';
import Footer from '../footer';
import './app.css';

export default class App extends Component {
  maxId = 132;
  state = {
    todoData: [
      this.createTodoItem('Test1', 55000),
      this.createTodoItem('Test2', 5000),
      { ...this.createTodoItem('Test3', 25000000), completed: true },
    ],
    filterStatus: 'all',
  };

  findItemById(id) {
    return this.state.todoData.findIndex((el) => el.id === id);
  }

  changeTask = (id, nameProp, newValue) => {
    this.setState(({ todoData }) => {
      const index = this.findItemById(id);

      let newItem;
      switch (nameProp) {
        case 'label':
          newItem = { ...todoData[index], label: newValue, editing: false };
          break;
        default:
          newItem = { ...todoData[index], [nameProp]: newValue };
      }

      const newArr = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];

      return {
        todoData: newArr,
      };
    });
  };

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const index = this.findItemById(id);
      const newArr = [...todoData.slice(0, index), ...todoData.slice(index + 1)];

      return {
        todoData: newArr,
      };
    });
  };

  filterTasks = (filterStatus) => {
    this.setState({
      filterStatus: filterStatus,
    });
  };

  clearCompletedTasks = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter(({ completed }) => !completed);

      return {
        todoData: newArr,
      };
    });
  };

  createTodoItem(label, timer = 0) {
    return {
      label,
      id: this.maxId++,
      completed: false,
      editing: false,
      timeCreating: Date.now(),
      timer: timer,
    };
  }

  addTask = (label, timer = 0) => {
    this.setState(({ todoData }) => {
      return {
        todoData: [...todoData, this.createTodoItem(label, timer)],
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const index = this.findItemById(id);
    const oldItem = arr[index];

    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
  }

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'completed'),
      };
    });
  };

  onToggleEditing = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'editing'),
      };
    });
  };

  filterData(filterStatus) {
    switch (filterStatus) {
      case 'completed':
        return this.state.todoData.filter(({ completed }) => completed);
      case 'active':
        return this.state.todoData.filter(({ completed }) => !completed);
      case 'all':
      default:
        return this.state.todoData;
    }
  }

  render() {
    const { todoData, filterStatus } = this.state;

    const tasksLeft = todoData.reduce((count, el) => {
      return el.completed ? count : count + 1;
    }, 0);

    const filteredData = this.filterData(filterStatus);

    return (
      <div className="todoapp">
        <Header onTaskAdded={this.addTask} />
        <TaskList
          todoData={filteredData}
          onDeleted={this.deleteTask}
          onToggleCompleted={this.onToggleCompleted}
          onToggleEditing={this.onToggleEditing}
          onChanged={this.changeTask}
        />
        <Footer
          tasksLeft={tasksLeft}
          onDeletedCompeted={this.clearCompletedTasks}
          onFiltered={this.filterTasks}
          filterStatus={filterStatus}
        />
      </div>
    );
  }
}
