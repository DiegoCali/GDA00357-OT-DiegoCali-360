import { useAuth } from "../store/authStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../api/users";

export default function UserContentPage() {
    const { token } = useAuth();
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<any>();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUserById(token, parseInt(id||"-1"));
                setUser(response);
                /*
                Now user is:
                {
                    UserID: ,
                    RoleID: ,
                    StateID:,
                    email: ,
                    user_name: ,
                    user_password: ,
                    phone: ,
                    birth_date: ,
                    creation_date: ,
                    CustomerID: 
                }
                */
               console.log("User:", response[0]);
            } catch (error) {
                alert(error);
            }
        };
        fetchUser();
    }, [token, id]);

    return (
        <div className="profile-container">
            <h2 className="profile-name">{user?.user_name}</h2>
            <p className="profile-role">{user?.RoleID}</p>
            <div className="profile-info">
                <p><span>State:</span> {user?.StateID}</p>
                <p><span>Email:</span> {user?.email}</p>
                <p><span>Username:</span> {user?.user_name}</p>
                <p><span>Phone:</span> {user?.phone}</p>
                <p><span>Birthdate:</span> {user?.birth_date}</p>
            </div>
        </div>
    );
}

