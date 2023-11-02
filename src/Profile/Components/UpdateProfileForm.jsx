import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Typography, CircularProgress } from "@mui/material";
import { useAuth } from "../../Context/AuthContext";

const UpdateProfileForm = ({ profileData, onUpdateSuccess }) => {
  const { token , setProfileData } = useAuth();
  const [formData, setFormData] = useState({
    name: profileData.name,
    designation: profileData.designation,
    mobile: profileData.mobile,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        "https://conext.in/custom_users/api/update-profile/",
        {
          name: formData.name,
          designation: formData.designation,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.data) {
        onUpdateSuccess(response.data);
        localStorage.setItem("profileData", JSON.stringify(response.data));
        setProfileData(response.data);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(
        "An error occurred while updating the profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        variant="outlined"
        name="name"
        fullWidth
        margin="normal"
        value={formData.name}
        onChange={handleInputChange}
      />
      <TextField
        label="Designation"
        variant="outlined"
        name="designation"
        fullWidth
        margin="normal"
        value={formData.designation}
        onChange={handleInputChange}
      />
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
        sx={{ marginTop: "20px" }}
      >
        {loading ? <CircularProgress size={24} /> : "Update Profile"}
      </Button>
    </form>
  );
};

export default UpdateProfileForm;
