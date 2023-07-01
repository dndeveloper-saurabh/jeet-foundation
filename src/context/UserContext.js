import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  //------------------------------------ constants hooks

  const [user, setUser] = useState(null);
  const [allowedLoggedInUser, setAllowLoggedInUser] = useState(null);
  const [approved, setApproved] = useState(null);
  const [rejected, setRejected] = useState(null);
  const [review, setReviewed] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [profileUser, setProfileUser] = useState(null);
  const [formUser, setFormUser] = useState(null);
  const [activeUsers, setActiveUsers] = useState(null);
  const [showDrawer, setShowDrawer] = useState(null);

  return (
    <UserContext.Provider
      value={{
        user: [user, setUser],
        allowedLoggedInUser: [allowedLoggedInUser, setAllowLoggedInUser],
        approved: [approved, setApproved],
        rejected: [rejected, setRejected],
        review: [review, setReviewed],
        activeTab: [activeTab, setActiveTab],
        profileUser: [profileUser, setProfileUser],
        formUser: [formUser, setFormUser],
        activeUsers: [activeUsers, setActiveUsers],
        showDrawer: [showDrawer, setShowDrawer]
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
