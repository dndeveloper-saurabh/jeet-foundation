import React, {useMemo, useContext, useState} from 'react';
import PhoneIcon from "@material-ui/icons/Phone";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import JeetFoundationLogo from '../assets/images/jeet-foundation-white.svg';
import JeetFoundationDarkLogo from '../assets/images/jeet-foundation-black.svg';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import SchoolIcon from '@material-ui/icons/School';
import CakeIcon from '@material-ui/icons/Cake';
import ReceiptIcon from '@material-ui/icons/Receipt';
import {UserContext} from "../context/UserContext";
import {getClassName} from "../helpers";
import Loader from "./Loader";
import {db} from "../config";
import {ThemeContext} from "../context/ThemeContext";
import {grantApplication} from "../database";
import {EmailOutlined} from "@material-ui/icons";

function GrantButton({className, applicationId}) {
  const [loading, setLoading] = useState(false);
  const [, setShowDrawer] = useContext(UserContext).showDrawer;

  const handleClick = async () => {
    setLoading(true)
    await grantApplication(applicationId);
    setShowDrawer(null);
    setLoading(false)
  }

  return (
    <button className={"rounded-lg bg-gray-700 text-white w-full h-10 grant-button flex w-full items-center " + (className ? className : '')} onClick={handleClick}>
      {loading ? <Loader/> : <span className="font-bold text-white text-sm flex-1">Grant</span>}
    </button>
  )
}

function RescindButton({className, label, applicationId}) {
  const [loading, setLoading] = useState(false);
  const [, setShowDrawer] = useContext(UserContext).showDrawer;

  const handleClick = async () => {
    setLoading(true)
    fetch(
      "https://us-central1-avian-display-193502.cloudfunctions.net/updateScholarshipSheet",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          column: "Approved?",
          value: "No",
          application_id: applicationId
        }),
      }
    )
      .then(() => console.log("rejected"))
      .catch((err) => console.log(err));

    await db
      .collection('scholarships')
      .doc(applicationId)
      .set({
        status: 'rejected'
      }, {merge: true})
    setShowDrawer(null);
    setLoading(false)
  }

  return (
    <button className={"rounded-lg bg-gray-700 text-white w-full h-10 flex items-center " + (className ? className : '')} onClick={handleClick}>
      {loading ? <Loader/> : <span className="font-bold text-white text-sm flex-1">{label ?? 'Rescind'}</span>}
    </button>
  )
}

export default function FormScreen() {
  const [formUser, setFormUser] = useContext(UserContext).formUser;
  const [, setMainActiveTab] = useContext(UserContext).activeTab;
  const [isDark] = useContext(ThemeContext).isDark;

  const marksMap = useMemo(() => {
    console.log('formUser - ', formUser);
    if(!formUser) return [];
    return Object.keys(formUser.marks_map).map(grade => {
      const gradeNumber = grade.split('_')[1];
      return {
        label: gradeNumber + 'th Percentage',
        marks: formUser.marks_map[grade]
      }
    })
  }, [formUser])

  let buttons = <>
    <GrantButton applicationId={formUser.id} className="col-span-4" />
    <RescindButton applicationId={formUser.id} className="col-span-3" label={'Deny'} />
  </>

  if(formUser?.status === 'approved') {
    buttons = <RescindButton applicationId={formUser.id} className="col-span-7" />
  }

  if(formUser?.status === 'rejected') {
    buttons = <GrantButton applicationId={formUser.id} className="col-span-7" />
  }

  return (
    <div className="flex flex-col h-full font-sans">
      <div className="flex items-center text-white mb-3">
        <ArrowBackIos style={{fontSize: '18px'}} className="cursor-pointer text-zinc-900 dark:text-white" onClick={() => {
          setMainActiveTab(() => {
            setTimeout(() => {
              setFormUser(null);
            }, 300)
            return 0
          })
        }} />
        <div className="flex-1 ml-2 text-xl text-white font-bold">Scholarship</div>
      </div>
      <img src={isDark ? JeetFoundationLogo : JeetFoundationDarkLogo} className="my-8 mx-auto h-10" alt=""/>
      <div className="hide-scrollbar flex-1">
        <div className="profile-card my-6 p-0 overflow-hidden">
          <div className="p-6">
            <div className="text-gray-500 text-sm font-medium">Application Form</div>
            <div className="flex items-center mt-3">
              <RecentActorsIcon className="text-black bg-cyan-500 rounded-2xl p-1" />
              <div className="text-sm font-medium dark:text-white justify-self-start px-2">
                <div className="text-xs text-gray-500 dark:text-gray-500">Name</div>
                <div>{formUser.first_name + ' ' + formUser.last_name}</div>
              </div>
            </div>
            <div className="flex items-center mt-3">
              <PhoneIcon className="text-black bg-green-400 rounded-2xl p-1" />
              <div className="text-sm font-medium dark:text-white justify-self-start px-2">
                <div className="text-xs text-gray-500 dark:text-gray-500">Phone Number</div>
                <div>+91 {formUser.phone_number}</div>
              </div>
            </div>
            <div className="flex items-center mt-3">
              <EmailOutlined className="text-white bg-cyan-600 rounded-2xl p-1" />
              <div className="text-sm font-medium dark:text-white justify-self-start px-2">
                <div className="text-xs text-gray-500 dark:text-gray-500">Email</div>
                <div>{formUser.email}</div>
              </div>
            </div>
            {formUser.school_name && <div className="flex items-center mt-3">
              <SchoolIcon className="text-white bg-blue-500 rounded-2xl p-1"/>
              <div className="text-sm font-medium dark:text-white justify-self-start px-2">
                <div className="text-xs text-gray-500 dark:text-gray-500">School</div>
                <div>{formUser.school_name}</div>
              </div>
            </div>}
            {formUser.date_of_birth && <div className="flex items-center mt-3">
              <CakeIcon className="text-white bg-orange-500 rounded-2xl p-1"/>
              <div className="text-sm font-medium dark:text-white justify-self-start px-2">
                <div className="text-xs text-gray-500 dark:text-gray-500">Date of Birth</div>
                <div>{formUser.date_of_birth}</div>
              </div>
            </div>}
            <div className="flex items-center mt-3">
              <ReceiptIcon className="text-white bg-cyan-500 rounded-2xl p-1" />
              <div className="text-sm font-medium dark:text-white justify-self-start px-2">
                <div className="text-xs text-gray-500 dark:text-gray-500">Grade</div>
                <div>{getClassName(formUser.grade)}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 ">
              {marksMap.map(markItem => (
                <div className="flex items-center mt-3">
                  <ReceiptIcon className="text-white bg-cyan-500 rounded-2xl p-1" />
                  <div className="text-sm font-medium dark:text-white justify-self-start px-2">
                    <div className="text-xs text-gray-500 dark:text-gray-500">{markItem.label}</div>
                    <div>{markItem.marks}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-900 h-16 px-3 py-3 grid grid-cols-7 gap-2">
            {buttons}
          </div>
        </div>
      </div>
    </div>
  )
}
