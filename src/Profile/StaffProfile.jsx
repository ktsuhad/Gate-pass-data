import React from "react";
import Profile from "./Components/Profile";
import { useAuth } from "../Context/AuthContext";

const StaffProfile = () => {
  const { profileData } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="">
        <h1 className="text-2xl font-semibold mb-4 text-center">User Profile</h1>
        <Profile profileData={profileData} />
      </div>
    </div>
  );
};

export default StaffProfile;
