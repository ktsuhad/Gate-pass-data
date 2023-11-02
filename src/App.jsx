import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Verify from "./Authentication/Verify_Email";
import Register from "./Authentication/Register";
import Login from "./Authentication/Login";
import StaffProfileForm from "./Profile/StaffProfileForm";
import GatePassData from "./Screen/Home/GatePassData";
import { useAuth } from "./Context/AuthContext";
import StaffProfile from "./Profile/StaffProfile";
import NotFound from "./Components/NotFound";

const App = () => {
  const { isVerified, token } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={token ? <GatePassData /> : <Navigate to="/register" />}
        />

        <Route
          path="/profile"
          element={token ? <StaffProfile /> : <Navigate to="/login" />}
        />
        <Route
          path="/staff-profile"
          element={token ? <StaffProfileForm /> : <Navigate to="/login" />}
        />

        {isVerified ? (
          <>
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          <Route path="/register" element={<Verify />} />
        )}

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
