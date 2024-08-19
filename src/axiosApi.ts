import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: 'https://threads-e7733-default-rtdb.europe-west1.firebasedatabase.app/',
});
