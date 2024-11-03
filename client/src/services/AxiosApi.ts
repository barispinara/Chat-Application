import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios'

const AxiosApi = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
});

AxiosApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const authValue: string | null = localStorage.getItem('auth');

    if (authValue) {
        const auth = JSON.parse(authValue);

        if (auth.token) {
            config.headers = { ...config.headers } as AxiosHeaders
            config.headers.set('Authorization', auth.token)
        }
    }
    return config;
})

export default AxiosApi