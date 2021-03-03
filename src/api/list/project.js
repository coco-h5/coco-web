import instance from '../request';

export default {
  async createProject(params) {
    const result = await instance.post('/project/createProject', params);
    return result.data;
  },
  async query(params) {
    const result = await instance.get(`/project/query`, {
      params,
    });
    return result.data;
  },
  async save(params) {
    const result = await instance.post('/project/updateConfig', params);
    return result.data;
  },
  async release(params) {
    const result = await instance.post('/project/release', params);
    return result.data;
  },
  async preview(params) {
    const result = await instance.post('/project/preview', params);
    return result.data;
  },
}
