import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <div className=" pt-[30px] md:pt-[60px]">
        {children}
      </div>
    </>
  );
};

export default Layout;