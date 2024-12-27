import { useAuth } from "../store/authStore";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getCategories } from "../api/categories";
import Category from "../components/Category";

export default function CategoryPage() {
    const [categoriesData, setCategoriesData] = useState([]);
    const { token, role } = useAuth();    

    const handleGetCategories = async () => {
        try {
            const response = await getCategories(token);
            console.log(response);
            setCategoriesData(response);
        } catch (error) {
            console.error("Failed to get categories:", error);
        }
    }

    useEffect(() => {
        handleGetCategories();
    }, []);

    return (
        <div>
            <h1>Category Page</h1>            
            <p>
                {token ? (
                    role === 1 ? (
                        <div>
                            <h2>Categories</h2>
                            {categoriesData.map((category: any) => (
                                <Category 
                                    id={category.CategoryID}
                                    name={category.category_name}                                    
                                 />
                            ))}
                            <NavLink to="/new-category">Add Category</NavLink>
                        </div>                        
                    ) : (                        
                        <span>You are not authorized to view this page.</span>
                    )                                   
                ) : (
                    <span>You are not logged in.</span>
                )}
            </p>
        </div>   
    );
}