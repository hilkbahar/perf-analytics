import axios from 'axios';

const options = {
  baseURL: 'http://localhost:3002',
  headers: {
    'Content-Type': 'application/json'
  }
};

const $axios = axios.create(options);

export default $axios;
