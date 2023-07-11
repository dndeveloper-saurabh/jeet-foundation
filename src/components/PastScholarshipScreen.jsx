import React, {useContext} from 'react';
import UserListItem from "./UserListItem";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from "react-swipeable-views-react-18-fix";
import {UserContext} from "../context/UserContext";
import {getClassName} from "../helpers";
import {ThemeContext} from "../context/ThemeContext";

const defaultPic = 'https://lh3.googleusercontent.com/a/AGNmyxaNQYQ0bte8Vz4NkpY7FX_oalIkGPue0dfhwbi7=s96-c'

const AntTabs = withStyles({
  root: {
    // borderBottom: '1px solid #e8e8e8',
    width: '100%'
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#dd2476',
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#dd2476',
    },
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#dd2476',
      opacity: 1,
    },
    '&$selected': {
      color: '#dd2476',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#dd2476',
    },
  },
  selected: {}
}))((props) => <Tab disableRipple {...props} />);

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#dd2476',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: '#fff',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
    '&$selected': {
      color: '#dd2476',
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

export default function PastScholarshipScreen({handleBackButton, tabIndex = 0}) {
  const [activeTab, setActiveTab] = React.useState(tabIndex);
  const [rejected] = useContext(UserContext).rejected;
  const [approved] = useContext(UserContext).approved;
  const [isDark] = useContext(ThemeContext).isDark;

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center text-zinc-900 dark:text-white mb-3">
        <ArrowBackIos style={{fontSize: '18px'}} className="cursor-pointer" onClick={handleBackButton} />
        <div className="flex-1 ml-2 text-xl flowingText font-bold">Past Scholarships</div>
      </div>
      <AntTabs
        value={activeTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <AntTab style={{color: activeTab === 0 ? '#dd2476' : (isDark ? '#fff' : 'rgba(0,0,0,0.5)')}} label="Accepted" />
        <AntTab style={{color: activeTab === 1 ? '#dd2476' : (isDark ? '#fff' : 'rgba(0,0,0,0.5)')}} label="Rejected" />
      </AntTabs>
      <div className="[&>*]:mt-3 hide-scrollbar flex-1 mt-4 overflow-auto">
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
          style={{height: 'auto'}}
        >
          <>
            {approved.map(item => <UserListItem item={item} containerClassName="mb-2" src={item.profile_url} title={item.first_name + " " + item.last_name} subTitle={getClassName(item.grade)}/>)}
          </>
          <>
            {rejected.map(item => <UserListItem item={item} containerClassName="mb-2" src={item.profile_url} title={item.first_name + " " + item.last_name} subTitle={getClassName(item.grade)}/>)}
          </>
        </SwipeableViews>
      </div>
    </div>
  )
}
