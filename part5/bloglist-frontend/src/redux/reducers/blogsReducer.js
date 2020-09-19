import blogService from '../../services/blogs'

const initialState = []

const blogsReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return [ ...action.data ]
  case 'CREATE_BLOG':
    return [ ...state, action.data ]
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

export default blogsReducer