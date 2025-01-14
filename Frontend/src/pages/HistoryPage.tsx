import { useAuth } from "../store/authStore";
import { useEffect, useState } from "react";
import { getUserOrders } from "../api/orders";
import Order from "../components/Order";


export default function HistoryPage() {
    const { token, user_id } = useAuth();    
    const [orders, setOrders] = useState<any>([]);    

    const fetchOrders = async () => {
        try {
            const response = await getUserOrders(token, user_id);
            setOrders(response);
            console.log(response);
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div>
            {orders.map((order: any) => (
                <Order
                key={order.OrderID}
                id={order.OrderID}
                name={order.order_name}
                total={order.total_price}
                state={order.StateID}
                created_at={order.creation_date}
                delivered_at={order.delivery_date}
                />
            ))}
        </div>
    )
}