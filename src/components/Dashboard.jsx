import React, {useContext, useEffect, useState, useRef} from 'react';
import ActiveUserItem from "./ActiveUserItem";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import {useMediaQuery} from "react-responsive";
import Drawer from "@material-ui/core/Drawer";
import ProfileScreen from "./ProfileScreen";
import UnderReviewScreen from "./UnderReviewScreen";
import PastScholarshipScreen from "./PastScholarshipScreen";
import FormScreen from "./FormScreen";
import {fetchScholarships, getMonthActiveUsers} from "../database";
import {UserContext} from "../context/UserContext";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import RestoreIcon from "@material-ui/icons/Restore";
import UserListItem from "./UserListItem";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import {getClassName} from "../helpers";
import ActiveUsersScreen from "./ActiveUsersScreen";

const defaultPic = 'https://lh3.googleusercontent.com/a/AGNmyxaNQYQ0bte8Vz4NkpY7FX_oalIkGPue0dfhwbi7=s96-c'

export default function Dashboard() {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 500px)" });
  const [isiPad, setIsIpad] = useState(false);
  const [showDrawer, setShowDrawer] = useContext(UserContext).showDrawer;
  const [approved, setApproved] = useContext(UserContext).approved;
  const [rejected, setRejected] = useContext(UserContext).rejected;
  const [review, setReviewed] = useContext(UserContext).review;
  const [activeTab, setActiveTab] = useContext(UserContext).activeTab;
  const [formUser, setFormUser] = useContext(UserContext).formUser;
  const [, setProfileUser] = useContext(UserContext).profileUser;
  const [activeUsers, setActiveUsers] = useContext(UserContext).activeUsers;
  const [lectureWatchedCount, setLectureWatchedCount] = useState(0);
  const paginatedList = useRef(null);
  const [noMore, setNoMore] = useState(false);

    useEffect(() => {
    setIsIpad(navigator.userAgent.match(/iPad/i) !== null);
  }, []);

  console.log('formUser - ', formUser);

  useEffect(() => {
    if(showDrawer) return;
    fetchScholarships()
      .then(docs => {
        let approved = [];
        let rejected = [];
        let review = [];
        docs.forEach(doc => {
          const data = doc.data();
          if(data.status === 'approved') {
            approved.push(doc.data());
          }
          if(data.status === 'under_review') {
            review.push(doc.data())
          }
          if(data.status === 'rejected') {
            rejected.push(doc.data())
          }
        })
        setApproved(approved);
        setRejected(rejected);
        setReviewed(review);
      })

    getMonthActiveUsers(0).then(async (list) => {
      console.log('list - ', list);
      paginatedList.current = list;
      window.paginatedList = list;

      await list.initialLoad();

      await list.transformList();

      setActiveUsers(list.transformedList);

      const lectureCount = list.utilityFunctions.getWatchLecturesCount();
      setLectureWatchedCount(lectureCount);
    })
  }, [showDrawer]);

  useEffect(() => {
    if(!showDrawer) setActiveTab(0)
  }, [showDrawer, setActiveTab]);

  const activeUsersScreen = paginatedList.current ? (<ActiveUsersScreen fetchMore={async () => {
    if(!paginatedList.current) return;
    await paginatedList.current?.fetchMore();

    if(paginatedList.current?.noMore) {
      setNoMore(true);
    }

    await paginatedList.current?.transformList();

    setActiveUsers(paginatedList.current.transformedList);
  }} noMore={noMore} handleBackButton={() => setShowDrawer(null)} />) : null;

  return review ? (
    <main className="text-white h-screen w-screen overflow-auto" style={{background: '#181818'}}>
      <div className="grid gap-5 px-6 lg:px-0 grid-cols-2 max-w-4xl mx-auto mt-10">
        <div className="col-span-2 dashboard-card flex items-center">
          <h2 className="text-5xl font-bold mr-4">{review.length}</h2>
          <div className="flex-1">
            <h4 className="text-lg font-medium">Scholarships</h4>
            <h6 className="text-sm text-gray-500 dark:text-gray-400">Awaiting Review</h6>
          </div>
          <div className="rounded-full bg-green-600 py-2 px-6 cursor-pointer" onClick={() => {
            setShowDrawer(<UnderReviewScreen handleBackButton={() => setShowDrawer(null)} />)
          }}>
            <span className="font-bold">View</span>
          </div>
        </div>
        <h2 className="col-span-2 font-medium">Analytics</h2>
        <div className="dashboard-card">
          <p className="text-blue-500 font-medium">{approved.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Scholarships Granted</p>
        </div>
        <div className="dashboard-card" onClick={() => setShowDrawer(true)}>
          <p className="text-red-500 font-medium">{lectureWatchedCount}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Lectures Watched</p>
        </div>
        <div className="col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-medium">Active Users</h2>
            <div className="flex items-center text-sm text-blue-500 cursor-pointer" onClick={() => {
              setShowDrawer(activeUsersScreen)
            }}>View All <ArrowForwardIosIcon className="ml-1" style={{fontSize: '13px'}} /></div>
          </div>
          <div className="[&>*]:mb-4 mb-6 overflow-auto block p-4 md:p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {activeUsers?.map(item => {
              return item && item.grade && <ActiveUserItem onClick={() => {
                console.log('item - ', item);
                setFormUser(() => {
                  setProfileUser(() => {
                    setActiveTab(() => {
                      setShowDrawer(activeUsersScreen)
                      return 1;
                    });
                    return item;
                  })
                  return null;
                })
              }} item={item.data} defaultPic={item.image} title={item.name} subTitle={getClassName(item.grade)} />
            })}
          </div>
        </div>
      </div>
      <Drawer
        variant="temporary"
        open={!!showDrawer}
        // open={true}
        // anchor={isSmallScreen ? (isiPad ? "right" : "bottom") : "right"}
        anchor={"right"}
        // disableBackdropClick={true}
        // disableEscapeKeyDown={true}
        onClose={() => {setShowDrawer(null)}}
        ModalProps={{ keepMounted: true }}
        PaperProps={{className: 'w-96 !bg-black h-screen px-4 py-6'}}
        // BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.75)" } }}
      >
        <SwipeableViews
          axis="x"
          index={activeTab}
          onChangeIndex={(e) => setActiveTab(e)}
          scrolling={"false"}
          ignoreNativeScroll={true}
          disabled={true}
          style={{height: '100%'}}
          className="review-screen"
        >
          {showDrawer}
          {formUser ? <FormScreen /> : <ProfileScreen handleBackButton={() => {
            if(showDrawer) {
              setActiveTab(0);
            } else {
              setActiveTab(0);
              setShowDrawer(null);
            }
          }} />}
          {/*<ProfileScreen />*/}
        </SwipeableViews>
      </Drawer>
    </main>
  ) : null
}
