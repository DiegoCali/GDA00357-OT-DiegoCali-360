import { useAuth } from "../store/authStore";
import { useEffect, useState } from "react";
import { getUsers } from "../api/users";
import { NavLink } from "react-router-dom";
import User from "../components/User";

export default function UsersPage() {
    const [usersData, setUsersData] = useState([]);
    const { token, role } = useAuth();    

    const handleGetUsers = async () => {
        try {
            const response = await getUsers(token);
            console.log(response);
            setUsersData(response);
        } catch (error) {
            console.error("Failed to get users:", error);
        }
    }

    useEffect(() => {
        handleGetUsers();
    }, []);

    return (
        <div>                  
            <p>
                {token ? (
                    role === 1 ? (
                        <div>
                            <h2>Users</h2>
                            <div className="UserContainer">
                            {usersData.map((user: any) => (
                                <User 
                                    id={user.UserID}
                                    name={user.user_name}
                                    email={user.email}                                    
                                 />
                            ))}
                            </div>
                            <div className="navlink-button">
                                <NavLink to="/new-user/customer">Create Customer</NavLink>                            
                            </div>
                            <div className="navlink-button">
                                <NavLink to="/new-user/operator">Create Operator</NavLink>
                            </div>
                        </div>
                    ) : (                        
                        <span>You are not authorized to view this page.</span>
                    )                    
                ) : (
                    <span>You are not logged in.</span>
                )}
            </p>
        </div>   
    );
}