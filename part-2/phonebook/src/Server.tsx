import axios from 'axios';

const baseUrl = '/api/persons';

async function Add(person: Person) {
  return axios.post(baseUrl, person).then(x => x.data);
}

async function Delete(id: string) {
  return axios.delete(baseUrl + '/' + id);
}

async function All() {
  return axios.get(baseUrl).then(x => x.data);
}

async function Replace(person: Person) {
  return axios.put(baseUrl + '/' + person.id, person);
}

const ex = { Add, Delete, All, Replace };
export default ex;