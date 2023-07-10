import React, {useState} from 'react';
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import ExitToApp from "@material-ui/icons/ExitToApp";
import {ArrowForwardIos, ArrowRight, Edit} from "@material-ui/icons";
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import AppPhoneInput from "../PhoneInput";
import DarkLogo from '../../assets/images/pustack-dark-logo.png';
import WhiteLogo from '../../assets/images/pustack-white-logo.png';

const defaultPic = 'https://lh3.googleusercontent.com/a/AGNmyxaNQYQ0bte8Vz4NkpY7FX_oalIkGPue0dfhwbi7=s96-c'

export default function PhoneNumberChangeScreen({handleBack}) {

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center px-3 py-1">
        <div className="flex items-center">
          <ArrowBackIos style={{cursor: 'pointer'}} onClick={handleBack} />
          <p className="font-medium text-lg">Phone Number</p>
        </div>
        <p className="text-sm font-medium text-cyan-500">Update</p>
      </div>
      <div className="px-4">
        <AppPhoneInput className="flex-1 border-none text-sm text-gray-700 font-normal" value="Saurabh Singh" type="text"/>
      </div>
    </div>
  )
}
