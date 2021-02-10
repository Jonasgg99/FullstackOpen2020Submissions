import React, { useState } from 'react';

const BlogForm = ( { createBlog } ) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    console.log('adding blog');

    const newBlog = { title, author, url };
    console.log(newBlog);

    createBlog(newBlog);

    setTitle('');
    setUrl('');
    setAuthor('');
  };
  return (
    <form onSubmit={addBlog}>
      <h2>Create new</h2>
    Title:<input value={title} onChange={({ target }) => setTitle(target.value)} />
      <br/>Author:<input value={author} onChange={({ target }) => setAuthor(target.value)} />
      <br/>Url:<input value={url} onChange={({ target }) => setUrl(target.value)} />
      <br/><button type='submit'>Submit</button>
    </form>
  );
};

export default BlogForm;