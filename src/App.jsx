import React, { Suspense, lazy, useContext } from "react";

import { Route, Routes } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Common/Loading";

import Navbar from "./components/Layouts/Navbar";
import WhatsAppButton from "./components/Home/WhatsAppButton";
import Subscription from "./components/subcription/Subscription";
// components
const Home = lazy(() => import("./components/Home/Home"));
const Login = lazy(() => import("./components/Login/Login"));
const Buy = lazy(() => import("./components/Buy/Buy"));
const Upgrade = lazy(() => import("./components/Upgrade/Upgrade"));
const About = lazy(() => import("./components/About/About"));
const Footer = lazy(() => import("./components/Layouts/Footer"));
const Blog = lazy(() => import("./components/Blog/Blog"));
const PropertyDetails = lazy(() =>
  import("./components/PeopertyDetail/PropertyDetail")
);
const SellProperty = lazy(() =>
  import("./components/SellProperty/SellProperty")
);
const BuyProperty = lazy(() => import("./components/BuyProperty/BuyProperty"));
const Signup = lazy(() => import("./components/Signup/Signup"));
const CopyRight = lazy(() => import("./components/Home/CopyRight"));
const SingleBlog = lazy(() => import("./components/Blog/SingleBlog"));
const Admin = lazy(() => import("./components/Admin/Admin"));
const Popup = lazy(() => import("./components/Home/Popup"));
const Data = lazy(() => import("./components/Data/Data"));
const ForgotPassword = lazy(() =>
  import("./components/Password/ForgotPassword")
);
const ResetPassword = lazy(() => import("./components/Password/ResetPassword"));
const SoldProperties = lazy(() =>
  import("./components/SoldProperties/SoldProperties")
);
const SchedualMeeting = lazy(() =>
  import("./components/SchedualMeeting/SchedualMeeting")
);
const Layout = lazy(() => import("./components/Layouts/Layout"));

export default function App() {
  const { showPopUp } = useContext(UserContext);

  return (
    <Suspense fallback={<Loader />}>
      <ToastContainer />
      {showPopUp && <Popup />}

      <Navbar />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blog/:blog_id" element={<SingleBlog />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/property-details/:slug" element={<PropertyDetails />} />
          <Route path="/buy-property" element={<BuyProperty />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/sell-property" element={<SellProperty />} />
          <Route path="/data" element={<Data />} />
          <Route path="data/:zipcodet/:categoryt" element={<Data />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/properties/sold" element={<SoldProperties />} />
          <Route path="/schedual/meeting" element={<SchedualMeeting />} />
        </Routes>
      </Layout>
      <Footer />
      <CopyRight />
      <WhatsAppButton />
    </Suspense>
  );
}
