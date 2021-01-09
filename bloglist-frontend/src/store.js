import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import blogService from './services/blogs'


const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: userReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

blogService.getAll().then(blogs =>
  blogs.forEach(blog => {
    store.dispatch({ type: 'NEW_BLOG', data: blog })
  })
)

export default store