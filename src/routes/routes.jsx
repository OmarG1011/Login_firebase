import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "../components/login/login";
import { Home } from "../components/home/home";
import { Signup } from "../components/Signup/Signup";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
export function Myroute() {
    const [userName, setuserName] = useState([]);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setuserName(user.displayName);
            }
            else
                setuserName("");
        })

    }, [])
    return (
        <Router basename="/Login_firebase/">
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/home" element={<Home name={userName} />} />
                <Route exact path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    )

}