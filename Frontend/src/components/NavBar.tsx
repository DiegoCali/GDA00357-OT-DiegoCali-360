import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";

export default function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { token, role, logout } = useAuth();

    const handleLogout = () => {
        logout();
        alert("You have been logged out.");
        navigate("/login");
    }

    return (
        <div className="navbar-container">
            <ul>
                {
                    location.pathname !== "/" && (
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                    )                   
                }
                {
                    location.pathname !== "/categories" && (
                        role === 1 && (
                            <li>
                                <NavLink to="/categories">Categories</NavLink>
                            </li>
                        )
                    )                   
                }
                {
                    location.pathname !== "/users" && (
                        role === 1 && (
                            <li>
                                <NavLink to="/users">Users</NavLink>
                            </li>
                        )
                    )
                }
                {token ? (
                    <li>
                        <NavLink to="/" onClick={handleLogout}>Logout</NavLink>                    
                    </li>
                ) : (
                    <li>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                )}
            </ul>
        </div>
    );
}