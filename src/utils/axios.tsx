import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://10.10.118.153:10010/',
});

export default instance;
