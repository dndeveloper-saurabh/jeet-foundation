import React, {useContext, useEffect} from 'react';
import Login from "../components/Login";
import Layout from "../components/Layout";
import Dashboard from "../components/Dashboard";
import {UserContext} from "../context/UserContext";

export default function Admin() {
  const [user, setUser] = useContext(UserContext).user;
  const [allowLoggedInUser, setAllowLoggedInUser] = useContext(UserContext).allowedLoggedInUser;

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
