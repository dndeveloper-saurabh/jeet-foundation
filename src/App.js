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
import "./assets/external.css";
import Admin from "./pages/Admin";

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
          // history.push('/admin/dashboard')
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
      <Switch>
        <Route exact path={"/"}>
          <LandingPage />
        </Route>
        <Route exact path={"/admin"}>
          <Admin />
        </Route>
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
