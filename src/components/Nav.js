import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../contexts/User";

export default function Nav() {
    const { user } = useContext(userContext);
    return (
        <div className="nav">
            <div>
                <Link to={'/'} className='header-link'><h1 className="header">NEWS</h1></Link>
            </div>
            <p className="logged-in-user">{user.username}</p>
            <div className="nav-links">
                <Link className="link" to={'/users'}>users</Link>
                <Link className="link" to={'/topics/:topic'}>topics</Link>
            </div>
        </div>
    )
}