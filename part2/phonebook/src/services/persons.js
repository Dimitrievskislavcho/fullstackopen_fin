import axios from "axios";

const baseUrl = "/api/persons";

const getPersons = () => {
  return axios.get(baseUrl);
};
const createPerson = (person) => {
  return axios.post(baseUrl, person);
};
const deletePerson = (personId) => {
  return axios.delete(`${baseUrl}/${personId}`);
};
const updatePerson = (personId, newPersonData) => {
  return axios.put(`${baseUrl}/${personId}`, newPersonData);
};

export default {
  getPersons,
  createPerson,
  deletePerson,
  updatePerson,
};
