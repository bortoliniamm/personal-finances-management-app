import http from './http-common';

const getAll = async () => {
  // let rawData = await http.get('/all');
  // let transactions = rawData.data;
  // return transactions;
  return http.get(`/all`);
}

const getByPeriod = async (period) => {

  return http.get(`/period=${period}`);
};

const getByDay = (day) => {

  return http.get(`/day=${day}`);
};

const getExpenses = () => {
  return http.get('/expenses');
};

const create = (data) => {
  return http.post('/register', data);
};

const update = (id, data) => {
  return http.put(`/update/id=${id}`, data);
};

const remove = (id) => {
  return http.delete(`/delete/id=${id}`);
};

const removeAll = () => {
  return http.delete(`/delete/all`);
};



export default {
  getAll,
  getByPeriod,
  getByDay,
  create,
  update,
  remove,
  removeAll,
  getExpenses,
};
