import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({
      ...newBlog,
      [name]: value,
    });
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog(newBlog);
    setNewBlog({
      title: "",
      author: "",
      url: "",
    });
  };
  return (
    <form onSubmit={addBlog}>
      <h2>Create new Blog</h2>
      <div>
        <label htmlFor="title">title:</label>
        <input
          id="title"
          name="title"
          value={newBlog.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="author">author:</label>
        <input
          id="author"
          name="author"
          value={newBlog.author}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="url">url:</label>
        <input
          id="url"
          name="url"
          value={newBlog.url}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
