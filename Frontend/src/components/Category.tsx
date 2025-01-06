import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";
import { deleteCategory } from "../api/categories";

interface CategoryProps {
    id: number;
    name: string;      
}

const Category: React.FC<CategoryProps> = ({ id, name }) => {
    const navigate = useNavigate();
    const { token, role } = useAuth();

    const handleClick = () => {        
        navigate(`/categories/${id}/${name}`);        
    }

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            deleteCategory(token, id)
            .then(() => {
                alert("Category deleted.");
                navigate("/categories");
            })
            .catch((error) => {
                alert("Failed to delete category: " + error);
            });
        }
    }    

    return (
        <div>
            <div onClick={handleClick} className="CategoryCard">
                <p className="name">{name}</p>            
            </div> 
            {
                role === 1 && (
                    <button onClick={handleDelete}>Delete</button>                    
                )
            }           
        </div>
    );
}

export default Category;