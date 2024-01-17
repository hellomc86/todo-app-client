import { Link } from 'react-router-dom'
import { useEffect, useContext } from 'react';
import MainContext from "../api/context";

import apiService from "../api/api.service";

const Nav = () => {
  const {
    todos,
    search,
    setSearch,
    searchResults,
    setSearchResults,
    setTodos
  } = useContext(MainContext);

  const getTodos = async() => {
    const response = await apiService.getTodo();
    const res = []
    response.data.forEach(todoItem => {      
      res.push({
          _id: todoItem._id, 
          title: todoItem.title,
          content: todoItem.content,
          status: todoItem.status,
          created_date: todoItem.created_date,
          updated_date: todoItem.updated_date,          
      })
  })
    setTodos(res);
  };

  useEffect(() => {
    getTodos();
  }, [ ]);

  useEffect(() => {    
    const filteredResults = todos.filter(
      (todo) =>
        todo.content.toLowerCase().includes(search.toLowerCase()) ||
        todo.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [todos, search, setSearchResults]);
  
  return (
    <nav className="Nav">
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search">Search Todos</label>
      
     <input
      id="search"
      type="text"
      placeholder="Search Todos"
      value = {search}
      onChange={(e)=> setSearch(e.target.value)}
      />
      </form>
      <ul>
        <li> <Link to = "/">Todo Home</Link> </li>
        <li> <Link to = "/post">Add Todo</Link> </li>
        <li> <Link to = "/about">About</Link> </li>
      </ul>
    </nav>
  );
};

export default Nav;
