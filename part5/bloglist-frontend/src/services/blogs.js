import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const blogs = axios.get(baseUrl)
  return blogs.then(response => response.data)
}

const addBlog = async (data) => {
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.post(baseUrl, data, config)
  return request.then(response => response.data)
}

const updateBlog = async (id, data) => {
  try {
    console.log("trying to updateBlog")
    const response = axios.put(`${baseUrl}/${id}`, data)
    return response
  } catch(exception) {
    console.log(exception)
  }
}

const removeBlog = async (id) => {
  try {
    console.log(`Attempting to delete blog with blog id ${id}`)
    const response = axios.delete(`${baseUrl}/${id}`, { headers : { Authorization: token } })
    return response
  } catch (exception) {
    console.log(exception)
  }
}

export default { getAll, addBlog, setToken, updateBlog, removeBlog }