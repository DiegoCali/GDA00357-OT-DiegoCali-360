import { useAuth } from "../store/authStore";
import { useEffect, useState } from "react";
import { getOrders } from "../api/orders";
import Order from "../components/Order";


export default function MainPage() {
    const [ordersData, setOrdersData] = useState([]);
    const { token, role } = useAuth();    

    const handleGetOrders = async () => {
        try {
            const response = await getOrders(token);
            console.log(response);
            setOrdersData(response);
        } catch (error) {
            console.error("Failed to get orders:", error);
        }
    }

    useEffect(() => {
        handleGetOrders();
    }, []);

    return (
        <div>
            <h1>Main Page</h1>            
            <p>
                {token ? (
                    role === 1 ? (
                        <div>
                            <h2>Orders</h2>
                            {ordersData.map((order: any) => (
                                <Order 
                                    id={order.OrderId}
                                    name={order.order_name}
                                    total={order.total_price}
                                    state={order.StateID}
                                 />
                            ))}
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