import { useNavigate } from "react-router-dom";

interface UserProps {
    id: number;
    name: string;
    email: string;
}

const User: React.FC<UserProps> = ({ id, name, email }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/users/${id}`);
    };

    return (
        <div onClick={handleClick} className="UserCard">
            <p className="name">{name}</p>
            <p className="email">{email}</p>
        </div>
    );
};

export default User;