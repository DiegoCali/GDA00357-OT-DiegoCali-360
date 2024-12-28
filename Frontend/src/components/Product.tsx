import { useNavigate } from 'react-router-dom';

interface ProductProps {
    id: number;
    name: string;
    price: number;
    stock: number;
    img: string;
}

const Product: React.FC<ProductProps> = ({ id, name, price, stock, img }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${id}`);
    };

    return (
        <div onClick={handleClick} className='ProductCard'>
            <img src={img} alt={name} />
            <div className='info'>
                <h2>{name}</h2>
                <p className='stock'>Stock: {stock}</p>
                <p className='price'>Price: ${price}</p>            
            </div>
        </div>
    );
};

export default Product;