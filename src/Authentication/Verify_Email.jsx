import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Verify = () => {
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null); // New error state
  const { setIsVerified } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setloading(true);
      const response = await axios.post(
        "https://conext.in/custom_users/api/verify_email/",
        {
          email_address: data.email,
          org: "1",
        }
      );

      if (response.data.Emailed) {
        setIsVerified(true);
        navigate("/register", { replace: true });
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      // Handle network or other errors and set the error state
      setError("An error occurred during email verification");
      console.error("An error occurred during email verification", error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm  mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-xl ring-1 ring-gray-900/5 text-black w-full">
          <h1 className="mb-8 text-3xl text-center font-semibold">
            Verify Email
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
                    value: /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              {error && <span className="text-red-600 text-sm">{error}</span>} {/* Display the error message */}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Verify Email"
                )}
              </Button>
              <div className="text-grey-dark mt-6 text-base tracking-wide font-serif">
                Already have an account?
                <Link
                  to={"/login"}
                  className="no-underline border-b border-blue text-blue-500"
                >
                  Log in
                </Link>
              </div>
            </Stack>
          </form>
        </div>

        <div className="text-center text-sm text-gray-500 mt-4">
          By clicking "Verify Email," you agree to our
          <span className="no-underline border-b border-grey-dark text-grey-dark">
            Terms of Service
          </span>
          and
          <span className="no-underline border-b border-grey-dark text-grey-dark">
            Privacy Policy
          </span>
        </div>
      </div>
    </div>
  );
};

export default Verify;
