import { useAuth } from "../store/authStore";
import { useState, useEffect } from "react";
import { getOrderDetails } from "../api/orders";
import { checkState } from "../api/auth";
import Detail from "./Detail";

interface OrderProps {
    id: number;
    name: string;
    total: number;
    state: number;
    created_at: string;
}

const Order: React.FC<OrderProps> = ({ id, name, total, state, created_at }) => {    
    const [orderDetails, setOrderDetails] = useState<any>()
    const [seen, setSeen] = useState(false);
    const [stateName, setStateName] = useState<any>();
    const { token } = useAuth()    

    const handleGetDetails = async () => {
        try {
            const response = await getOrderDetails(token, id)
            setOrderDetails(response)            
        } catch (error) {
            alert(error)
        }
    }

    const handleCheckState = async () => {
        try {
            const response = await checkState(state)
            console.log(response)
            setStateName(response.state)
        } catch (error) {
            alert(error)
        }
    }

    const handleCancelOrder = async () => {
        try {
            // Cancel order logic here
            alert("Order cancelled.")
        } catch (error) {
            console.error("Failed to cancel order:", error)
        }
    }
    
    const toggle = () => {
        if (seen) {
            handleGetDetails()
        }
        setSeen(!seen)
    }

    useEffect(() => {
        handleGetDetails();
        handleCheckState();
    }, [])

    return (
        <div className="order-card">
            <h3>{name}</h3>
            <p>Total: {total}</p>
            <p>State: {stateName?.state_name}</p>    
            <p>{created_at}</p>       
            <button onClick={handleCancelOrder}>Cancel order</button>
            <button onClick={toggle}>{seen ? "Hide" : "Show"} details</button>
            <div className="details-container">
                {seen && orderDetails && orderDetails.map((detail: any) => (
                    <Detail key={detail.ProductID} product_id={detail.ProductID} quantity={detail.quantity} />
                ))}
            </div>            
        </div>
    )
}

export default Order