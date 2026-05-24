import api from './api';

export const applyDesempacados = (data) => api.post('/desempacados/apply', data);