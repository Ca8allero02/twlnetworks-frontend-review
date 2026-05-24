import api from './api';

// Campeones
export const createChampion = (data) => api.post('/admin/champions', data);
export const updateChampion = (id, data) => api.put(`/admin/champions/${id}`, data);
export const updateStats = (id, data) => api.put(`/admin/champions/${id}/stats`, data);
export const deleteChampion = (id) => api.delete(`/admin/champions/${id}`);

// Patrocinadores
export const createSponsor = (data) => api.post('/admin/sponsors', data);
export const updateSponsor = (id, data) => api.put(`/admin/sponsors/${id}`, data);
export const deleteSponsor = (id) => api.delete(`/admin/sponsors/${id}`);

// Redes sociales
export const createSocialLink = (data) => api.post('/admin/social', data);
export const updateSocialLink = (id, data) => api.put(`/admin/social/${id}`, data);
export const deleteSocialLink = (id) => api.delete(`/admin/social/${id}`);

// Contenido de programas
export const createContent = (data) => api.post('/admin/content', data);
export const updateContent = (id, data) => api.put(`/admin/content/${id}`, data);
export const deleteContent = (id) => api.delete(`/admin/content/${id}`);

// Postulaciones
export const getApplications = (programId) => 
    api.get('/admin/applications', { params: programId ? { program_id: programId } : {} });

// Banda
export const updateBandMember = (id, data) => api.put(`/admin/band/members/${id}`, data);