import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, canDelete }) => {
  const [details, setDetails] = useState(false)

  const toggleDetails = () => {
    setDetails(!details)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const getDetails = () => (
    <div>
      <p className={'url'}>{blog.url}</p>
      <p className={'likes'}>{blog.likes}<button className={'likeButton'} onClick={likeBlog}>like</button></p>
      <p className={'username'}>{blog.user.name}</p>
      {canDelete && <button onClick={removeBlog}>remove</button>}
    </div>
  )

  const likeBlog = async () => {
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
    <div style={blogStyle} className="blog">
      <div>
        <p className={'title'}>{blog.title}</p>
        <p className={'author'}>{blog.author}</p>
        <button className={'detailsButton'} onClick={toggleDetails}>{details ? 'hide' : 'view'}</button>
      </div>
      {details && getDetails()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  canDelete: PropTypes.bool.isRequired
}

export default Blog
