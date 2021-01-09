import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  // case 'LIKE': {
  //   const id = action.data.likedBlog.id
  //   // simplificar
  //   const blogToChange = state.find(a => a.id === id)
  //   const changedBlog = {
  //     ...blogToChange,
  //     likes: blogToChange.likes + 1
  //   }
  //   return state.map(blog =>
  //     blog.id !== id ? blog : changedBlog
  //   )
  // }
  case 'NEW_BLOG': {
    return [...state, action.data]
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

// export const likeBlog = (blog) => {
//   return async dispatch => {
//     const likedBlog = await blogService.update(blog.id, blog)
//     dispatch({
//       type: 'LIKE',
//       data: { likedBlog }
//     })
//   }
// }

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