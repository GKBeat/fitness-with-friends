import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const BASE_URL = process.env.BASE_URL ? process.env.BASE_URL : 'https://fit-in-time-server.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const setAuthHeader = (token) => {
  axios.defaults.headers.common['Authorization'] = token;
}

const login = async (path, data) => {
  console.log(BASE_URL + path);
  let response = await axios.post(BASE_URL + path, data);
  setAuthHeader(response.headers.authorization);
  if (response.data.status) {
    AsyncStorage.setItem('token', response.headers.authorization);
    AsyncStorage.setItem('userId', response.data.user._id);
  }
  return response.data;
}

const post = async (path, data) => {
  let response = await axios.post(BASE_URL + path, data);
  return response.data;
}

const get = async (path) => {
  let response = await axios.get(BASE_URL + path);
  return response.data;
}

const put = async (path, data) => {
  let response = await axios.put(BASE_URL + path, data);
  return response.data;
}

/*
const multiplePost = (...paths, ...datas) => {
  let requests = [];
  for (let i=0; i<paths.length; i++) {
    requests.push(axios.post(BASE_URL + paths[i], datas[i]));
  }
  if (requests) {
    return axios.all(requests).then(axios.spread(...responses => responses));
  } else {
    return undefined;
  }
}*/

export default module.exports = {
  login,
  post,
  get,
  put,
  setAuthHeader
}