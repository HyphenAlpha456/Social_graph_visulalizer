import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', 
});

export const fetchUsers = () => api.get('/users');
export const fetchPath = (start, end) => api.get(`/users/path/${start}/${end}`);
export const fetchRecommendations = (id) => api.get(`/users/recommendations/${id}`);
export const addFriend = (userId, friendId) => api.post('/users/add-friend', { userId, friendId });

export default api;