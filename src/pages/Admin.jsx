import React, {useContext, useEffect} from 'react';
import Login from "../components/Login";
import Layout from "../components/Layout";
import Dashboard from "../components/Dashboard";
import {UserContext} from "../context/UserContext";
import Loader from "../components/Loader";

export default function Admin() {
  const [user, setUser] = useContext(UserContext).user;
  const [allowLoggedInUser, setAllowLoggedInUser] = useContext(UserContext).allowedLoggedInUser;

  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = '/assets/logo192.png';
    document.title = 'Pustack Gives';
  }, []);

  return (
    <>
      {user === false && <Layout>
        <div className="bg-white dark:bg-zinc-900 w-screen h-screen flex justify-center items-center">
          <Loader style={{zoom: 3}} />
        </div>
      </Layout>}
      {(user === null || (user && !allowLoggedInUser)) &&
        <Layout>
          <Login />
        </Layout>}
      {(user && allowLoggedInUser) &&
        <Layout>
          <Dashboard />
        </Layout>}
    </>
  )
}
