import { useAuth } from "../store/authStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductById } from "../api/products";

export default function CartPage() {
    const { token, role, cart, removeFromCart } = useAuth();   
    const [products, setProducts] = useState<any[]>([]); 
    const navigate = useNavigate();

    const handleGetCart = async () => {
        try {
            // Get cart logic here     
            setProducts([]);                   
            for (let i = 0; i < cart.length; i++) {
                const response = await getProductById(token, cart[i].id);                            
                setProducts((prev) => [...prev, response]);
            }                                               
        } catch (error) {
            console.error("Failed to get cart:", error);
            alert(error);
        }
    }

    const handleRemoveFromCart = async (product: number) => {
        try {
            // Remove from cart logic here
            removeFromCart(product);
            alert("Product removed from cart.");            
        } catch (error) {
            console.error("Failed to remove from cart:", error);
        }
    }

    const handleClickProduct = (id: number) => {
        navigate(`/product/${id}`);
    }

    const handleCheckout = async () => {
        try {
            // Checkout logic here
            alert("Checkout successful.");
        } catch (error) {
            console.error("Failed to checkout:", error);
        }
    }

    useEffect(() => {
        cart.forEach((item) => {
            console.log(item);
        })
        handleGetCart();
        products.forEach((product) => {
            console.log(product);
        });
    }, []);

    return (
        <div>                                
            {token ? (                    
                <div>
                    <h1>Cart</h1>
                    <div className="CartContainer">
                        {
                            role === 2 && (
                                <div>
                                    <h2>Products</h2>
                                    {
                                        products.map((product) => (
                                            <div className="cart-product-card" key={product.ProductID} onClick={() => handleClickProduct(product.ProductID)}>
                                                <img src={product.picture} alt={product.product_name} />
                                                <div className="cart-product-info">
                                                    <h3>{product.product_name}</h3>
                                                    <p>Price: {product.price}</p>                                                    
                                                </div>
                                                <div className="cart-product-quantity">
                                                    <p>Quantity: {cart.find((item) => item.id === product.ProductID)?.quantity}</p>                                                    
                                                </div>
                                                <button onClick={() => handleRemoveFromCart(product.ProductID)}>Remove from Cart</button>
                                            </div>
                                        ))
                                    }                                    
                                    <button onClick={handleCheckout}>Checkout</button>                                       
                                </div>
                            )
                        }
                    </div>
                </div>                                                                          
            ) : (
                <span>You are not logged in.</span>
            )}            
        </div>   
    );
}