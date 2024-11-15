import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PropertyForm from "./Property/PropertyForm";
import Aside from "./Aside";
import Pages from "./Pages/Pages";
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
        {user &&
          (user?.role === "admin" ? (
            <div className="flex flex-col md:flex-row">
              <div className="pt-4">
                <Aside />
              </div>

              <main className="mt-0 md:mt-0 flex-1">
                <div className="px-2 md:px-6 py-8">
                  <Routes>
                    <Route index path="pages/*" element={<Pages />} />
                    <Route
                      path="property/edit/:slug"
                      element={<PropertyForm />}
                    />
                    <Route path="blog/new" element={<BlogNewPostForm />} />
                    <Route path="blog/edit/:id" element={<BlogNewPostForm />} />
                    <Route path="category" element={<Category />} />
                    <Route path="emails" element={<Emails />} />
                  </Routes>
                </div>
              </main>
            </div>
          ) : (
            <Navigate to={"/"} />
          ))}
      </div>
    </Layout>
  );
};

export default Admin;
