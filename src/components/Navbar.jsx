import React from 'react';
import whiteLogo from '../assets/images/auth/pustack_tutor_white_logo.png';
import {auth} from "../config";
import ExitToApp from "@material-ui/icons/ExitToApp";

export default function Navbar() {

  return (
    <nav className="pustack-scholarship-nav flex items-center justify-between px-10 sm:px-10">
      <img className="h-16 mr-3" src={whiteLogo} alt="Pustack Scholarships"/>
      <ExitToApp style={{color: 'white'}} onClick={() => {
        auth.signOut();
      }} />
    </nav>
  )
}
