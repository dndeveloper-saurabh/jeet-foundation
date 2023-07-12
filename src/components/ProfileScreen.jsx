import React, {useContext, useEffect, useState} from 'react';
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import SchoolIcon from "@material-ui/icons/School";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import Chart from "./Chart";
import ScholarshipGranted from '../assets/images/scholarship_granted.svg'
import {UserContext} from "../context/UserContext";
import {getClassName, humanizeTime, wait} from "../helpers";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import {getLifeTimeEngagement, grantApplication} from "../database";
import {db} from "../config";
import {ArrowForwardIos} from "@material-ui/icons";
import Lottie from "lottie-react-web";
import tickLottie from "../assets/lottie/tick-animated.json";
import Loader from "./Loader";

const defaultPic = 'https://lh3.googleusercontent.com/a/AGNmyxaNQYQ0bte8Vz4NkpY7FX_oalIkGPue0dfhwbi7=s96-c'

function ScholarshipCard({profileUser}) {
  const [granted, setGranted] = useState(null);
  const [inReview, setInReview] = useState(null);
  const [notApplied, setNotApplied] = useState(false);
  const [, setFormUser] = useContext(UserContext).formUser;
  const [, setMainActiveTab] = useContext(UserContext).activeTab;
  const [granting, setGranting] = useState(false);
  const [showTick, setShowTick] = useState(false);

  useEffect(() => {
    if(!profileUser?.uid) return () => {}
    db
      .collection('scholarships')
      .where('uid', '==', profileUser?.uid)
      .where('status', 'in', ['under_review', 'approved'])
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(snapshot => {
          const data = snapshot.data();
          if(data.status === 'approved') setGranted(data);
          if(data.status === 'under_review') setInReview(data);
        })
      })

    db
      .collection('scholarships')
      .where('uid', '==', profileUser?.uid)
      .get()
      .then(querySnapshot => {
        if(querySnapshot.docs.length === 0) setNotApplied(true);
      })

  }, [profileUser?.uid]);

  const handleGrantApplication = async () => {
    setGranting(true);
    const docRef = db.collection('scholarships').doc();
    const data = {
      applied_on: Date.now(),
      date_of_birth: '',
      email: profileUser?.data.email,
      first_name: profileUser?.data.name.split(' ')[0],
      last_name: profileUser?.data.name.split(' ').slice(1).join(' '),
      grade: profileUser?.grade,
      id: docRef.id,
      is_created_by_admin: true,
      marks_map: {},
      organisation_name: 'Jeet Foundation',
      phone_number: profileUser?.data?.phone_number,
      previous_application_id: null,
      profile_pic: profileUser?.image,
      school_name: '',
      status: 'under_review',
      uid: profileUser?.uid
    }

    await docRef.set(data);
    // await wait(2500);

    await grantApplication(data.id);
    setShowTick(true);
    await wait(1700);
    setShowTick(false);
    setGranting(false);
    setGranted(data);
    setInReview(null);
    setNotApplied(false);
  }

  if(inReview) return (
    <div className="profile-card font-sans flex justify-between items-center my-6 p-4">
      <div className="text-gray-500 text-sm font-medium">Scholarship</div>
      <div className="text-center cursor-pointer text-cyan-500 text-sm font-medium flex items-center" onClick={() => {
        setFormUser(() => {
          setMainActiveTab(1);
          return inReview;
        });
      }}>
        <p className="mr-1">View Application</p>
        <ArrowForwardIos style={{fontSize: '11px'}} />
      </div>
    </div>
  )

  if(profileUser?.data.tier === 'free' && notApplied) return (
    <div className="profile-card font-sans flex justify-between items-center my-6 p-4">
      <div className="text-gray-500 text-sm font-medium">Scholarship</div>
      <div className="text-center cursor-pointer text-cyan-500 text-sm font-medium flex items-center" onClick={handleGrantApplication}>
        {!showTick && !granting && (
          <>
            <p className="mr-1">Grant Application</p>
            <ArrowForwardIos style={{fontSize: '11px'}} />
          </>
        )}
        {showTick &&
        <div className="tick-animation">
          <Lottie
            style={{width: '10px', height: '10px', position: 'relative'}}
            options={{ animationData: tickLottie, loop: false }} />
        </div>}
        {granting && !showTick && <Loader/>}
      </div>
    </div>
  )

  if(granted) return (
    <div className="profile-card font-sans my-6 p-4">
      <div className="text-gray-500 text-sm font-medium">Scholarship</div>
      <img className="w-40 mx-auto" src={ScholarshipGranted} alt=""/>
      <div className="text-center text-blue-500 text-sm font-medium cursor-pointer" onClick={() => {
        setFormUser(() => {
          setMainActiveTab(1);
          return granted;
        });
      }}>Scholarship Already Granted</div>
    </div>
  )

  return null;
}

export default function ProfileScreen({handleBackButton, user}) {
  const [_profileUser] = useContext(UserContext).profileUser;
  const [profileUser, setProfileUser] = useState(user);
  const [chartData, setChartData] = useState([]);
  const [timeSpent, setTimeSpent] = useState(0);
  const [lectureWatchedCount, setLectureWatchedCount] = useState(0);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if(!user && _profileUser) setProfileUser(_profileUser);
  }, [user, _profileUser])

  useEffect(() => {
    if(!profileUser?.uid) return () => {};
    setFetching(true);
    getLifeTimeEngagement(profileUser.uid, profileUser)
      .then(({chartData, timeSpent, lectureWatchedCount}) => {
        setChartData(chartData);
        setTimeSpent(timeSpent)
        setLectureWatchedCount(lectureWatchedCount);
        setFetching(false);
      })
  }, [profileUser, profileUser?.uid])

  return profileUser ? (
    <div className="flex flex-col font-sans h-full">
      <ArrowBackIos style={{fontSize: '20px'}} className="cursor-pointer text-zinc-900 dark:text-white" onClick={handleBackButton} />
      <div className="font-medium dark:text-white justify-self-start px-2 text-center">
        <div className="w-32 h-32 overflow-hidden rounded-full mx-auto my-4">
          <img className="w-full h-auto" src={profileUser.image} alt="" />
        </div>
        <div>{profileUser.name}</div>
        <div className="text-sm text-gray-500 dark:text-gray-500">{getClassName(profileUser.grade)}</div>
      </div>
      <div className="hide-scrollbar flex-1 overflow-auto">
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
                {!fetching ? <div>{lectureWatchedCount}</div> :
                <div className="animate-pulse w-10 h-4 mb-1 bg-zinc-300 dark:bg-zinc-600 rounded-full" />}
                <div className="text-xs text-gray-500 dark:text-gray-500">Lectures Watched</div>
              </div>
            </div>
            <div className="flex items-center mt-3">
              <QueryBuilderIcon className="text-white bg-red-500 rounded-2xl p-1" />
              <div className="text-sm font-medium dark:text-white justify-self-start px-2">
                {!fetching ? <div>{humanizeTime(timeSpent)}</div> :
                <div className="animate-pulse w-20 h-4 mb-1 bg-zinc-300 dark:bg-zinc-600 rounded-full" />}
                <div className="text-xs text-gray-500 dark:text-gray-500">Time Spent</div>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-card my-6 p-4">
          <div className="text-gray-500 text-sm font-medium">Lectures Watched</div>
          {fetching ? <div className="mt-5 h-[180px] animate-pulse bg-zinc-300 dark:bg-zinc-600 rounded" /> : <div className="mt-5">
            <Chart chartData={chartData}/>
          </div>}
        </div>
        <ScholarshipCard profileUser={profileUser} />
      </div>
    </div>
  ) : null
}
