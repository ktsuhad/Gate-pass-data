import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Container,
  Typography,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const StaffProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    mobile: "",
    department: "1",
    designation: "1",
    picture: null,
    address: "",
    emergency_contact: "",
    blood_group: "",
  });

  const [selectedImageName, setSelectedImageName] = useState(""); // New state for selected image name
  const [loading, setLoading] = useState(false); // New state for loading indicator
  const [error, setError] = useState(""); // New state for error message
  const { token, profileData, setProfileData } = useAuth();
  const navigate = useNavigate();

  // Check if profileData exists, and navigate to the root page if it does.
  useEffect(() => {
    if (profileData) {
      navigate("/");
    }
  }, [profileData, navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFormData({ ...formData, picture: selectedFile });
      setSelectedImageName(selectedFile.name); // Set the selected image name
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "https://conext.in/custom_users/api/create_staff_profile/",
        formDataToSend,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.data) {
        localStorage.setItem("profileData", JSON.stringify(response.data.data));
        setProfileData(response.data.data);
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        // If there's a response from the server, show the server's error message
        setError(error.response.data.user[0]);
      } else {
        setError(
          "An error occurred while creating the profile. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to skip the form
  const handleSkip = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} className="p-4">
          <Typography variant="h4">Create Staff Profile</Typography>
          <form onSubmit={handleSubmit} className="mt-5">
            <Grid container spacing={2}>
              <Grid item xs={12} className="flex justify-center items-center">
                {selectedImageName && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(formData.picture)}
                      alt="Selected Profile"
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="dob"
                  label="Date of Birth"
                  type="date"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder=""
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="mobile"
                  label="Mobile"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="department"
                  label="Department"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={handleInputChange}
                  defaultValue="1"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="designation"
                  label="Designation"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={handleInputChange}
                  defaultValue="1"
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  id="picture"
                  onChange={handleFileChange}
                />
                <label htmlFor="picture">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<AddPhotoAlternateIcon />}
                  >
                    Upload Profile Picture
                  </Button>
                </label>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="address"
                  label="Address"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="emergency_contact"
                  label="Emergency Contact"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="blood_group"
                  label="Blood Group"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                {error && (
                  <Typography variant="body2" color="error">
                    {error}
                  </Typography>
                )}
                <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  onClick={handleSkip}
                >
                  Skip
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading} // Disable the button when loading is true
                >
                  {loading ? "Creating..." : "Create Profile"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default StaffProfileForm;
