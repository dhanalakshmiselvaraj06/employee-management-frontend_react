import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Register.css";


function Login({ setPage, setOtpEmail }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

   const handleLogin = async () => {

    try {

        await axios.post(
            "https://employee-management-system-java-eda7.onrender.com/auth/login",
            {
                email,
                password
            }
        );

        toast.success("Login Successful");

        localStorage.setItem("authenticated", "true");

        setPage("dashboard");

    } catch (error) {

        console.error(error);

        toast.error("Login Failed");
    }
};


    return (
        <div className="container">

            <div className="card">

                <h1 className="title">
                    Login
                </h1>

                <input
                    className="input"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="input"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="button"
                    onClick={handleLogin}
                >
                    Login
                </button>

            </div>

        </div>
    );
}

export default Login;