import React, { useState } from 'react';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import ToDoList from './todolist/ToDoList';
import './App.css';

function App() {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [lists, setLists] = useState(['List 1', 'List 2', 'List 3', 'List 4']); // Initialize with default lists
  const [activeList, setActiveList] = useState('List 1');

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const switchList = (listName) => {
    setActiveList(listName);
  };

  const addList = (listName) => {
    if (!lists.includes(listName)) {
      setLists([...lists, listName]);
      setActiveList(listName); // Automatically switch to the new list
    }
  };

  const deleteList = (listName) => {
    const updatedLists = lists.filter((list) => list !== listName);
    setLists(updatedLists);
    if (activeList === listName && updatedLists.length > 0) {
      setActiveList(updatedLists[0]); // Switch to the first list if the active one is deleted
    } else if (updatedLists.length === 0) {
      setActiveList(''); // Handle case where all lists are deleted
    }
  };

  return (
    <div className="App">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="main-content">
        {isSidebarVisible && (
          <Sidebar
            lists={lists}
            switchList={switchList}
            activeList={activeList}
            addList={addList}
            deleteList={deleteList}
          />
        )}
        <div className="content">
          {activeList && <ToDoList activeList={activeList} />}
        </div>
      </div>
    </div>
  );
}

export default App;
