import { useNavigate } from "react-router-dom";

interface CategoryProps {
    id: number;
    name: string;
}

const Category: React.FC<CategoryProps> = ({ id, name }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/categories/${id}/${name}`);
    }

    return (
        <div onClick={handleClick} className="CategoryCard">
            <p className="name">{name}</p>
        </div>
    );
}

export default Category;