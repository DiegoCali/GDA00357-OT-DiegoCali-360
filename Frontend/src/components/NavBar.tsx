import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";

export default function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { token, role, cart, logout } = useAuth();

    const handleLogout = () => {
        logout();
        alert("You have been logged out.");
        navigate("/login");
    }

    return (
        <div className="navbar-container">
            <ul>
                {
                    location.pathname !== "/" && location.pathname !== "/login" &&(
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
                {
                    location.pathname !== "/cart" && (
                        role === 2 && (
                            <li>
                                <NavLink to="/cart">Cart{
                                    cart.length > 0 && (
                                        <span>({cart.length})</span>
                                    )
                                }</NavLink>                                
                            </li>
                        )
                    )
                }              
                {
                    location.pathname !== "/history" && (
                        role === 2 && (
                            <li>
                                <NavLink to="/history">History</NavLink>
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