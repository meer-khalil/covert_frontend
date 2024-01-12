import React from "react";
import Aside from "./Aside";
import { Route, Routes } from "react-router-dom";

import Home from "./Home/Home";
import About from "./About/About";
import Upgrade from "./Upgrade/Upgrade";

const Pages = () => {
  return (
    <div className="max-w-[1440px] mx-auto">
      {
        <div className="flex flex-col md:flex-row">
          <div>
            <Aside />
          </div>

          <main className="mt-40 md:mt-0 flex-1">
            <div className="px-2 md:px-6 py-8">
              <Routes>
                <Route index path="home" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path='upgrade' element={<Upgrade />} />
                {/* <Route path='posts' element={<Posts />} /> */}
              </Routes>
            </div>
          </main>
        </div>
      }
    </div>
  );
};

export default Pages;
