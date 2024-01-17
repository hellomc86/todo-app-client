

import Header from "./todo/Header";
import Nav from "./todo/Nav";
import Home from "./todo/Home";
import NewPost from "./todo/NewPost";
import PostPage from "./todo/PostPage";
import About from "./todo/About";
import Missing from "./todo/Missing";
import { Routes, Route} from "react-router-dom";
import EditPost from "./todo/EditPost";
import { useState } from "react";
import MainContext from "./api/context";


function App() {
  const [ todos, setTodos ] = useState([]);
  const [ search, setSearch ] = useState("");
  const [ searchResults, setSearchResults ] = useState([]);
  const [ todoTitle, setTodoTitle ] = useState("");
  const [ todoBody, setTodoBody ] = useState("");
  const [ todoStatus, setTodoStatus ] = useState(0);
  const [ fetchError, setFetchError ] = useState("");
  const [ isLoading, setisLoading ] = useState(false);
  const [ update, setUpdate ] = useState(null);

  const states = {
    todos,
    setTodos,
    search,
    setSearch,
    searchResults,
    setSearchResults,
    todoTitle,
    setTodoTitle,
    todoBody,
    setTodoBody,
    todoStatus,
    setTodoStatus,
    update,
    setUpdate
  };


  return <MainContext.Provider value={states}>
    <div className="App">      
        <Header title="Todo Application" />        
        <Nav />
        <Routes>
          <Route path="/" element={<Home          
          fetchError = {fetchError}
          isLoading = {isLoading}
          />} />
          <Route path="post" element={<NewPost/>}/>
          <Route path="edit/:id" Component = {EditPost}  />
          <Route path="post/:id" element={<PostPage/>}/>
          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>        
    </div>
    </MainContext.Provider>
}

export default App;
