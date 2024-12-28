import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/authStore';
import { createCategory } from '../api/categories';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const CategoryFormPage: React.FC = () => {
    const schema = yup.object().shape({
        category_name: yup.string().required(),
    });
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });    
    const { user_id, token } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        try {
            data.u_id = user_id;
            const response = await createCategory(token, data);
            console.log(response);
            navigate('/categories');
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className='form-container'>
            <h2>Create Category</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Name"                                      
                    {...register('category_name')}
                />                
                <br />
                <p className='error-message'>{errors.category_name?.message}</p>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CategoryFormPage;