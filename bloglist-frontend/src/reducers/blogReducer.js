import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'LIKE': {
    const id = action.data.likedBlog.id
    const blogToChange = state.find(a => a.id === id)
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1
    }
    return state.map(blog =>
      blog.id !== id ? blog : changedBlog
    )
  }
  case 'NEW_BLOG': {
    return [...state, action.data]
  }
  case 'DELETE': {
    const id = action.data.id
    return state.filter(blog =>
      blog.id !== id
    )
  }
  default: return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const likeBlog = (id, blog) => {
  return async dispatch => {
    const likedBlog = await blogService.update(id, blog)
    dispatch({
      type: 'LIKE',
      data: { likedBlog }
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE',
      data: { id }
    })
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export default blogReducer