import blogService from '../../services/blogs'

const initialState = []

const getBlogById = (id, blogs) => {
  return { ...blogs.filter(blog => blog.id === id)[0] }
}

const blogsReducer = (state = initialState, action) => {
  let updatedState = {}
  let updatedBlog = {}
  switch(action.type) {
  case 'INIT_BLOGS':
    return [ ...action.data ]
  case 'CREATE_BLOG':
    return [ ...state, action.data ]
  case 'UPDATE_BLOG':
    return state.map(blog => blog.id === action.data.id ? action.data : blog)
  case 'DELETE_BLOG':
    return state.filter(blog => blog.id === action.data.id ? null : blog)
  case 'CREATE_BLOG_COMMENT':
    console.log('state in reducer', state)
    updatedState = state.map(blog => {
      if(blog.id === action.data.blogId) {
        updatedBlog = { ...blog, comments : blog.comments.concat(action.data.comment) }
        console.log('updated blog', updatedBlog)
        return updatedBlog
      }
      return blog
    })
    console.log('createblog comments update bulltshit', updatedState[0].comments)
    return updatedState
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
    blog.author = user.name
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

export const upvoteBlog = (id) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs
    const blogToUpdate = getBlogById(id, blogs)
    blogToUpdate.likes += 1

    blogService.updateBlog(blogToUpdate.id, { likes: blogToUpdate.likes })

    dispatch({
      type: 'UPDATE_BLOG',
      data: blogToUpdate
    })
  }
}

export const createBlogComment = (blogId, comment) => {
  return async (dispatch) => {
    const newComment = await blogService.createBlogComment(blogId, comment)
    console.log('new comment is ', newComment)
    dispatch({
      type: 'CREATE_BLOG_COMMENT',
      data: {
        blogId,
        comment: newComment
      }
    })
  }
}

export default blogsReducer