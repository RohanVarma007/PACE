import axios from 'axios';

const API = axios.create({
  baseURL: 'https://pace-n60f.onrender.com'
});

export default API;