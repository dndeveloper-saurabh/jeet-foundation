import React, {useContext, useState} from 'react';
import whiteLogo from '../assets/images/auth/pustack_tutor_white_logo.png';
import colorLogo from '../assets/images/auth/pustack_tutor_color_logo.png';
import {auth} from "../config";
import ExitToApp from "@material-ui/icons/ExitToApp";
import SettingsIcon from '@material-ui/icons/Settings';
import Menu from '@material-ui/core/Menu';
import {useHistory} from "react-router-dom";
import {ThemeContext} from "../context/ThemeContext";
import {UserContext} from "../context/UserContext";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import ProfileSettingScreen from "./AccountSettings/ProfileSettingScreen";
import PhoneNumberChangeScreen from "./AccountSettings/PhoneNumberChangeScreen";

export default function Navbar() {
  const history = useHistory();
  const [isDark] = useContext(ThemeContext).isDark;
  const [user] = useContext(UserContext).user;
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const handleClose = () => {
    setAnchorEl(null);
    setActiveTab(0);
  }

  const handleBack = () => {
    if(activeTab >= 1) setActiveTab(c => c - 1);
    else setAnchorEl(null)
  }

  const goToPhoneScreen = () => {
    setActiveTab(1);
  }

  return (
    <nav className="pustack-scholarship-nav flex items-center justify-between px-10 sm:px-10 bg-white dark:bg-zinc-900">
      <img onClick={() => {
        history.push('/')
      }} className="h-16 mr-3 cursor-pointer" src={isDark ? whiteLogo : colorLogo} alt="Pustack Scholarships"/>
      {auth.currentUser && user && <img onClick={e => setAnchorEl(e.currentTarget)} className="w-9 h-9 shadow object-cover rounded-full overflow-hidden border border-gray-400 cursor-pointer" src={user?.profile_url}  alt={"user"}/>}
      <Menu
        id={isDark ? "dark-menu" : "light-menu"}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{ top: "40px" }}
        className="dndeveloper"
        PaperProps={{
          className: 'w-[22rem] ' + (isDark ? '!bg-zinc-900' : '!bg-white')
        }}
      >
        <SwipeableViews
          axis="x"
          index={activeTab}
          onChangeIndex={(e) => setActiveTab(e)}
          scrolling={"false"}
          containerStyle={{
            transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s'
          }}
          ignoreNativeScroll={true}
          disabled={true}
          style={{height: '100%'}}
          className="review-screen"
        >
          <ProfileSettingScreen handleBack={handleBack} goToPhoneScreen={goToPhoneScreen} />
          <PhoneNumberChangeScreen handleBack={handleBack} />
        </SwipeableViews>
      </Menu>
    </nav>
  )
}
