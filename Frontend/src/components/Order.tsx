import { useNavigate } from "react-router-dom"

interface OrderProps {
    id: number;
    name: string;
    total: number;
    state: string;
}

const Order: React.FC<OrderProps> = ({ id, name, total, state }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/order/${id}`)
    }

    return (
        <div onClick={handleClick}>
            <h3>{name}</h3>
            <p>{total}</p>
            <p>{state}</p>
        </div>
    )
}

export default Order