import { useAuth } from "../store/authStore";
import { getActives } from "../api/dashboard";
import { useEffect, useState } from "react";

const Actives = () => {
    const { token } = useAuth();
    const [actives, setActives] = useState([]);

    const fetchActives = async () => {
        const response = await getActives(token);
        setActives(response);
    }

    useEffect(() => {
        fetchActives();
    }, []);

    return (
        <div className="top-container">
            <h1>Actives</h1>
            <ul>
                {actives.map((active: any) => (
                    <li key={active.ProductID}>
                        <span>{active.product_name}</span>
                        <span>{active.total_sold}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Actives;