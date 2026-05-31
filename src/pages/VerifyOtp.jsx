import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Register.css";

function VerifyOtp({ otpEmail, setPage }) {

    const [otp, setOtp] = useState("");

    const handleVerifyOtp = async () => {

        try {

            const response = await axios.post(
                "https://employee-management-system-java-eda7.onrender.com/auth/verify-otp",
                {
                    email: otpEmail,
                    otp
                }
            );

            toast.success(response.data);
            localStorage.setItem("authenticated", "true");
            setPage("dashboard");

            setOtp("");

        } catch (error) {

            console.error(error);

            toast.error("OTP Verification Failed");
        }
    };

    return (
        <div className="container">

            <div className="card">

                <h1 className="title">
                    Verify OTP
                </h1>

                <input
                    className="input"
                    type="email"
                    value={otpEmail}
                    disabled
                />

                <input
                    className="input"
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />

                <button
                    className="button"
                    onClick={handleVerifyOtp}
                >
                    Verify OTP
                </button>

            </div>

        </div>
    );
}

export default VerifyOtp;