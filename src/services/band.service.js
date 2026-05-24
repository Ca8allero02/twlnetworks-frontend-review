import api from './api';

export const getBandInfo = () => api.get('/band/kanat');
export const getLabelInfo = () => api.get('/band/label');