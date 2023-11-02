import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false); // Show/hide password
  const [loading, setLoading] = useState(false); // Loading state
  const [error, seterror] = useState(null)

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { password: "", email: "", organization: "1", otp: "" },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://conext.in/custom_users/api/register/",
        {
          password: data.password,
          email: data.email,
          organization: data.organization,
          otp: data.otp,
        }
      );

      if (response.data.Emailed) {
        navigate("/login");
      }
    } catch (error) {
      // Handle API request error (e.g., display an error message)
      seterror(error.message)
      console.error("Error registering user", error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-xl ring-1 ring-gray-900/5 text-black w-full">
          <h1 className="mb-8 text-3xl text-center font-semibold">
            Register User
          </h1>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                type="email"
                className="w-full"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <div className="relative">
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  className="w-full"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    maxLength: {
                      value: 10,
                      message: "Password can't be more than 10 characters",
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3 right-3 opacity-75"
                >
                  <Tooltip title={showPassword ? "off" : "on"}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </Tooltip>
                </div>
              </div>
              <TextField
                id="otp"
                label="OTP"
                variant="outlined"
                type="text"
                className="w-full"
                {...register("otp")}
              />
              {
                error && <span className="text-red-600">{error}</span>
              }
              <Button
                variant="contained"
                color="success"
                type="submit"
                className="w-full space-y-10"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Register User"
                )}
              </Button>
            </Stack>
          </form>

          <div className="text-center text-sm text-gray-500 mt-4">
            By registering, you agree to the
            <span className="no-underline border-b border-grey-dark text-grey-dark">
              Terms of Service and Privacy Policy
            </span>
          </div>
        </div>

        <div className="text-grey-dark mt-6 text-base tracking-wide font-serif">
          Already have an account?
          <Link
            to={"/login"}
            className="no-underline border-b border-blue text-blue-500"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
