import { useAuth } from "../store/authStore";
import { useEffect, useState } from "react";
import { getProducts } from "../api/categories";
import { useParams, NavLink } from "react-router-dom";
import Product from "../components/Product";

export default function CategoryContentPage() {
    const { id, name } = useParams<{ id: string, name: string }>();
    const [productsData, setProductsData] = useState([]);
    const { token, role } = useAuth();

    const handleGetProducts = async () => {
        try {
            const response = await getProducts(token, parseInt(id||"-1"));
            console.log(response);
            setProductsData(response);
        } catch (error) {
            console.error("Failed to get products:", error);
        }
    }

    useEffect(() => {
        handleGetProducts();
    }, []);

    return (
        <div>
            <h1>{name}</h1>
            <p>
                {token ? (
                    <div>
                        <h2>Products</h2>
                        <div className="ProductContainer">
                        {productsData.map((product: any) => (
                            <Product
                                id={product.ProductID}
                                name={product.product_name}
                                price={product.price}
                                stock={product.stock}
                                img={product.picture}
                            />
                        ))}
                        </div>
                        { role === 1 &&
                            <div className="navlink-button">
                                <NavLink to={`/new-product/${id}/${name}`}> Add Product </NavLink>  
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


