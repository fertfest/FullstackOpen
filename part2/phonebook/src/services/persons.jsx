import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(resp => resp.data)
}

const addOne = person => {
    return axios
        .post(`${baseUrl}`, person)
        .then(resp => resp.data)
}

const deletePerson = id => {
    return axios
        .delete(`${baseUrl}/${id}`)
        .then(resp => {
            return resp.data
        })
}

const changeNumber = person => {
    return axios
        .put(`${baseUrl}/${person.id}`, person)
        .then(resp => {
            return resp.data
        })
}

export default {
    getAll,
    addOne,
    deletePerson,
    changeNumber
}