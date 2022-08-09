import axios from 'axios';

const baseURL = 'http://95.85.127.250:3002';

const service = axios.create({ baseURL });
service.interceptors.request.use(
    res => {
        res.headers['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken')
        return res;
    },
    err => {
        return Promise.reject(err)
    }
);
service.interceptors.response.use(
    res => { return res },
    err => {
        const status = err.response ? err.response.status : null;
        const originalRequest = err.config;
        
        if (status === 403 && !originalRequest._retry) {
            originalRequest._retry = true
            axios.get('users/refresh',
                { headers: { Authorization: `Bearer ${localStorage.getItem('refreshToken')}` } })
                .then(res => {
                    console.log(res.data);
                    localStorage.setItem('accessToken', res.data)
                })
                .catch(err => {
                    console.log(err);
                })
            return service(originalRequest)
        }
        return Promise.reject(err)
    }
)
export default service