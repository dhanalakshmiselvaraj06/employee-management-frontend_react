import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Register.css";

function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {

        try {

            const response = await axios.post(
                "http://localhost:8080/auth/register",
                {
                    email,
                    password
                }
            );

            toast.success("Registration Successful");
            setEmail("");
            setPassword("");

            console.log(response.data);

        } catch (error) {

            console.error(error);

            toast.error("Registration Failed");
        }
    };

    return (
    <div className="container">

        <div className="card">

            <h1 className="title">
                Register
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
                onClick={handleRegister}
            >
                Register
            </button>

            <p
                style={{
                    marginTop: "20px",
                    textAlign: "center"
                }}
            >
                Already have an account?
                <span
                    style={{
                        color: "#243b55",
                        cursor: "pointer",
                        fontWeight: "bold",
                        marginLeft: "5px"
                    }}
                >
                    Sign In
                </span>
            </p>

        </div>

    </div>
);
}

export default Register;