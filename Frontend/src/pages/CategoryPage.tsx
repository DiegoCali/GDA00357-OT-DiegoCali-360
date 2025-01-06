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
            <p>
                {token ? (                    
                    <div>
                        <h2>Categories</h2>
                        <div className="CategoryContainer">
                        {categoriesData.map((category: any) => (                            
                            <Category 
                                id={category.CategoryID}
                                name={category.category_name}                                                       
                                />
                        ))}
                        </div>
                        {role === 1 &&
                            <div className="navlink-button">
                                <NavLink to="/new-category">Add Category</NavLink>
                            </div>    
                        }            
                    </div>                                                                          
                ) : (
                    <span>You are not logged in.</span>
                )}
            </p>
        </div>   
    );
}