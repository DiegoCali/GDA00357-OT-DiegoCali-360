import { useNavigate } from "react-router-dom";

interface CategoryProps {
    id: number;
    name: string;
}

const Category: React.FC<CategoryProps> = ({ id, name }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/categories/${id}`);
    }

    return (
        <div onClick={handleClick}>
            <h3>{name}</h3>
        </div>
    );
}

export default Category;