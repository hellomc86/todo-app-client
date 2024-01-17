import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import MainContext from "../api/context";
import apiService from "../api/api.service";
import RadioButton from "../form/radioButtonGroup";


const EditPost = () => {
  const history = useNavigate();
  const { id } = useParams();
  const [selectedRadionButton, setSelectedRadionButton] = useState("");
  const [ editTitle, setEditTitle ] = useState("");
  const [ editBody, setEditBody ] = useState("");
  const [ todoStatus, setTodoStatus ] = useState(0);

  const {
    todos,
    setTodos
  } = useContext(MainContext);
  
  const postGet = (()=>{
    return todos.find(post =>(post._id).toString() === id);
  })

  const post = postGet();
  
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
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.content);
      setSelectedRadionButton(post.status === 0 ? "pending" : post.status === 1 ? "incomplete": "completed")
    }
  }, [post, setEditTitle, setEditBody]);

  



  const handleEdit = async (id) => {  
      
    const updatedPost = { title: editTitle, content: editBody, status: selectedRadionButton === "pending" ? 0 :
    selectedRadionButton === "incomplete" ? 1 : 2};
    await apiService.updateTodo(id, updatedPost);
    await getTodos();
    
    history(`/`);
    
  };

  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h2>Edit Todo </h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title:</label>
            <input
              id="postTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Post:</label>
            <textarea
              id="postBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <label className='RadioButtonGroup' htmlFor="radioGroup">Status:</label>
        <RadioButton id = "radioGroup" selectedRadionButton = {selectedRadionButton} setSelectedRadionButton = {setSelectedRadionButton}/>
        
            <button type="button" onClick={() => handleEdit(post._id)}>
              Submit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2> Post Not Found </h2>
          <p> Well, that's dissapointing. </p>
          <p>
            <Link to="/"> Visit Our Homepage </Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPost;
