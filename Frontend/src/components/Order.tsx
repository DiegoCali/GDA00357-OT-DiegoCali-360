import { useAuth } from "../store/authStore";
import { useState } from "react";
import { getOrderDetails } from "../api/orders";

interface OrderProps {
    id: number;
    name: string;
    total: number;
    state: number;
}

const Order: React.FC<OrderProps> = ({ id, name, total, state }) => {    
    const [orderDetails, setOrderDetails] = useState<any>()
    const { token } = useAuth()    

    const handleGetDetails = async () => {
        try {
            const response = await getOrderDetails(token, id)
            setOrderDetails(response)            
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div>
            <h3>{name}</h3>
            <p>{total}</p>
            <p>{state}</p>
            <button onClick={handleGetDetails}>Details</button>
            <div>
                {orderDetails && orderDetails.map((detail: any) => (
                    <p key={detail.ProductID}>{detail.price} - {detail.quantity}</p>
                ))}
            </div>            
        </div>
    )
}

export default Order