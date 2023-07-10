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
import {ThemeContext} from "../context/ThemeContext";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import RestoreIcon from "@material-ui/icons/Restore";
import UserListItem from "./UserListItem";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import {getClassName, randomAvatar} from "../helpers";
import ActiveUsersScreen from "./ActiveUsersScreen";
import NumberMeter from "./NumberMeter";

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
  const [isDark, setIsDark] = useContext(ThemeContext).isDark;
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
    <main className="text-white flex-1 bg-white dark:bg-zinc-900 overflow-hidden">
      <div className="grid h-full grid-rows-[95px_28px_95px_1fr] gap-5 px-6 lg:px-0 grid-cols-2 max-w-4xl mx-auto pt-10">
        <div className="col-span-2 dashboard-card bg-zinc-700 flex items-center">
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
        <h2 className="col-span-2 text-xl font-medium text-zinc-900 dark:text-white">Analytics</h2>
        <div className="dashboard-card py-0 px-4 flex flex-col justify-center cursor-pointer" onClick={() => {
          setShowDrawer(<UnderReviewScreen handleBackButton={() => setShowDrawer(null)} activeTabIndex={1} pastScreenProps={{tabIndex: 0}} />)
        }}>
          <p className="text-blue-500 text-lg font-medium"><NumberMeter value={approved.length} /></p>
          <p className="text-sm text-gray-400 font-normal dark:text-gray-400">Scholarships Granted</p>
        </div>
        <div className="dashboard-card py-0 px-4 flex flex-col justify-center">
          <p className="text-red-500 text-lg font-medium">
            <NumberMeter value={lectureWatchedCount} />
          </p>
          <p className="text-sm text-gray-400 font-normal dark:text-gray-400">Lectures Watched</p>
        </div>
        <div className="col-span-2 overflow-hidden h-[calc(100%-2rem)] pb-2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-medium text-xl text-zinc-900 dark:text-white">Active Users</h2>
            <div className="flex items-center text-sm text-blue-500 cursor-pointer" onClick={() => {
              setShowDrawer(activeUsersScreen)
            }}>View All <ArrowForwardIosIcon className="ml-1" style={{fontSize: '13px'}} /></div>
          </div>
          <div className="overflow-auto h-[calc(100%-3rem)] [&>*]:mb-4 mb-6 block p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {activeUsers ? activeUsers.map(item => {
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
            }) : [1,2,3,4,5,6,7,8,9,10].map(() => <ActiveUserItem shimmer />)}
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
        PaperProps={{className: 'w-96 h-screen px-4 py-6', style: {
          backgroundColor: isDark ? '#18181b' : '#ffffff'
          }}}
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
