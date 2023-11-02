import React, { useState } from "react";
import {
  Avatar,
  Typography,
  Grid,
  Paper,
  Container,
  Box,
  Button,
} from "@mui/material";
import ProfileModal from "../../Modal/ProfileModal";

const Profile = ({ profileData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(""); // Add error state

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError(""); // Clear error when closing the modal
  };

  return (
    <Container maxWidth="xs" className="mt-5">
      <Paper elevation={3} className="p-4">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            alt={profileData?.name}
            src={profileData?.picture}
            sx={{ width: 128, height: 128 }}
          />
          <Typography
            variant="h5"
            style={{ marginTop: "10px", marginBottom: "20px" }}
          >
            {profileData?.name}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body2">
              <strong>Date of Birth:</strong> {profileData?.dob}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              <strong>Mobile:</strong> {profileData?.mobile}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              <strong>Address:</strong> {profileData?.address}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              <strong>Emergency Contact:</strong>{" "}
              {profileData?.emergency_contact}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              <strong>Blood Group:</strong> {profileData?.blood_group}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              <strong>Department:</strong> {profileData?.department}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              <strong>Designation:</strong> {profileData?.designation}
            </Typography>
          </Grid>
        </Grid>

        {/* Edit button aligned to the right */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{marginTop:"20px"}}
            onClick={handleOpenModal}

          >
            Edit Profile
          </Button>
        </div>

        {/* Profile Modal with error handling */}
        <ProfileModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          profileData={profileData}
          onUpdateSuccess={() => {
            handleCloseModal();
            setError(""); // Clear error on success
          }}
          error={error}
          setError={setError}
        />
      </Paper>
    </Container>
  );
};

export default Profile;
