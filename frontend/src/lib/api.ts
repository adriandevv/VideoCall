import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    if (['post', 'put', 'patch', 'delete'].includes(config.method ?? '')) {
        const match = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'));
        if (match) {
            config.headers['X-XSRF-TOKEN'] = match[2];
        }
    }
    return config;
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            // Prevent infinite loops if /refresh itself fails
            if (originalRequest.url === '/auth/refresh' || originalRequest.url === '/auth/login') {
                return Promise.reject(error);
            }

            originalRequest._retry = true;
            try {
                // Attempt to refresh token
                await api.post('/auth/refresh');

                // If successful, we retry the original request
                return api(originalRequest);
            } catch (err) {
                // If refresh fails, authStore component/checkAuth will handle logging out the user visually eventually
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
