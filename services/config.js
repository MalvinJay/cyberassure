import axios from 'axios';
import Cookies from 'js-cookie';

// For setting baseUrls and other global configs
const token = Cookies.get("token");

export const urls = {
    production: `https://api.dev.orgposture.com/`,
    development: `https://api.dev.orgposture.com/`
}

const api = axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        'Content-Type': 'application/json'
    }
});

if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`
}

export default api;
