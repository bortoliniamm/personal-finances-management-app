import axios from 'axios';

//Define a URL base da origem para consumo do servico
export default axios.create({
  baseURL: 'http://localhost:3001/api/transactions',
  headers: {
    'Content-type': 'application/json',
  },
});