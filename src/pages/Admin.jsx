import React, {useContext, useEffect} from 'react';
import Login from "../components/Login";
import Layout from "../components/Layout";
import Dashboard from "../components/Dashboard";
import {UserContext} from "../context/UserContext";

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
      {(!user || (user && !allowLoggedInUser)) &&
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
