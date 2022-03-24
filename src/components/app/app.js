import React, { useState } from 'react';

import Header from '../header';
import TaskList from '../task-list';
import Footer from '../footer';
import './app.css';

const App = () => {
  let maxId = 132;

  const createTodoItem = (label, timer = 0) => {
    return {
      label,
      id: maxId++,
      completed: false,
      editing: false,
      timeCreating: Date.now(),
      timer: timer,
    };
  };

  const [todoData, setData] = useState([
    createTodoItem('Test1', 55000),
    createTodoItem('Test2', 5000),
    { ...createTodoItem('Test3', 25000000), completed: true },
  ]);

  const [filterStatus, setFilterStatus] = useState('all');

  const findItemById = (id) => {
    return todoData.findIndex((el) => el.id === id);
  };

  const changeTask = (id, nameProp, newValue) => {
    setData((oldData) => {
      const index = findItemById(id);

      let newItem;
      switch (nameProp) {
        case 'label':
          newItem = { ...oldData[index], label: newValue, editing: false };
          break;
        default:
          newItem = { ...oldData[index], [nameProp]: newValue };
      }

      const newArr = [...oldData.slice(0, index), newItem, ...todoData.slice(index + 1)];

      return newArr;
    });
  };

  const deleteTask = (id) => {
    setData((oldData) => {
      const index = findItemById(id);
      const newArr = [...oldData.slice(0, index), ...oldData.slice(index + 1)];

      return newArr;
    });
  };

  const filterTasks = (filterStatus) => {
    setFilterStatus(filterStatus);
  };

  const clearCompletedTasks = () => {
    setData((oldData) => {
      const newArr = oldData.filter(({ completed }) => !completed);

      return newArr;
    });
  };

  const addTask = (label, timer = 0) => {
    setData((oldData) => {
      return [...oldData, createTodoItem(label, timer)];
    });
  };

  const toggleProperty = (arr, id, propName) => {
    const index = findItemById(id);
    const oldItem = arr[index];

    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
  };

  const onToggleCompleted = (id) => {
    setData((oldData) => {
      return toggleProperty(oldData, id, 'completed');
    });
  };

  const onToggleEditing = (id) => {
    setData((oldData) => {
      return toggleProperty(oldData, id, 'editing');
    });
  };

  const filterData = (filterStatus) => {
    switch (filterStatus) {
      case 'completed':
        return todoData.filter(({ completed }) => completed);
      case 'active':
        return todoData.filter(({ completed }) => !completed);
      case 'all':
      default:
        return todoData;
    }
  };

  const tasksLeft = todoData.reduce((count, el) => {
    return el.completed ? count : count + 1;
  }, 0);

  const filteredData = filterData(filterStatus);

  return (
    <div className="todoapp">
      <Header onTaskAdded={addTask} />
      <TaskList
        todoData={filteredData}
        onDeleted={deleteTask}
        onToggleCompleted={onToggleCompleted}
        onToggleEditing={onToggleEditing}
        onChanged={changeTask}
      />
      <Footer
        tasksLeft={tasksLeft}
        onDeletedCompeted={clearCompletedTasks}
        onFiltered={filterTasks}
        filterStatus={filterStatus}
      />
    </div>
  );
};

export default App;
