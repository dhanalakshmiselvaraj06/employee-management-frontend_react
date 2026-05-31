import { useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";

import Dashboard from "./pages/Dashboard";

function App() {

  const [page, setPage] = useState("register");

  const [otpEmail, setOtpEmail] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  return (

  <div className={darkMode ? "dark" : ""}>
    {
      page === "register"
        && <Register />
    }

    {
      page === "login"
        && (
          <Login
            setPage={setPage}
            setOtpEmail={setOtpEmail}
          />
        )
    }

    {
      page === "otp"
        && (
          <VerifyOtp
  otpEmail={otpEmail}
  setPage={setPage}
/>
        )
    }
    {
  page === "dashboard"
    && <Dashboard />
}

    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        display: "flex",
        gap: "10px"
      }}
    >

      <button
        className="nav-button"
        onClick={() => setPage("register")}
      >
        Register
      </button>

      <button
        className="nav-button"
        onClick={() => setPage("login")}
      >
        Login
      </button>
      <button
    className="nav-button"
    onClick={() => setDarkMode(!darkMode)}
>
    {
        darkMode
            ? "Light Mode"
            : "Dark Mode"
    }
</button>

    </div>

    <ToastContainer />

  </div>
);
}

export default App;