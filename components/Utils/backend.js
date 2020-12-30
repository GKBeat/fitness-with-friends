import axios from 'axios';

const BASE_URL = process.env.BASE_URL ? process.env.BASE_URL : 'https://fit-in-time-server.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'application/json';


const login = async (path, data) => {
  let response = await axios.post(BASE_URL + path, data);
  axios.defaults.headers.common['Authorization'] = response.headers.authorization;
  return response.data;
}

const post = async (path, data) => {
  let response = axios.post(BASE_URL + path, data);
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
  put
}