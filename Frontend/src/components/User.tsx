import { useNavigate } from "react-router-dom";

interface UserProps {
    id: number;
    name: string;
    email: string;
}

const User: React.FC<UserProps> = ({ id, name, email }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/user/${id}`);
    };

    return (
        <div onClick={handleClick}>
            <h3>{name}</h3>
            <p>{email}</p>
        </div>
    );
};

export default User;