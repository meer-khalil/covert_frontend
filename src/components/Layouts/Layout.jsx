import React, { PropsWithChildren } from "react";

import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className=" pt-[30px] md:pt-[60px]">
        {children}
      </div>
    </>
  );
};

export default Layout;