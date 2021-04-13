import instance from '../request';

export default {
  async query(params) {
    const result = await instance.get(`/component/query`, {
      params,
    });
    return result.data;
  }
}
