import axios from 'axios';
import config from './config';
import {message} from "ant-design-vue";

const instance =  axios.create({
  baseURL: config[process.env.NODE_ENV],
  timeout: 100000,
  withCredentials: true,
});

instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  message.error(error.response?.data?.result || '系统异常，请稍后再试');
  return Promise.reject(error);
});

export default instance;

