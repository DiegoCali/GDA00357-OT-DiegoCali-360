import { useAuth } from "../store/authStore";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, getCustomerData, deleteUser } from "../api/users";
import EditUsersPopup from "./EditUsersPopup";

export default function UserContentPage() {
    const { token } = useAuth();
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<any>();
    const [client, setClient] = useState<any>();
    const [seen, setSeen] = useState(false);
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const response = await getUserById(token, parseInt(id||"-1"));
            setUser(response);                
           console.log("User:", response[0]);
            if (response.RoleID === 2) {
                fetchCustomer(parseInt(response.CustomerID));
            }
        } catch (error) {
            alert(error);
        }
    };    

    const fetchCustomer = async (id: number) => {
        try {
            const response = await getCustomerData(token, id);
            setClient(response);
            console.log("Client:", response);
        } catch (error) {
            alert(error);
        }
    };    

    const handleDeleteUser = async () => {
        try {
            if (window.confirm("Are you sure you want to delete this user?")) {
                await deleteUser(token, user.UserID);
                alert("User deleted successfully");
                navigate("/users");
            }
        } catch (error) {
            alert(error);
        }
    }
    
    const toggle = () => {
        if (seen) {
            fetchUser();
        }
        setSeen(!seen);
    }

    useEffect(() => {
        fetchUser();        
    }, []);

    return (
        <div className="profile-container">
            <h2 className="profile-name">{user?.user_name}</h2>
            <p className="profile-role">{
                user?.RoleID === 1 ? "Operator" : "Customer"
            }</p>
            <div className="profile-info">
                <p><span>State:</span> {
                    user?.StateID === 5 ? "Active" : "Inactive"
                }</p>
                <p><span>Email:</span> {user?.email}</p>
                <p><span>Username:</span> {user?.user_name}</p>
                <p><span>Phone:</span> {user?.phone}</p>
                <p><span>Birthdate:</span> {user?.birth_date}</p>
                <p><span>Creation Date:</span> {user?.creation_date}</p>                   
                {
                    client && (
                        <div className="client-info">
                            <h3>Customer Data</h3>
                            <p><span>Company Name</span> {client.company_name}</p>
                            <p><span>Comercial Name</span> {client.comercial_name}</p>
                            <p><span>Phone:</span> {client.phone}</p>
                            <p><span>Address:</span> {client.delivery_address}</p>                            
                            <p><span>Email:</span> {client.email}</p>
                        </div>
                    )
                }   
                <button onClick={toggle}>Edit</button>    
                <button onClick={handleDeleteUser}>Delete</button>
            </div>
            {
                seen && (
                    <EditUsersPopup toggle={toggle} id={user?.UserID} />
                )
            }
        </div>
    );
}

