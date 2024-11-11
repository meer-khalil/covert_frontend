import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./Home/Home";
import About from "./About/About";
import Upgrade from "./Upgrade/Upgrade";

const Pages = () => {
  return (
    <div className="">
      {
        <main className="mt-0 md:mt-0 flex-1">
          <div className="px-2 md:px-6 md:py-8">
            <Routes>
              <Route index path="home" element={<Home />} />
              <Route path="upgrade" element={<Upgrade />} />
              <Route path="about" element={<About />} />
            </Routes>
          </div>
        </main>
      }
    </div>
  );
};

export default Pages;
