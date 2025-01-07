import { useAuth } from "../store/authStore";
import { getTops } from "../api/dashboard";
import { useEffect, useState } from "react";

interface TopsProps {
    kind: string;
}

const Tops: React.FC<TopsProps> = ({ kind }) => {
    const { token } = useAuth();
    const [tops, setTops] = useState([]);

    const fetchTops = async () => {
        const response = await getTops(token, kind);
        setTops(response);
    }

    useEffect(() => {
        fetchTops();
    }, []);

    return (
        <div className="top-container">
            <h1>Top {kind}</h1>
            <ul>
                {kind === 'products' &&
                tops.map((top: any) => (
                    <li key={top.ProductID}>
                    <span>{top.product_name}</span>
                    <span>{top.total_sold}</span>
                    </li>
                ))}
                {kind === 'clients' &&
                tops.map((top: any) => (
                    <li key={top.CustomerID}>
                    <span>{top.comercial_name}</span>
                    <span>{top.total_price}</span>
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default Tops;