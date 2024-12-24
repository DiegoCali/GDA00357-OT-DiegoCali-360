import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";

export default function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { token, logout } = useAuth();

    const handleLogout = () => {
        logout();
        alert("You have been logged out.");
        navigate("/login");
    }

    return (
        <nav>
            <ul>
                <li>
                    {
                        location.pathname !== "/" && (
                            <NavLink to="/">Home</NavLink>
                        )
                    }
                </li>
                <li>
                    {
                        location.pathname !== "/about" && (
                            <NavLink to="/about">About</NavLink>
                        )
                    }
                </li>
                <li>
                    {
                        location.pathname !== "/contact" && (
                            <NavLink to="/contact">Contact</NavLink>
                        )
                    }
                </li>
                {token ? (
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                ) : (
                    <li>
                        <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>Login</NavLink>
                    </li>
                )}
            </ul>
        </nav>
    );
}