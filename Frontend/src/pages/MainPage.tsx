import { useAuth } from "../store/authStore";
import { useEffect, useState } from "react";
import { getOrders } from "../api/orders";
import { useNavigate } from "react-router-dom";
import Order from "../components/Order";


export default function MainPage() {
    const [ordersData, setOrdersData] = useState([]);
    const { token, role } = useAuth(); 
    const navigate = useNavigate();   

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
        if (role === 1 && token) {
            handleGetOrders();
        }else if (role === 2 && token) {        
            navigate("/categories");
        }else {               
            navigate("/login");
        }
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
                                key={order.OrderID}
                                id={order.OrderID}
                                name={order.order_name}
                                total={order.total_price}
                                state={order.StateID}
                                created_at={order.creation_date}
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