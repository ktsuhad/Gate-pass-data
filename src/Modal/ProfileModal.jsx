import React from "react";
import { Box, Modal, Typography } from "@mui/material";
import UpdateProfileForm from "../Profile/Components/UpdateProfileForm";

const ProfileModal = ({
  isOpen,
  onClose,
  profileData,
  onUpdateSuccess,
  error,
  setError,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="update-profile-modal"
    >
      <Box
        sx={{
          position: "absolute",
          width: "90%",
          maxWidth: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Update Profile
          </Typography>
        </div>
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        <UpdateProfileForm
          profileData={profileData}
          onUpdateSuccess={() => {
            onUpdateSuccess();
            setError(""); // Clear error on success
            onClose();
          }}
          setError={setError}
        />
      </Box>
    </Modal>
  );
};

export default ProfileModal;
