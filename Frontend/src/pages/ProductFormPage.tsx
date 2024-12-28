import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../store/authStore';
import { createProduct } from '../api/products';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const ProductFormPage: React.FC = () => {
    const schema = yup.object().shape({
        name: yup.string().required(),
        brand: yup.string().required(),
        code: yup.string().required(),
        price: yup.number().required(),
        picture: yup.string().required(),
        stock: yup.number().required(),
    });
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const { id, category } = useParams();    
    const { user_id, token } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        try {
            data.u_id = user_id;
            data.c_id = id;
            const response = await createProduct(token, data);
            console.log(response);
            navigate(`/categories/${id}/${category}`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='form-container'>
            <h2>Create Product on: {category}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Name"
                    {...register('name')}
                />
                <br />
                <p className='error-message'>{errors.name?.message}</p>
                <input
                    type="text"
                    placeholder="Brand"
                    {...register('brand')}
                />
                <br />
                <p className='error-message'>{errors.brand?.message}</p>
                <input
                    type="text"
                    placeholder="Code"
                    {...register('code')}
                />
                <br />
                <p className='error-message'>{errors.code?.message}</p>
                <input
                    type="text"
                    placeholder="Price"
                    {...register('price')}                    
                />
                <br />
                <p className='error-message'>{errors.price?.message}</p>
                <input
                    type="text"
                    placeholder="Picture Link"
                    {...register('picture')}
                />
                <br />
                <p className='error-message'>{errors.picture?.message}</p>
                <input
                    type="text"
                    placeholder="Stock"
                    {...register('stock')}
                />
                <br />
                <p className='error-message'>{errors.stock?.message}</p>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default ProductFormPage;