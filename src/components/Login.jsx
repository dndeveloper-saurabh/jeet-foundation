import React, {useContext, useEffect, useState} from 'react';
import {submit} from "../services/auth";
import {UserContext} from "../context/UserContext";
import Drawer from "@material-ui/core/Drawer";
import ExitToApp from "@material-ui/icons/ExitToApp";
import {useMediaQuery} from "react-responsive";
import whiteLogo from "../assets/images/auth/pustack_tutor_white_logo.png";
import woman from "../assets/images/auth/woman.svg";
import {auth} from "../config";

export default function Login() {
  const [allowedLoggedInUser, setAllowLoggedInUser] = useContext(UserContext).allowedLoggedInUser;
  const [user, setUser] = useContext(UserContext).user;
  const isSmallScreen = useMediaQuery({ query: "(max-width: 500px)" });
  const [isiPad, setIsIpad] = useState(false);

  const setData = (user) => {
    // if(user === 'not-allowed') {
    //   return setAllowLoggedInUser(false);
    // }
    //
    // setUser(user);
  }

  useEffect(() => {
    setIsIpad(navigator.userAgent.match(/iPad/i) !== null);
  }, [])

  const handleSliderClose = () => {
    setUser(null);
    setAllowLoggedInUser(true);
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center w-screen" style={{background: '#181818'}}>
      {/*<button>Sign in with Google</button>*/}
      {/*<div>*/}
      {/*  OR*/}
      {/*</div>*/}
      <button
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick={() => {
          submit({setData})
        }}
      >
        Sign in with Google
      </button>
      <Drawer
        variant="temporary"
        className="onboarding__slider"
        open={user && !allowedLoggedInUser}
        // open={true}
        anchor={isSmallScreen ? (isiPad ? "right" : "bottom") : "right"}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        onClose={handleSliderClose}
        ModalProps={{ keepMounted: true }}
        BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.75)" } }}
      >
        <div className="final-tab">
          <h1>
            <span>Welcome!</span>
            <ExitToApp onClick={() => {
              auth.signOut();
              // forceUpdate();
              // setOtpCode(Array(6).fill(""));
              // setOtpError(false);
              // setOtpErrorMsg("");
              // setSocialProcessStarted([false, false, false]);
              // setPhoneNumber(countryCode);
              // setTempEmailUserData(null);
              // setExistingPhone("");
              // setPhoneExists(false);
              // setSkillSubjects([]);
              // setSkillCategory("");
              // setCategorySubjectCount(null);
              // setGradeSubjectCount(null);
              //
              // setActiveTab(0);

            }} />
          </h1>
          <p>Looks like your account is not verified yet.</p>
          <div className="image">
            <img src={woman} alt=""/>
          </div>
          <div className="image-placeholder">
            <div className="text-white flex flex-col items-center mt-5 w-full">
              <p className="text-white text-opacity-80">You are signed in with:</p>
              <p className="text-base font-semibold text-xl">{user?.email}</p>
              <p className="text-center font-medium text-white mt-4 text-opacity-80">Make sure that this account has all the required permissions!</p>
            </div>
            <svg width="428" height="83" viewBox="0 0 428 83" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M427.5 19C260 -25.5 93.6667 21.8333 0 46.5V83C106 51.4 281.5 34.5 427.5 83V19Z" fill="#7C0709"/>
            </svg>
          </div>
          <div className="bottom-part">

            <div className="bottom">
              <img src={whiteLogo} alt=""/>
              <div className="bottom-group">
                  <span onClick={() => {
                    // setDocumentToShow(termsOfService);
                    // setShowPDF(true);
                  }}>Terms of Service</span>
                <div className="separator" />
                <span onClick={() => {
                  // setDocumentToShow(privacyPolicy);
                  // setShowPDF(true);
                }}>Privacy Policy</span>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  )
}
