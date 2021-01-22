import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'



const extract = (response) => response.data

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const create = newObject => {
  return axios.post(baseUrl, newObject).then(extract)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(extract)
}

export default { 
  getAll, 
  create, 
  update 
}