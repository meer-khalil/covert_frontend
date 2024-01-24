import React, { useContext } from "react";

import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from './components/Login/Login'
import Buy from './components/Buy/Buy'
import Upgrade from './components/Upgrade/Upgrade'
import About from './components/About/About'
import Footer from "./components/Layouts/Footer";
import Blog from "./components/Blog/Blog";
import PropertyDetails from "./components/PeopertyDetail/PropertyDetail";
import SellProperty from "./components/SellProperty/SellProperty";
import BuyProperty from "./components/BuyProperty/BuyProperty";
import Signup from "./components/Signup/Signup";
import CopyRight from "./components/Home/CopyRight";

import BlogCategory from "./components/Blog/BlogCategory";
import SingleBlog from "./components/Blog/SingleBlog";
import Admin from "./components/Admin/Admin";
import { UserContext } from "./context/UserContext";
import Popup from "./components/Home/Popup";
import Data from "./components/Data/Data";
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

export default function App() {

  const { showPopUp, user } = useContext(UserContext)

  return (
    <>
      <ToastContainer />
      {
        showPopUp && <Popup />
      }
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/upgrade" element={<Upgrade />} />

        <Route path="/about" element={<About />} />

        <Route path="/blogs" element={<Blog />} />

        <Route path="/blog/:blog_id" element={<SingleBlog />} />

        <Route path="/blogs/category/:id" element={<BlogCategory />} />

        <Route path="/buy" element={<Buy />} />

        <Route path="/property-details/:slug" element={
          <PropertyDetails />
        } />

        <Route path="/buy-property" element={<BuyProperty />} />

        <Route path="/admin/*" element={<Admin />} />

        <Route path="/sell-property" element={<SellProperty />} />

        <Route path="/data" element={<Data />} />
        <Route path="data/:zipcodet/:categoryt" element={<Data />} />

      </Routes>
      <Footer />

      <CopyRight />

    </>
  );
}