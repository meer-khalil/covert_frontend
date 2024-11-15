import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a token to request
axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // For example, add headers, modify the request data, etc.
    const token = localStorage.getItem("realstate_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // Log the request body if it exists
    if (config.data) {
      console.log("Request Body:", config.data);
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Logout when the token expires
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // check for authorization error
    if (error.response && error.response.status === 401) {
      // remove the token and user data
      localStorage.removeItem("realstate_token");
      localStorage.removeItem("user");
      if (
        ["buy", "data", "admin"].some((e) => window.location.href.includes(e))
      ) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
