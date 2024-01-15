import React, { useContext, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import PropertyForm from "./Property/PropertyForm";
import Aside from "./Aside";
import Pages from "./Pages/Pages";
import Blogs from "./Blog/Blogs";
import AddBlog from "./Blog/AddBlog";
import Category from "./Blog/Category";
import Emails from "./Emails";
import Layout from "../Layouts/Layout";
import BlogNewPostForm from "./Blog/BlogNewPostForm";
import { UserContext } from "../../context/UserContext";

const Admin = () => {

  const { user } = useContext(UserContext);

  return (
    <Layout>
      <div className=" max-w-[1440px] mx-auto">
        {user && (
          user?.role === "admin" ? (
            <div className="flex flex-col md:flex-row">
              <div className="pt-4">
                <Aside />
              </div>

              <main className="mt-40 md:mt-0 flex-1">
                <div className="px-2 md:px-6 py-8 flex justify-center">
                  <Routes>

                    <Route index path="pages/*" element={<Pages />} />

                    {/* <Route path="property" element={<PropertyForm />} /> */}

                    <Route path="property/edit/:id" element={<PropertyForm />} />

                    {/* <Route path="blog/new" element={<AddBlog />} /> */}
                    <Route path="blog/new" element={<BlogNewPostForm />} />

                    <Route path="blog/edit/:id" element={<BlogNewPostForm />} />

                    <Route path="blogs" element={<Blogs />} />
                    <Route path="category" element={<Category />} />
                    <Route path="emails" element={<Emails />} />

                  </Routes>
                </div>
              </main>
            </div>
          ) : (
            <Navigate to={'/'} />
          )
        )}
      </div>
    </Layout>
  );
};

export default Admin;
