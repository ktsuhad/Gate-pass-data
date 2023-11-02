import React from "react";
import Profile from "./Components/Profile";
import { useAuth } from "../Context/AuthContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StaffProfile = () => {
  const { profileData } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleAddProfileClick = () => {
    navigate("/staff-profile"); // Navigate to the StaffProfileForm component
  };

  if (!profileData) {
    // Render a component or message when there is no profile data
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>
          <h1 className="text-2xl font-semibold mb-4 text-center">
            No Profile Data Available
          </h1>
          <Button
            variant="contained"
            size="large"
            onClick={handleAddProfileClick}
          >
            Add Profile
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          User Profile
        </h1>
        <Profile profileData={profileData} />
      </div>
    </div>
  );
};

export default StaffProfile;
