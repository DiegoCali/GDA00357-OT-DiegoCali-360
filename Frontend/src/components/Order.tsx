import { useAuth } from "../store/authStore";
import { useState, useEffect } from "react";
import { getOrderDetails } from "../api/orders";
import { checkState } from "../api/auth";
import { confirmOrder, deliverOrder, cancelOrder } from "../api/orders";
import { useNavigate } from "react-router-dom";
import Detail from "./Detail";

interface OrderProps {
    id: number;
    name: string;
    total: number;
    state: number;
    created_at: string;
    delivered_at?: string;
}

const Order: React.FC<OrderProps> = ({ id, name, total, state, created_at, delivered_at }) => {    
    const [orderDetails, setOrderDetails] = useState<any>()
    const [seen, setSeen] = useState(false);
    const [stateName, setStateName] = useState<any>();
    const { token, role } = useAuth();
    const navigate = useNavigate();     

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
            if (window.confirm("Are you sure you want to cancel this order?")) {
                await cancelOrder(token, id)
                alert("Order canceled.")
                navigate("/", { replace: true })
            }                        
        } catch (error) {
            console.error("Failed to cancel order:", error)
        }
    }

    const handleConfirmOrder = async () => {
        try {
            await confirmOrder(token, id)
            alert("Order confirmed.")
            navigate("/", { replace: true })
        } catch (error) {
            console.error("Failed to confirm order:", error)
        }
    }

    const handleDeliverOrder = async () => {
        try {
            const body = {
                delivery_date: new Date().toISOString()
            }
            await deliverOrder(token, id, body)
            alert("Order delivered.")
            navigate("/", { replace: true })
        } catch (error) {
            console.error("Failed to deliver order:", error)
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
            <p>Created: {created_at.split("T")[0]}</p>   
            {delivered_at && <p>Delivered: {delivered_at}</p>} 
            {
                role === 1 && state === 2 && (
                    <button onClick={handleConfirmOrder}>Confirm order</button>
                )
            }   
            {
                role === 1 && state === 1 && (
                    <button onClick={handleDeliverOrder}>Deliver order</button>
                )
            }
            {
                state !== 4 && state !== 3 && (
                    <button onClick={handleCancelOrder}>{role === 1 ? "Discard" : "Cancel" } order</button>
                )
            }            
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