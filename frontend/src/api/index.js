import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:8000/api',
})

api.interceptors.request.use((config) => {

    const bearToken = localStorage.getItem('token') || ''

    config.headers = {
        ...config.headers,
        Authorization: `Bearer ${bearToken}`,
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Accept-Language': 'fr',
    }
    return config
});

export default api