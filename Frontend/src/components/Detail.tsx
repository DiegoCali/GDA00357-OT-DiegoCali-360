import { useAuth } from "../store/authStore";
import { getProductById } from "../api/products";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface DetailProps {
    product_id: number;
    quantity: number;
}

const Detail: React.FC<DetailProps> = ({ product_id, quantity }) => {
    const [product, setProduct] = useState<any>();
    const { token } = useAuth();
    const navigate = useNavigate();

    const handleGetProduct = async () => {
        try {
            const response = await getProductById(token, product_id);
            setProduct(response);
        } catch (error) {
            alert(error);
        }
    }

    const handleClickProduct = (id: number) => {
        navigate(`/product/${id}`);
    }

    useEffect(() => {
        handleGetProduct();
    }, []);

    return (
        <div className="cart-product-card" key={product?.ProductID}>
            <img src={product?.picture} alt={product?.product_name} />
            <div className="cart-product-info" onClick={() => handleClickProduct(product?.ProductID)}>
                <h3>{product?.product_name}</h3>
                <p>Price: {product?.price}</p>                                                    
            </div>
            <div className="cart-product-quantity">
                <p>Quantity: {quantity}</p>                                                    
            </div>            
        </div>
    )
}

export default Detail