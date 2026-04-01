import api from './api';

export const getChampions = () => api.get('/chickboxing/champions');
export const getChampion = (id) => api.get(`/chickboxing/champions/${id}`);
export const applyChicken = (data) => api.post('/chickboxing/apply', data);