import { useState } from 'react'

const Blog = ({ blog, onLike, canDelete, onDelete }) => {
  const [visible, setVisible] = useState(false)

  return (
    <li className="blog">
      {blog.title} {blog.author}{' '}
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={onLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {canDelete && (
            <div>
              <button
                style={{
                  backgroundColor: '#009aff',
                  border: 'none',
                  borderRadius: 5,
                  padding: '4px 10px'
                }}
                onClick={onDelete}
              >
                remove
              </button>
            </div>
          )}
        </div>
      )}
    </li>
  )
}

export default Blog
