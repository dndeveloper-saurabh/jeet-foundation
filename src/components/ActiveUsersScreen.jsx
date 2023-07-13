import React, {useState, useCallback, useRef, useContext, useEffect, useMemo} from 'react';
import UserListItem from "./UserListItem";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import {UserContext} from "../context/UserContext";
import {getClassName, humanizeTime} from "../helpers";
import {isVisible} from "@testing-library/user-event/dist/utils";
import Loader from "./Loader";
import ProfileScreen from "./ProfileScreen";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import {AntTab, AntTabs} from "./PastScholarshipScreen";
import {ThemeContext} from "../context/ThemeContext";
import moment from "moment";

const defaultPic = 'https://firebasestorage.googleapis.com/v0/b/avian-display-193502.appspot.com/o/users%2Fuser_profile%2Fdefault%2Fimage.jpg?alt=media&token=da277c04-0b39-49a3-8b90-4d6e93129a93'

function Timer({initValue = 0}) {
  const [val, setVal] = useState(initValue)

  useEffect(() => {
    const interval = setInterval(() => {
      setVal(val => val + 10000);
    }, 10000)

    return () => clearInterval(interval);
  }, [initValue]);

  const string = useMemo(() => {
    const duration = moment() - moment(val);
    return humanizeTime(Math.round(duration / 1000));
  }, [val])

  return (
    <div className="flex mt-1 items-center font-sans">
      <span className="block w-1.5 h-1.5 rounded-full bg-green-400 mr-1" /> <span className="text-zinc-900 dark:text-white opacity-70 text-xs mr-2">Active Since</span> <span className="text-zinc-900 dark:text-white text-xs font-medium">{string}</span>
    </div>
  )
}

export default function ActiveUsersScreen({handleBackButton, fetchMore = () => {}, fetchMoreOnlineUsers = () => {}, noMoreActiveUsers, noMoreOnlineUsers}) {
  const [activeUsers] = useContext(UserContext).activeUsers;
  const [onlineUsers] = useContext(UserContext).onlineUsers;
  const visibility = useRef();
  const visibility1 = useRef();
  const [visible, setIsVisible] = useState(false);
  const [visible1, setIsVisible1] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isDark] = useContext(ThemeContext).isDark;
  const [, setMainActiveTab] = useContext(UserContext).activeTab;
  const [, setFormUser] = useContext(UserContext).formUser;
  const [showDrawer, setShowDrawer] = useContext(UserContext).showDrawer;
  const [, setProfileUser] = useContext(UserContext).profileUser;
  const [scrolled1, setScrolled1] = useState(false);
  const [scrolled2, setScrolled2] = useState(false);
  const activeTabRef = useRef(activeTab);

  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab])

  const lastItemRef = useCallback(function (node) {
    console.log('node - ', node);
    if (node !== null) {
      if (visibility.current) visibility.current.disconnect();

      visibility.current = new IntersectionObserver((entries) => {
        console.log('entries - ', entries);
        if (entries[0].isIntersecting && activeTabRef.current === 0) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      });
      if (node) visibility.current.observe(node);
    }
  }, []);

  const lastItemRef2 = useCallback(function (node) {
    console.log('node - ', node);
    if (node !== null) {
      if (visibility1.current) visibility1.current.disconnect();

      visibility1.current = new IntersectionObserver((entries) => {
        console.log('entries - ', entries);
        if (entries[0].isIntersecting && activeTabRef.current === 1) {
          setIsVisible1(true);
        } else {
          setIsVisible1(false);
        }
      });
      if (node) visibility1.current.observe(node);
    }
  }, []);

  useEffect(() => {
    if(visible) fetchMore();
  }, [visible]);

  useEffect(() => {
    if(visible1) fetchMoreOnlineUsers();
  }, [visible1]);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const overAllUsersJSX = <>
    {activeUsers?.map((item) => {

      return item && item.grade && (
        <UserListItem key={item.uid} notGradient item={item} timeSpent={item.time_spent} containerClassName="mb-2" src={item.profile_url} title={item.name} subTitle={getClassName(item.grade)} onItemClick={(item) => {
          setFormUser(() => {
            setProfileUser(() => {
              setMainActiveTab(1);
              return item;
            })
            return null;
          })
        }}/>
      )
    })}
    {!noMoreActiveUsers && <div ref={lastItemRef} className="w-full h-10 flex items-center justify-center text-white text-center">
      <span className="text-gray-700 text-sm">Fetching...</span>
    </div>}
  </>

  const onlineUsersJSX = <>
    {onlineUsers.sort((a, b) => b.online_since - a.online_since)?.map((item) => {

      return item && item.grade && (
        <UserListItem notGradient key={item.uid} item={item} timeSpent={item.time_spent} containerClassName="mb-2" src={item.profile_url} title={item.name} subTitle={<Timer initValue={item.online_since} />} onItemClick={(item) => {
          setFormUser(() => {
            setProfileUser(() => {
              setMainActiveTab(1);
              return item;
            })
            return null;
          })
        }}/>
      )
    })}
    {!noMoreOnlineUsers && <div ref={lastItemRef2} className="w-full h-10 flex items-center justify-center text-white text-center">
      <span className="text-gray-700 text-sm">Fetching...</span>
    </div>}
  </>

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center text-zinc-900 dark:text-white mb-3 px-4">
        <ArrowBackIos style={{fontSize: '18px'}} className="cursor-pointer text-zinc-900 dark:text-white" onClick={handleBackButton} />
        <div className="flex-1 ml-2 text-xl flowingText font-bold">Active Users</div>
      </div>
      <div className="w-full transition-all" style={{boxShadow: (activeTab === 0 ? scrolled1 : scrolled2) ? '0 10px 12px rgba(0,0,0,0.1)' : 'none'}}>
        <AntTabs
          value={activeTab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <AntTab style={{color: activeTab === 0 ? '#dd2476' : (isDark ? '#fff' : 'rgba(0,0,0,0.5)')}} label="Overall" />
          <AntTab style={{color: activeTab === 1 ? '#dd2476' : (isDark ? '#fff' : 'rgba(0,0,0,0.5)')}} label="Active Now" />
        </AntTabs>
      </div>
      <div className="hide-scrollbar flex-1 overflow-auto px-4">
        <SwipeableViews
          axis="x"
          index={activeTab}
          containerStyle={{
            transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s'
          }}
          onChangeIndex={(e) => setActiveTab(e)}
          scrolling={"false"}
          ignoreNativeScroll={true}
          disabled={true}
          style={{height: 'calc(100% - 1rem)'}}
          slideStyle={{overflow: 'hidden !important'}}
        >
          {/*{overAllUsersJSX}*/}
          {/*{onlineUsersJSX}*/}
          <div className="h-full overflow-auto hide-scrollbar divide-y divide-solid divide-zinc-200 dark:divide-slate-800" onScroll={e => {
            const scrollTop = e.target.scrollTop;
            setScrolled1(scrollTop > 5 && activeTab === 0);
            // setScrolled(c => {
            //   c[0] = scrollTop > 5 && activeTab === 0;
            //   console.log('c - ', c);
            //   return c;
            // });
          }}>
            {overAllUsersJSX}
          </div>
          <div className="h-full overflow-auto hide-scrollbar divide-y divide-solid divide-zinc-200 dark:divide-slate-800" onScroll={e => {
            const scrollTop = e.target.scrollTop;
            setScrolled2(scrollTop > 5 && activeTab === 1);
          }}>
            {onlineUsersJSX}
          </div>
        </SwipeableViews>
      </div>
    </div>
  )

  // return (
  //   <div className="flex flex-col h-full">
  //     <div className="flex items-center text-white">
  //       <ArrowBackIos style={{fontSize: '18px'}} className="cursor-pointer text-zinc-900 dark:text-white" onClick={handleBackButton} />
  //       <div className="flex-1 ml-2 text-xl flowingText font-bold">Active Users</div>
  //     </div>
  //     <div className="[&>*]:mt-3 hide-scrollbar flex-1 mt-4 overflow-auto">
  //
  //     </div>
  //   </div>
  // )
}
