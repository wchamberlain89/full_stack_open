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

const addBlog = (data) => {
  const config = {
    headers: { Authorization: token }
  }
  
  const request = axios.post(baseUrl, data, config)
  return request.then(response => response.data)
}

export default { getAll, addBlog, setToken }