import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../store/authStore';
import { createProduct } from '../api/products';

const ProductFormPage: React.FC = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [code, setCode] = useState('');
    const [price, setPrice] = useState('');
    const [picture, setPicture] = useState('');
    const [stock, setStock] = useState('');
    const { user_id, token } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await createProduct(token, parseInt(id||"-1"), user_id, name, brand, code, parseFloat(price), picture, parseInt(stock));
        navigate('/products');
    };

    return (
        <div className='form-container'>
            <h2>Create Product</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <br />
                <input
                    type="text"
                    placeholder="Brand"
                    value={brand}
                    onChange={(event) => setBrand(event.target.value)}
                />
                <br />
                <input
                    type="text"
                    placeholder="Code"
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                />
                <br />
                <input
                    type="text"
                    placeholder="Price"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                />
                <br />
                <input
                    type="text"
                    placeholder="Picture Link"
                    value={picture}
                    onChange={(event) => setPicture(event.target.value)}
                />
                <br />
                <input
                    type="text"
                    placeholder="Stock"
                    value={stock}
                    onChange={(event) => setStock(event.target.value)}
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default ProductFormPage;