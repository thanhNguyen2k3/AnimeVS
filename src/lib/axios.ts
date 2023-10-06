import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://anime-vs.vercel.app/api' : 'http://localhost:3000/api'
});

export default instance;
