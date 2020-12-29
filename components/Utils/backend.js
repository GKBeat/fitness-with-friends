import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL ? 'https://fit-in-time-server.herokuapp.com/' : 'https://fit-in-time-server.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'application/json';


const login = async function (path, data) {
  let response = await axios.post(BASE_URL + path, data);
  axios.defaults.headers.common['Authorization'] = response.headers.authorization;
  return response.data;
}

export default module.exports = {
  login
}