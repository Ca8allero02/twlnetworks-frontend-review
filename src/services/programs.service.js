import api from './api';

export const getPrograms = () => api.get('/programs');
export const getProgramById = (id) => api.get(`/programs/${id}`);
export const getProgramContent = (id) => api.get(`/programs/${id}/content`);