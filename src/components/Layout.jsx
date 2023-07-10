import React from 'react';
import Navbar from "./Navbar";

export default function Layout({children}) {

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <Navbar />
      {children}
    </div>
  )
}
