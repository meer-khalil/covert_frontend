import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import setAuthToken from "../util/setAuthToken";
import api from "../util/api";
import { toast } from "react-toastify";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [showPopUp, setShowPopUp] = useState(false)

  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const login = async (_user) => {

    try {
      const { data } = await api.post("/user/login", {
        ..._user,
      });

      const jwt = data.token;
      const user = data.user;

      localStorage.setItem("realstate_token", jwt);
      localStorage.setItem("user", JSON.stringify(user));

      setAuthToken(jwt);
      navigate("/buy");
    } catch (error) {
      console.error(error);
      if (error?.response?.status === 401) {
        toast("User Doesn't Exist");
      } else {
        toast(error?.response?.data?.message);
      }
    }
  };

  const register = async (data) => {
    try {
      const response = await api.post(
        "/user/register",
        {
          ...data,
        }
      );

      setUser(response.data.user);
      let token = response.data.token;
      localStorage.setItem("realstate_token", token);
      toast(response.data.message)
      setAuthToken(token);
      navigate("/");

    } catch (error) {

      console.error(error);
      toast(error.response.data.message);

    }
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem("realstate_token");
    const userData = localStorage.getItem("user");

    if (token) {
      setAuthToken(token);

      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  };

  const logout = async () => {
    localStorage.removeItem("realstate_token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };


  const storeEmail = async () => {


    if (isValidEmail(email)) {

      try {
        const res = await api.post('/email', { email })
        console.log('Response: ', res);
        setShowPopUp(true)
        setEmail('');
        setError(null)
      } catch (error) {
        console.log('Error While Storing Email');
        alert('Error While storing the email')
        // toast("Error While Storing Email!")
      }
    } else {
      setError("Your Email is Not Valid")
    }

  }

  function isValidEmail(email) {
    // Regular expression pattern to validate email format
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated,
        email,
        setEmail,
        showPopUp,
        setShowPopUp,
        storeEmail,
        error,
        setError
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
