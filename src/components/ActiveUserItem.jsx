import React from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {randomAvatar} from "../helpers";

export default function ActiveUserItem({defaultPic, title, subTitle, onClick}) {

  return (
    <div className="grid grid-cols-[50px_minmax(100px,_1fr)_50px] items-center justify-items-center cursor-pointer" onClick={onClick}>
      {defaultPic ? <img className="w-10 h-10 rounded-full" src={defaultPic} alt=""/> : randomAvatar(title)}
      <div className="font-medium dark:text-white justify-self-start px-2">
        <div>{title}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{subTitle}</div>
      </div>
      <ArrowForwardIosIcon className="text-gray-500" style={{fontSize: '18px'}} />
    </div>
  )
}
