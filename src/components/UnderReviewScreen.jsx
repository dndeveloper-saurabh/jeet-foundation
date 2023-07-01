import React, {useState, useContext} from 'react';
import UserListItem from "./UserListItem";
import RestoreIcon from '@material-ui/icons/Restore';
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import PastScholarshipScreen from "./PastScholarshipScreen";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import {UserContext} from "../context/UserContext";

const defaultPic = 'https://firebasestorage.googleapis.com/v0/b/avian-display-193502.appspot.com/o/users%2Fuser_profile%2Fdefault%2Fimage.jpg?alt=media&token=da277c04-0b39-49a3-8b90-4d6e93129a93'

export default function UnderReviewScreen({handleBackButton}) {
  const [activeTab, setActiveTab] = useState(0);
  const [review] = useContext(UserContext).review;

  console.log('review - ', review);

  return (
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
      <div className="flex flex-col h-full">
        <div className="flex items-center text-white">
          <ArrowBackIos style={{fontSize: '18px'}} className="cursor-pointer" onClick={handleBackButton} />
          <div className="flex-1 ml-2 text-xl flowingText font-bold">Scholarships</div>
          <RestoreIcon className="bg-gray-600 p-0.5 rounded-2xl cursor-pointer" onClick={() => {
            setActiveTab(1)
          }} />
        </div>
        <div className="[&>*]:mt-3 hide-scrollbar flex-1 mt-4 overflow-auto">
          {review.map((item) => {

            return (
              <UserListItem item={item} containerClassName="mb-2" src={item.profile_url} title={item.first_name + " " + item.last_name} subTitle={item.grade}/>
            )
          })}
        </div>
      </div>
      <PastScholarshipScreen handleBackButton={() => setActiveTab(0)} />
    </SwipeableViews>
  )
}