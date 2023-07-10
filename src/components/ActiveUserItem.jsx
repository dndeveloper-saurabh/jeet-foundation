import React from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {randomAvatar} from "../helpers";

export default function ActiveUserItem({shimmer, defaultPic, title, subTitle, onClick}) {

  if(shimmer) {
    return (
      <div className="animate-pulse grid grid-cols-[50px_minmax(100px,_1fr)_50px] items-center justify-items-center cursor-pointer">
        <div className="w-10 h-10 bg-zinc-300 dark:bg-zinc-600 rounded-full" />
        <div className="font-medium text-zinc-300 dark:text-white justify-self-start px-2">
          <div className="w-36 h-5 bg-zinc-300 dark:bg-zinc-600 rounded" />
          <div className="text-sm font-normal text-gray-400 dark:text-gray-400 rounded mt-1 w-24 h-4 bg-zinc-300 dark:bg-zinc-600" />
        </div>
        <ArrowForwardIosIcon className="text-gray-500" style={{fontSize: '18px'}} />
      </div>
    )
  }
  return (
    <div className="grid grid-cols-[50px_minmax(100px,_1fr)_50px] items-center justify-items-center cursor-pointer" onClick={onClick}>
      {defaultPic ? <img className="w-10 h-10 rounded-full" src={defaultPic} alt=""/> : randomAvatar(title)}
      <div className="font-medium text-zinc-900 dark:text-white justify-self-start px-2">
        <div>{title}</div>
        <div className="text-sm font-normal text-gray-400 dark:text-gray-400">{subTitle}</div>
      </div>
      <ArrowForwardIosIcon className="text-gray-500" style={{fontSize: '18px'}} />
    </div>
  )
}
