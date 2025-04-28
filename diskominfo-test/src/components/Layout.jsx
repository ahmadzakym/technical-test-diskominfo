import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Main content */}
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Layout;
