import React from 'react';

export default function Loader({className, style = {}}) {
  return <div className={"loader-37 flex-1 text-zinc-900 dark:text-white " + (className ? className : '')} style={style} />
}
