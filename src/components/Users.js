import { useState, useEffect, useContext } from "react";
import { userContext } from "../contexts/User";
import { getUsers } from "../utils/Api";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { setUser } = useContext(userContext);
    
    useEffect(() => {
        getUsers().then(usersData => {
            setUsers(usersData);
            setLoading(false);
        })
    }, []);

    return loading ? (<h2 className="loading">Loading...</h2>) : (
        <ul className="users">
            {
                users.map(user => {
                    return <li className="user" key={user.username}>
                        <img src={user.avatar_url} alt="user img" className="user-avatar" />
                        <p className="user-fullname">{user.name}</p>
                        <button className="username login-btn" onClick={() => setUser(user)}>Login</button>
                    </li>
                })
            }
        </ul>
    )
}