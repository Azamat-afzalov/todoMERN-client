import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../uiElements/Button';
import Input from '../uiElements/Input';
import './Auth.css';
const Login = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        console.log(data);
    }
    return (
        <div className='Auth-form-container'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='Auth-form'>
                <Input
                    label="Email"
                    id="email"
                    type="email"
                    name="email"
                    ref={register}
                    className='Auth-form-input'
                />
                <Input
                    label="Password"
                    id="password"
                    type="password"
                    name="password"
                    ref={register}
                    className='Auth-form-input'
                />
                <Button type="submit">Login</Button>
            </form>

        </div>
    )
}

export default Login
