import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import MainContext from "../api/context";
import apiService from "../api/api.service";

const PostPage = () => {
  const { id } = useParams();
  const {
    todos,
    setTodos
  } = useContext(MainContext);
  
  const postGet = (()=>{
    return todos.find(post =>(post._id).toString() === id);
  })

  const post = postGet();

  const history = useNavigate();
  
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

  const deleteTodo = async() => {
    await apiService.deleteTodo(post._id);
    await getTodos();
    history("/");  
  };
 
  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            <h2> {post.title} </h2>
            <p className="postDate">{post.created_date}</p>
            <p className="postBody">{post.content}</p>
            <Link to = {`/edit/${post._id}`}> <button className="editButton">Edit Post</button> </Link>
            <button className="deleteButton" onClick={() => deleteTodo()}>Delete Post</button>
          </>
        )}
        {!post && (
          <>
            <h2> Post Not Found </h2>
            <p> Well, that's dissapointing. </p>
            <p>
              <Link to="/"> Visit Our Homepage </Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
