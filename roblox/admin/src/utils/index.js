import axios from 'axios';

const request = axios.create({
    baseURL: 'https://gate.naptheroblox.vn/api',
    withCredentials: true,
});

export default request;
