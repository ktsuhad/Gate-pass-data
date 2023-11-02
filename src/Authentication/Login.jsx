import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setToken } = useAuth(); //context provider

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { username: "", password: "" } });

  const onSubmit = async (formData) => {
    setLoading(true);

    try {
      const response = await axios.post(
        "https://conext.in/custom_users/api/login/",
        formData
      );

      if (response.data.status) {
        localStorage.setItem('token', response.data.token); // Save the token in localStorage
        setToken(response.data.token); // Save the token
        navigate("/staff-profile", { replace: true });
      } else {
        console.log("Login failed. Please check your credentials.");
        setError(
          "The email address or password you entered is incorrect. Please check your credentials and try again."
        );
      }
    } catch (error) {
      console.error(error);
      setError(error.response.data.non_field_errors[0]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-xl ring-1 ring-gray-900/5 text-black w-full">
          <h1 className="mb-8 text-3xl text-center font-semibold">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                id="username"
                variant="outlined"
                label="Username"
                type="email"
                className="w-full"
                {...register("username", {
                  required: "Username is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
                })}
                error={!!errors.username}
                helperText={errors.username?.message}
              />
              <div className="relative">
                <TextField
                  id="password"
                  variant="outlined"
                  label="Password"
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
                  <Tooltip title={showPassword ? "Hide" : "Show"}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </Tooltip>
                </div>
              </div>
              {error && <span className="text-red-600 text-sm">{error}</span>}
              <Link
                to="/reset"
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </Link>
              <p className="text-start mt-4 text-sm">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  Register
                </Link>
              </p>
              <Button
                variant="contained"
                color="success"
                type="submit"
                className="w-full"
                disabled={loading} // Disable the button when loading
              >
                {loading ? (
                  <CircularProgress size={24} color="primary" /> // Show loading indicator
                ) : (
                  "Sign in"
                )}
              </Button>
            </Stack>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
