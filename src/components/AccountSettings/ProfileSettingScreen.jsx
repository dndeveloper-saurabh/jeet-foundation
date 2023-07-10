import React, {useContext, useEffect, useRef, useState} from 'react';
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import ExitToApp from "@material-ui/icons/ExitToApp";
import {ArrowForwardIos, ArrowRight, Edit} from "@material-ui/icons";
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import AppPhoneInput from "../PhoneInput";
import DarkLogo from '../../assets/images/pustack-dark-logo.png';
import WhiteLogo from '../../assets/images/pustack-white-logo.png';
import Resizer from "react-image-file-resizer";
import {UserContext} from "../../context/UserContext";
import {ThemeContext} from "../../context/ThemeContext";
import {auth, db} from "../../config";
import Loader from "../Loader";
import {wait} from "../../helpers";
import {updateProfileImage} from "../../database";

const defaultPic = 'https://lh3.googleusercontent.com/a/AGNmyxaNQYQ0bte8Vz4NkpY7FX_oalIkGPue0dfhwbi7=s96-c'

export default function ProfileSettingScreen({handleBack, goToPhoneScreen}) {
  const [themeRange, setThemeRange] = useState(1);
  const [user, setUser] = useContext(UserContext).user;
  const [isDark, setIsDark] = useContext(ThemeContext).isDark;
  const [name, setName] = useState(() => user?.name ?? '');
  const [nameFocused, setNameFocused] = useState(false);
  const nameFocusedRef = useRef(false);
  const [updatingName, setUpdatingName] = useState(false);
  const [profileImage, setProfileImage] = useState(() => user?.profile_url);

  useEffect(() => {
    if(!nameFocusedRef.current) {
      setName(user?.name);
    }
  }, [user?.name]);

  useEffect(() => {
    if(themeRange < 1) {
      setIsDark(false);
    } else {
      setIsDark(true);
    }
  }, [themeRange])

  const resizeProfilePic = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        400,
        400,
        "JPEG",
        70,
        0,
        (uri) => resolve(uri),
        "file"
      );
    });

  const profileImageSelectionHandler = async (e) => {
    const { files } = e.target;

    const profilePic = await resizeProfilePic(files[0]);

    let _image = {
      url: URL.createObjectURL(profilePic),
      ext: files[0].name.split(".").slice(-1)[0],
    };

    setProfileImage(_image.url);
    const [url, isUpdated] = await updateProfileImage(_image, user?.uid);

    if (isUpdated && url) {
      const updatedUser = { ...user, profile_url: url };

      setUser(updatedUser);
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: updatedUser?.uid,
          grade: updatedUser?.grade,
          name: updatedUser?.name,
          profile_url: updatedUser?.profile_url,
        })
      );

      // setMessage("Your image has been updated");
      // setOpenSnack(true);
      // setTimeout(() => setOpenSnack(false), 2500);
    } else {
      setProfileImage({ url: user?.profile_url });
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex justify-between px-3 py-1">
        <div className="flex items-center">
          <ArrowBackIos style={{cursor: 'pointer'}} className="text-zinc-900 dark:text-white" onClick={() => {
            handleBack();
            setName(user?.name);
          }} />
          <p className="text-zinc-900 dark:text-white font-medium text-lg">Profile</p>
        </div>
        <ExitToApp onClick={() => {
          auth.signOut();
        }} className="bg-gray-200 dark:bg-gray-700 text-zinc-900 dark:text-white p-1 rounded-full cursor-pointer" />
      </div>
      <div className="flex flex-col items-center my-5">
        <div className="w-24 h-24 rounded-xl flex items-center justify-center border-l-white dark:border-l-gray-600s border-4 shadow-[0_0px_10px_rgba(0,0,0,0.3)] border-none overflow-hidden">
          <img className="object-cover" src={profileImage} alt=""/>
        </div>
        <div className="relative mt-4 !cursor-pointer">
          <input className="absolute w-full h-full z-20 !cursor-pointer opacity-0" type="file" accept="image/png, image/jpg, image/jpeg" onChange={profileImageSelectionHandler}/>
          <p className="relative z-10 text-cyan-500 text-xs font-medium pointer-events-none">Change Profile Photo</p>
        </div>
      </div>
      <hr className="mt-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-zinc-700 opacity-100 dark:opacity-50"/>
      <div>
        <div className="flex items-center w-full">
          <p className="w-24 text-xs font-normal text-zinc-900 dark:text-white text-opacity-50 px-4">Name</p>
          <div className="flex items-center justify-between h-full flex-1 border-b border-neutral-100 dark:border-zinc-700 py-2 pr-3">
            <input className="flex-1 border-none text-sm text-gray-700 dark:text-white bg-transparent font-normal" onBlur={e => nameFocusedRef.current =false} onFocus={e => nameFocusedRef.current = true} value={name} onChange={e => setName(e.target.value.trim())} type="text"/>
            {name === user?.name ?
            <Edit style={{fontSize: '17px'}} className="bg-cyan-500 text-white p-1 rounded-full" /> :
              updatingName ? <Loader className="flex-grow-0 mr-2" /> : <p onClick={async () => {
              setUpdatingName(true);
              await wait(800);
              await db.collection('users').doc(user?.uid)
                .set({
                  name
                }, {merge: true})
              setUpdatingName(false);
            }} className="text-xs font-medium text-cyan-500 cursor-pointer">Update</p>}
          </div>
        </div>
        <div className="flex items-center w-full">
          <p className="w-24 text-xs font-normal text-zinc-900 dark:text-white text-opacity-50 px-4">Email</p>
          <div className="cursor-default flex items-center justify-between h-full flex-1 border-b border-neutral-100 dark:border-zinc-700 py-2 pr-3">
            <input className="flex-1 border-none text-sm text-gray-700 bg-transparent dark:text-white font-normal pointer-events-none" disabled value="saurs2000@gmail.com" type="text"/>
          </div>
        </div>
        <div className="flex items-center w-full">
          <p className="w-24 text-xs font-normal text-zinc-900 dark:text-white text-opacity-50 px-4">Phone</p>
          <div className="cursor-default flex items-center justify-between h-full flex-1 border-b border-neutral-100 dark:border-zinc-700 py-2 pr-3">
            <AppPhoneInput disabled className="pointer-events-none flex-1 border-none text-sm text-gray-700 font-normal disabled" value="Saurabh Singh" type="text"/>
            {/*<ArrowForwardIos style={{fontSize: '13px'}} />*/}
          </div>
        </div>
        <div className="flex items-center w-full my-3">
          <p className="w-24 text-xs font-normal text-zinc-900 dark:text-white text-opacity-50 px-4">Theme</p>
          <div className="flex flex-col justify-between h-full flex-1 border-b border-neutral-100 dark:border-zinc-700 py-4 pr-3">
            <input id="minmax-range" type="range" min="0" max="1" value={themeRange} onChange={e => setThemeRange(e.target.value)} className="w-full h-0.5 bg-gray-100 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
            <div className="flex justify-between mt-2">
              <WbSunnyIcon style={{fontSize: '12px'}} className="text-zinc-900 dark:text-gray-400" />
              <Brightness4Icon style={{fontSize: '12px'}} className="text-zinc-900 dark:text-gray-400" />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center mt-16">
          <img src={isDark ? WhiteLogo : DarkLogo} className="w-28" alt=""/>
          <p className="text-xs font-normal text-zinc-900 dark:text-white text-opacity-30">Powered by Pustack Education 1.0.0</p>
        </div>
        <hr className="mt-2 h-0.5 border-t-0 bg-neutral-100 dark:bg-zinc-700 opacity-100 dark:opacity-50"/>
        <div className="flex justify-center items-center my-3">
          <p className="text-xs font-normal text-zinc-900 dark:text-white text-opacity-60">Terms of service</p>
          <div className="w-1 h-1 bg-gray-500 rounded-full mx-2" />
          <p className="text-xs font-normal text-zinc-900 dark:text-white text-opacity-60">Privacy Policy</p>
          <div className="w-1 h-1 bg-gray-500 rounded-full mx-2" />
          <p className="text-xs font-normal text-zinc-900 dark:text-white text-opacity-60">Delete Account</p>
        </div>
      </div>
    </div>
  )
}
