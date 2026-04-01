import api from './api';

export const getChampions = () => api.get('/chickboxing/champions');
export const getChampionById = (id) => api.get(`/chickboxing/champions/${id}`);
