import axios from 'axios'
const baseurl = '/api/users'

const getUsers = async () => {
  const response = await axios.get(baseurl)
  console.log('response is ', response)
  return response.data
}

export default {
  getUsers
}