import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../contexts/User";
import Header from "./Header";

export default function Nav() {
    const { user } = useContext(userContext);
    return (
        <div className="nav">
            <Link className="header-link" to={'/'}><Header /></Link>
            <p className="logged-in-user">{user.username}</p>
            <div className="nav-links">
                <Link className="link" to={'/users'}>users</Link>
                <Link className="link" to={'/topics/:topic'}>topics</Link>
            </div>
        </div>
    )
}