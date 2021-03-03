import React, { useState } from 'react';
import { addBlog as addNewBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const BlogForm = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    const newBlog = { title, author, url };
    dispatch(addNewBlog(newBlog))
    
    // dispatch notificatioon //
    //createBlog(newBlog);//

    setTitle('');
    setUrl('');
    setAuthor('');
  };
  return (
    <form onSubmit={addBlog}>
      <h2>Create new</h2>
    Title:<input id='title' value={title} onChange={({ target }) => setTitle(target.value)} />
      <br/>Author:<input id='author' value={author} onChange={({ target }) => setAuthor(target.value)} />
      <br/>Url:<input id='url' value={url} onChange={({ target }) => setUrl(target.value)} />
      <br/><button type='submit'>Submit</button>
    </form>
  );
};

export default BlogForm;