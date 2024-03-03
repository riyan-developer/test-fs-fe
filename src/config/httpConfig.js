import axios from 'axios';

const SERVER_URL = 'http://localhost:5000/api';

const axiosInstance = axios.create({
    baseURL: SERVER_URL
});

export default axiosInstance;