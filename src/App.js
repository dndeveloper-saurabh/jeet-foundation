import './App.css';
import {useContext, useEffect, useState} from "react";
import {
  Route,
  Switch,
  Redirect,
  useHistory
} from "react-router-dom";
import "./index.css";
import Login from "./components/Login";
import {UserContext} from "./context/UserContext";
import {auth, db} from "./config";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import LandingPage from "./components/LandingPage";


function App() {
  const [user, setUser] = useContext(UserContext).user;
  const [allowLoggedInUser, setAllowLoggedInUser] = useContext(UserContext).allowedLoggedInUser;
  const history = useHistory();
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setFetching(false);
      if(user) {
        const userDoc = await db.collection('users')
          .doc(user.uid).get();
        setUser(userDoc.data());
        console.log('userDoc.data() - ', userDoc.data());
        if(userDoc.data().is_instructor) {
          history.push('/admin/dashboard')
          return setAllowLoggedInUser(true);
        }
        setAllowLoggedInUser(false);
      } else {
        setUser(null);
        setAllowLoggedInUser(false);
      }
    })
  }, [history])

  return fetching ? <></> : (
    <>
      {(!user || (user && !allowLoggedInUser)) && <Switch>
        <Route exact path={"/"}>
          <LandingPage />
        </Route>
        <Route exact path={"/admin/login"}>
          <Login />
        </Route>
        <Redirect to="/" />
      </Switch>}
      {(user || (user && allowLoggedInUser)) && <Switch>
        <Route exact path={"/admin/dashboard"}>
          <Layout>
            <Dashboard />
          </Layout>
        </Route>
      </Switch>}
    </>
  );
}

export default App;
