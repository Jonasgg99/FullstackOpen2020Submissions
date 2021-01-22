import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const uploadNew = person => {
    return axios.post(baseUrl,person).then(response => response.data)
    }

const getAll = () => {
    return axios
    .get(baseUrl)
    .then(response => response.data)
}

const deleter = id => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

const updateNumber = (newPerson, persons) => {
    const personToUpdate = persons.find(n=>n.name.toLowerCase() === newPerson.name.toLowerCase())
    const updatedPerson = { ...personToUpdate, number:newPerson.number}
    return axios.put(`${baseUrl}/${updatedPerson.id}`,updatedPerson).then(response=>response.data)
}

  export default {
      uploadNew, getAll, deleter, updateNumber
  }