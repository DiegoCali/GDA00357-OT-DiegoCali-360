import { useAuth } from "../store/authStore";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, deleteProduct } from "../api/products";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import EditProductPopup from "./EditProductPopup";

export default function ProductContentPage() {
    const schema = yup.object().shape({
        quantity: yup.number().required().min(1),
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const { id } = useParams<{ id: string }>();
    const [productData, setProductData] = useState<any>({});    
    const { token, role, addToCart} = useAuth();
    const [seen, setSeen] = useState(false);
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

    const handleAddToCart = async (data: any) => {
        try {
            // Add to cart logic here
            if ( data.quantity > productData.stock) {
                alert("Quantity exceeds stock.");
                return;
            }
            addToCart(productData.ProductID, parseInt(data.quantity));
            alert("Product added to cart.");
        } catch (error) {
            console.error("Failed to add to cart:", error);
        }
    }

    const handleDeleteProduct = async () => {
        try {
            if (window.confirm("Are you sure you want to delete this product?")) {
                await deleteProduct(token, productData.ProductID);
                alert("Product deleted successfully");
                navigate("/categories");
            }
        } catch (error) {
            alert(error);
        }
    }

    const toggle = () => {
        if (seen) {
            handleGetProduct();
        }
        setSeen(!seen);        
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
                                <button onClick={toggle}>Edit Product</button>                                                                    
                            )
                        }       
                        {
                            role === 1 && (                                
                                <button onClick={handleDeleteProduct}>Delete Product</button>                                                                    
                            )
                        }                 
                        <form onSubmit={handleSubmit(handleAddToCart)}>
                        {
                            role === 2 && (
                                <div>
                                    <label>Quantity:</label>
                                    <input type="number" {...register("quantity")} />
                                    <p className="error-message">{errors.quantity?.message}</p>
                                </div>                          
                            )
                        }
                        {
                            role === 2 && (
                                <button type="submit">Add to Cart</button>
                            )
                        }                                        
                        </form>
                    </div>
                </div>         
                {seen && <EditProductPopup id={productData.ProductID} toggle={toggle} />}   
        </div>
    );
}