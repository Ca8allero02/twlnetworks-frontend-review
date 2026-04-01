import api from './api';
export const getStreamingStatus = () => api.get('/streaming/status');