import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/authStore';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const LoginPage: React.FC = () => {    
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
    });
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        try {
            await login(data);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='form-container'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    placeholder="Email"
                    {...register('email')}             
                />                
                <br />
                <p className='error-message'>{errors.email?.message}</p>
                <input
                    type="password"
                    placeholder="Password"
                    {...register('password')}
                />
                <br />
                <p className='error-message'>{errors.password?.message}</p>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;