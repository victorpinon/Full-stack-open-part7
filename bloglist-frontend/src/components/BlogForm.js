import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form className={'formDiv'} onSubmit={addBlog}>
      <div>
        title
        <input
          id="title"
          value={title}
          type="text"
          name="title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author
        <input
          id="author"
          value={author}
          type="text"
          name="author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url
        <input
          id="url"
          value={url}
          type="text"
          name="url"
          onChange={handleUrlChange}
        />
      </div>
      <button id="create-button" type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm