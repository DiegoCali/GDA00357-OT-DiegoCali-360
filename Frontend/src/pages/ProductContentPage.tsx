import { useAuth } from "../store/authStore";
import { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { getProductById } from "../api/products";

export default function ProductContentPage() {
    const { id } = useParams<{ id: string }>();
    const [productData, setProductData] = useState<any>({});
    const [quantity, setQuantity] = useState(0);
    const { token, role, addToCart} = useAuth();
    const navigate = useNavigate();

    const handleGetProduct = async () => {
        try {
            const response = await getProductById(token, parseInt(id || "-1"));
            console.log(response);
            setProductData(response);
        } catch (error) {
            alert(error);
            navigate("/categories");
        }
    }

    const handleAddToCart = async () => {
        try {
            // Add to cart logic here
            alert("Product added to cart.");
            addToCart(productData.ProductID, quantity);           
        } catch (error) {
            console.error("Failed to add to cart:", error);
        }
    }

    useEffect(() => {
        handleGetProduct();
    }, []);

    return (
        <div className="product-profile">
            <h1>{productData.product_name}</h1>
            <div className="product-details">
                <h2>Details</h2>
                <div className="product-info">
                    <img src={productData.picture} alt={productData.product_name} />
                    <div>
                        <p>Price: {productData.price}</p>
                        <p>Stock: {productData.stock}</p>
                        <p>Brand: {productData.brand}</p>
                        <p>Code: {productData.code}</p>                    
                        <p>State: {productData.StateID}</p>
                        {
                            role === 1 && (
                                <p>Created: {productData.creation_date}</p>
                            )
                        }                        
                    </div>
                    {
                        role === 1 && (
                            <div className="navlink-button">
                                <NavLink to={`/edit-product/${id}`}>Edit Product</NavLink>
                            </div>
                        )
                    }
                    {
                        role === 1 && (
                            <div className="navlink-button">
                                <NavLink to={`/delete-product/${id}`}>Delete Product</NavLink>
                            </div>
                        )
                    }
                    {
                        role === 2 && (
                            <div>
                                <label>Quantity:</label>
                                <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
                            </div>                          
                        )
                    }
                    {
                        role === 2 && (
                            <button onClick={handleAddToCart}>Add to Cart</button>
                        )
                    }                
                </div>
            </div>
        </div>
    );
}