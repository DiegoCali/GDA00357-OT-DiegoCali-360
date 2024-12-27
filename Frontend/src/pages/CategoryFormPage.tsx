import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/authStore';
import { createCategory } from '../api/categories';

const CategoryFormPage: React.FC = () => {
    const [name, setName] = useState('');
    const { user_id, token } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await createCategory(token, user_id, name);
        navigate('/categories');
    };

    return (
        <div>
            <h1>Create Category</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <br />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CategoryFormPage;