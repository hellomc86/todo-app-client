import Request from './request';
import ENV from '../constants/ENV';

const IS_LOCAL = false;

const request = new Request(IS_LOCAL ? ENV.API_BASE_URL: ENV.API_BASE_URL_DEPLOY);

const getTodo = async (id = '') => await request.get(`/${id}`);

const addTodo = async (data) => await request.post('/', data );

const updateTodo = async (id, data) => await request.put(`/${id}`, data);

const deleteTodo = async (id) => await request.delete(`/${id}`);

export default {
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};
