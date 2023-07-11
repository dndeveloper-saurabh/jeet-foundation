import React from 'react';
import Navbar from "./Navbar";

export default function Layout({children}) {

  return (
    <div className="w-screen h-screen bg-white dark:bg-zinc-900 flex flex-col overflow-hidden font-sans">
      <Navbar />
      {children}
    </div>
  )
}
