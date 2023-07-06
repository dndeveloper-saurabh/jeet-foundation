import React, {useContext, useEffect, useState} from 'react';
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import SchoolIcon from "@material-ui/icons/School";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import Chart from "./Chart";
import ScholarshipGranted from '../assets/images/scholarship_granted.svg'
import {UserContext} from "../context/UserContext";
import {getClassName, humanizeTime} from "../helpers";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import {getLifeTimeEngagement} from "../database";
import {db} from "../config";

const defaultPic = 'https://lh3.googleusercontent.com/a/AGNmyxaNQYQ0bte8Vz4NkpY7FX_oalIkGPue0dfhwbi7=s96-c'

export default function ProfileScreen({handleBackButton}) {
  const [profileUser] = useContext(UserContext).profileUser;
  const [chartData, setChartData] = useState([]);
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    if(!profileUser?.uid) return () => {};
    getLifeTimeEngagement(profileUser.uid)
      .then(data => {
        setChartData(data);
      })

    db
      .collection('scholarships')
      .where('uid', '==', profileUser?.uid)
      .where('status', '==', 'approved')
      .get()
      .then(querySnapshot => {
        if(querySnapshot.docs.length > 0) {
          setGranted(true);
        } else {
          setGranted(false);
        }
      })
  }, [profileUser?.uid])

  return profileUser ? (
    <div className="flex flex-col h-full">
      <ArrowBackIos style={{fontSize: '20px'}} className="cursor-pointer text-white" onClick={handleBackButton} />
      <div className="font-medium dark:text-white justify-self-start px-2 text-center">
        <div className="w-32 h-32 overflow-hidden rounded-full mx-auto my-4">
          <img className="w-full h-auto" src={profileUser.image} alt="" />
        </div>
        <div>{profileUser.name}</div>
        <div className="text-sm text-gray-500 dark:text-gray-500">{getClassName(profileUser.grade)}</div>
      </div>
      <div className="hide-scrollbar flex-1">
        <div className="profile-card my-6 p-4">
          <div className="text-gray-500 text-sm font-medium">Contact Info</div>
          <div>
            <div className="flex items-center mt-3">
              <PhoneIcon className="text-black bg-green-400 rounded-2xl p-1" />
              <div className="text-sm font-medium dark:text-white justify-self-start px-2">
                <div>{profileUser.phone}</div>
                <div className="text-xs text-gray-500 dark:text-gray-500">Phone Number</div>
              </div>
            </div>
            <div className="flex items-center mt-3">
              <MailIcon className="text-white bg-blue-500 rounded-2xl p-1" />
              <div className="text-sm font-medium dark:text-white justify-self-start px-2">
                <div>{profileUser.email}</div>
                <div className="text-xs text-gray-500 dark:text-gray-500">Email</div>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-card my-6 p-4">
          <div className="text-gray-500 text-sm font-medium">Engagement</div>
          <div>
            <div className="flex items-center mt-3">
              <SchoolIcon className="text-black bg-lime-500 rounded-2xl p-1" />
              <div className="text-sm font-medium dark:text-white justify-self-start px-2">
                <div>{profileUser.watched_count}</div>
                <div className="text-xs text-gray-500 dark:text-gray-500">Lectures Watched</div>
              </div>
            </div>
            <div className="flex items-center mt-3">
              <QueryBuilderIcon className="text-white bg-red-500 rounded-2xl p-1" />
              <div className="text-sm font-medium dark:text-white justify-self-start px-2">
                <div>{humanizeTime(profileUser.time_spent)}</div>
                <div className="text-xs text-gray-500 dark:text-gray-500">Time Spent</div>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-card my-6 p-4">
          <div className="text-gray-500 text-sm font-medium">Lectures Watched</div>
          <div className="mt-5">
            <Chart chartData={chartData} />
          </div>
        </div>
        {granted && <div className="profile-card my-6 p-4">
          <div className="text-gray-500 text-sm font-medium">Scholarship</div>
          <img className="w-40 mx-auto" src={ScholarshipGranted} alt=""/>
          <div className="text-center text-blue-500 text-sm font-medium">Scholarship Already Granted</div>
        </div>}
      </div>
    </div>
  ) : null
}
