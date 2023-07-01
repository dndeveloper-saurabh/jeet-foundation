import React, {useState, useCallback, useRef, useContext, useEffect} from 'react';
import UserListItem from "./UserListItem";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import {UserContext} from "../context/UserContext";
import {getClassName} from "../helpers";
import {isVisible} from "@testing-library/user-event/dist/utils";
import Loader from "./Loader";

const defaultPic = 'https://firebasestorage.googleapis.com/v0/b/avian-display-193502.appspot.com/o/users%2Fuser_profile%2Fdefault%2Fimage.jpg?alt=media&token=da277c04-0b39-49a3-8b90-4d6e93129a93'

export default function ActiveUsersScreen({handleBackButton, fetchMore = () => {}, noMore}) {
  const [activeUsers] = useContext(UserContext).activeUsers;
  const visibility = useRef();
  const [visible, setIsVisible] = useState(false);
  const [, setActiveTab] = useContext(UserContext).activeTab;
  const [, setFormUser] = useContext(UserContext).formUser;
  const [, setProfileUser] = useContext(UserContext).profileUser;

  console.log('noMore - ', noMore);

  const lastItemRef = useCallback(function (node) {
    console.log('node - ', node);
    if (node !== null) {
      if (visibility.current) visibility.current.disconnect();

      visibility.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      });
      if (node) visibility.current.observe(node);
    }
  }, []);

  useEffect(() => {
    if(visible) fetchMore();
  }, [visible])

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center text-white">
        <ArrowBackIos style={{fontSize: '18px'}} className="cursor-pointer" onClick={handleBackButton} />
        <div className="flex-1 ml-2 text-xl flowingText font-bold">Active Users</div>
      </div>
      <div className="[&>*]:mt-3 hide-scrollbar flex-1 mt-4 overflow-auto">
        {activeUsers?.map((item) => {

          return item && item.grade && (
            <UserListItem item={item} containerClassName="mb-2" src={item.profile_url} title={item.name} subTitle={getClassName(item.grade)} onItemClick={(item) => {
              setFormUser(() => {
                setProfileUser(() => {
                  setActiveTab(1);
                  return item;
                })
                return null;
              })
            }}/>
          )
        })}
        {!noMore && <div ref={lastItemRef} className="w-full h-10 flex items-center justify-center text-white text-center">
          <span className="text-gray-700 text-sm">Fetching...</span>
        </div>}
      </div>
    </div>
  )
}
