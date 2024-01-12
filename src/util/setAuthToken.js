import api from './api'

const setAuthToken = (token) => {

  // console.log("Here is the token: ", token);

  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};


export default setAuthToken