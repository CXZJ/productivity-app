import React, { useState } from 'react';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import ToDoList from './todolist/ToDoList';
import './App.css';

function App() {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [lists, setLists] = useState(['List 1', 'List 2', 'List 3']);
  const [activeList, setActiveList] = useState('List 1');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const switchList = (listName) => {
    setActiveList(listName);
  };

  const addList = (listName) => {
    if (!lists.includes(listName)) {
      setLists([...lists, listName]);
      setActiveList(listName);
    }
  };

  const deleteList = (listName) => {
    const updatedLists = lists.filter((list) => list !== listName);
    setLists(updatedLists);
    if (activeList === listName && updatedLists.length > 0) {
      setActiveList(updatedLists[0]);
    } else if (updatedLists.length === 0) {
      setActiveList('');
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const results = [];
    lists.forEach((listName) => {
      const todos = getTodos(listName);
      todos.forEach((todo) => {
        if (todo.text.toLowerCase().includes(query.toLowerCase())) {
          results.push({ listName, todo });
        }
      });
    });
    setSearchResults(results);
  };

  const onResultClick = (listName) => {
    switchList(listName);
    setSearchQuery(''); // Clear search query
    setSearchResults([]); // Clear search results
  };

  return (
    <div className="App">
      <Navbar
        toggleSidebar={toggleSidebar}
        handleSearch={handleSearch}
        searchResults={searchResults}
        onResultClick={onResultClick}
      />
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
          {activeList && (
            <ToDoList activeList={activeList} searchQuery={searchQuery} />
          )}
        </div>
      </div>
    </div>
  );
}

function getTodos(listName) {
  const todos = localStorage.getItem(`todos-${listName}`);
  return todos ? JSON.parse(todos) : [];
}

export default App;
