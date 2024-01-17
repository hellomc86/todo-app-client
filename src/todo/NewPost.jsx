import { useNavigate } from 'react-router-dom';

import { useContext, useState } from 'react';

import RadioButton from "../form/radioButtonGroup";
import apiService from "../api/api.service";
import MainContext from "../api/context";

const NewPost = () => {  
  const history = useNavigate();

  const [selectedRadionButton, setSelectedRadionButton] = useState("pending");
  const {
    todos,
    setTodos,
    todoTitle,
    setTodoTitle,
    todoBody,
    setTodoBody,
    todoStatus,
    setTodoStatus,
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


  const handleSubmit = async (e) => {
    e.preventDefault();    
    const newPost = { title: todoTitle, content: todoBody, status: selectedRadionButton === "pending" ? 0 :
    selectedRadionButton === "incomplete" ? 1 : 2};
    await apiService.addTodo(newPost);
    await getTodos();
    history("/");   
  };

 
  
  return (
    <main className="NewPost">
      <h2>New Todo</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input
          id="postTitle"
          type="text"
          required
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        <label htmlFor="postBody">Task:</label>
        <textarea
          id="postBody"
          required
          value={todoBody}
          onChange={(e) => setTodoBody(e.target.value)}
        />
        <label className='RadioButtonGroup' htmlFor="radioGroup">Status:</label>
        <RadioButton id = "radioGroup" selectedRadionButton = {selectedRadionButton} setSelectedRadionButton = {setSelectedRadionButton}/>
        
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
