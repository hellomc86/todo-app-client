import React from 'react'
import { Link } from 'react-router-dom'
import moment from "moment";
import { useState } from 'react';

const Post = ({ post }) => {
  
  return (
    <article className='post'     
    >
      <div >
        <Link to = {`/post/${post._id}`}>
            <h2>{post.title} </h2>                    
        </Link>    
        <p className='postBody'>{
            (post.content).length <= 25
            ? post.content
            : `${(post.content).slice(0,25)}...`
        }</p>
        </div>
        <p className='postDate'> Status: { post.status === 0 ? "pending": post.status === 1 ? "incomplete" : "completed" } 
        &nbsp; &nbsp; &nbsp; &nbsp; {moment(post.created_date).fromNow()} created. &nbsp; &nbsp; {moment(post.updated_date).fromNow()} updated.  
       
    </p>         
    </article>
  )
}

export default Post