import api from './api';

export const getVideos = () => {
  return api.get('/videos');
};

export const getVideo = (id) => {
  return api.get(`/videos/${id}`);
};

export const createVideo = (videoData) => {
  return api.post('/videos', videoData);
};

export const updateVideo = (id, videoData) => {
  return api.put(`/videos/${id}`, videoData);
};

export const deleteVideo = (id) => {
  return api.delete(`/videos/${id}`);
};

export const getVideoCategories = () => {
  return api.get('/videos/categories');
};