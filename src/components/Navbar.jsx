import React from 'react';
import whiteLogo from '../assets/images/auth/pustack_tutor_white_logo.png';
import {auth} from "../config";
import ExitToApp from "@material-ui/icons/ExitToApp";
import {useHistory} from "react-router-dom";

export default function Navbar() {
  const history = useHistory();

  return (
    <nav className="pustack-scholarship-nav flex items-center justify-between px-10 sm:px-10" style={{background: '#181818'}}>
      <img onClick={() => {
        history.push('/')
      }} className="h-16 mr-3 cursor-pointer" src={whiteLogo} alt="Pustack Scholarships"/>
      {auth.currentUser && <ExitToApp className="cursor-pointer" style={{color: 'white'}} onClick={() => {
        auth.signOut();
      }}/>}
    </nav>
  )
}
