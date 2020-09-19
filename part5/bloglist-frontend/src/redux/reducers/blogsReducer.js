import blogService from '../../services/blogs'

const initialState = []

const blogsReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return [ ...action.data ]
  case 'CREATE_BLOG':
    return [ ...state, action.data ]
  case 'DELETE_BLOG':
    return state.filter(blog => blog.id === action.data.id ? null : blog)
  default:
    return state
  }
}

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
    console.log('Dispatch maybe completed')
  }
}

export const createBlog = (blog) => {
  return async (dispatch, getState) => {
    const { user } = getState()
    console.log('user is ', user)
    blogService.setToken(user.token)
    const createdBlog = await blogService.addBlog(blog)
    dispatch({
      type: 'CREATE_BLOG',
      data: createdBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    console.log('deleting blog')
    dispatch({
      type: 'DELETE_BLOG',
      data: { id }
    })
  }
}

export default blogsReducer