// App.js
import React from 'react';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import ToDoList from './todolist/ToDoList';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <ToDoList />
        </div>
      </div>
    </div>
  );
}

export default App;