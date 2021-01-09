import React from 'react'
import { useSelector } from 'react-redux'
import {
  useParams
} from 'react-router-dom'

const Blog = ({ blogs, updateBlog, deleteBlog }) => {
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  const user = useSelector(state => state.user)

  const canDelete = blog.user.username === user.username

  const handleLike = async () => {
    const blogToLike = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    updateBlog(blog.id, blogToLike)
  }

  const removeBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div className="blog">
      <div>
        <h1>{blog.title} {blog.author}</h1>
        <p className={'url'}>{blog.url}</p>
        <p className={'likes'}>{blog.likes}<button className={'likeButton'} onClick={handleLike}>like</button></p>
        <p className={'username'}>added by {blog.user.name}</p>
        {canDelete && <button onClick={removeBlog}>remove</button>}
      </div>
    </div>
  )
}

export default Blog
