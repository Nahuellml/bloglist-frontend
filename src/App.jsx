import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: null,
    type: null
  })

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000)
  }

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      setUser(user)
      showNotification('Loggeado correctamente')
    } catch {
      showNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      showNotification(
        `a new blog '${returnedBlog.title}' by ${returnedBlog.author} added`
      )
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Error creating blog'
      showNotification(errorMsg, 'error')
    }
  }

  const handleLike = async (blog) => {
    const blogToUpdate = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    try {
      const returnedBlog = await blogService.update(blog.id, blogToUpdate)
      const updatedBlogs = blogs
        .map((b) =>
          b.id !== blog.id ? b : { ...returnedBlog, user: blog.user }
        )
        .sort((a, b) => b.likes - a.likes)
      setBlogs(updatedBlogs)
    } catch {
      setNotification('Error updating likes', 'error')
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
        showNotification(`Deleted ${blog.title}`)
      } catch {
        showNotification('Error: could not delete the blog', 'error')
      }
    }
  }

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />
      {user === null ? (
        <LoginForm loginUser={handleLogin} />
      ) : (
        <div>
          <h1>blogs</h1>
          <div style={{ marginBottom: 20 }}>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </div>

          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <ul>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                onLike={() => handleLike(blog)}
                canDelete={blog.user.id === user.id}
                onDelete={() => handleDelete(blog)}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
