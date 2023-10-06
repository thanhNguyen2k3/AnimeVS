import axios from 'axios';

const instance = axios.create({
    baseURL: `${process.env.NEXT_URL}/api`,
});

export default instance;
