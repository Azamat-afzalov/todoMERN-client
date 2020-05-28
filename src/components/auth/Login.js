import React ,{useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import authContext from '../../context/AuthContext';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import Button from '../uiElements/Button';
import Input from '../uiElements/Input';
import LoadingSpinner from '../uiElements/LoadingSpinner';
import {MdErrorOutline} from 'react-icons/md';
import './Auth.css';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const {authState, authDispatch} = useContext(authContext);
    const { login } = useAuth();
    const history = useHistory();
    const onSubmit = async formData => {
        setIsLoading(true);
        const { email, password} = formData;
        const graphqlQuery = {
            query :`
                mutation {
                    loginUser( input : {
                        email :"${email}",
                        password :"${password}"
                    }) {
                        _id
                        token
                    }
                }
            `
        }
        try {
            const fetchedData = await fetch('/graphql',{
                method : "POST",
                body : JSON.stringify(graphqlQuery),
                headers : {
                    "Content-Type" : "application/json"
                },
            });
            const {data,errors} = await fetchedData.json();
            if(errors){
                throw errors;
            }
            const {_id , token} = data.loginUser;
            console.log(_id , token)
            authDispatch({type : "LOGIN_SUCCESS", payload : { _id , token }});
            login( _id, token);
            setIsLoading(false);
            history.push('/');
        } catch (error) {
            console.log(error);
            authDispatch({type: "LOGIN_FAILED" , payload : error });
            setIsLoading(false);
        }
    }
    return (
        <div className='Auth-form-container'>
            <h2>Login</h2>
            {isLoading && <LoadingSpinner/>}
            <form onSubmit={handleSubmit(onSubmit)} className='Auth-form'>
                {authState.errors &&
                    <div className="Auth-error-box">
                    {
                        authState.errors.map(err => (
                            <p key={err.message}>{err.message}<MdErrorOutline/></p>
                        ))
                    }
                    </div>
                }
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
