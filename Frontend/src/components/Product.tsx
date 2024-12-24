import { useNavigate } from 'react-router-dom';

interface ProductProps {
    id: number;
    name: string;
    price: number;
    img: string;
}

const Product: React.FC<ProductProps> = ({ id, name, price, img }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${id}`);
    };

    return (
        <div onClick={handleClick}>
            <img src={img} alt={name} />
            <h3>{name}</h3>
            <p>{price}</p>
        </div>
    );
};

export default Product;