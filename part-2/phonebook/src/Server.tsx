import axios from 'axios';

async function Add(person: Person) {
  return axios.post('http://localhost:3001/persons', person);
}

async function Delete(id: number) {
  return axios.delete('http://localhost:3001/persons/' + id);
}

async function All() {
  return axios.get('http://localhost:3001/persons').then(x => x.data);
}

async function Replace(person: Person) {
  return axios.put('http://localhost:3001/persons/' + person.id, person);
}

const ex = { Add, Delete, All, Replace };
export default ex;