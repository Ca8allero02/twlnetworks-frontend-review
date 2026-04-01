import api from './api';
export const getSocialLinks = (entityType = 'network', entityId = null) => {
  const params = { entity_type: entityType };
  if (entityId) params.entity_id = entityId;
  return api.get('/social', { params });
};