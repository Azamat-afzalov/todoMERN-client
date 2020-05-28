import React , {useState , useContext} from 'react';
import {useHistory} from 'react-router-dom';
import authContext from '../../context/AuthContext';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import Button from '../uiElements/Button';
import Input from '../uiElements/Input';
import LoadingSpinner from '../uiElements/LoadingSpinner';
import {MdErrorOutline} from 'react-icons/md';
import './Auth.css';

const Signup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const {authState, authDispatch} = useContext(authContext);
    const { login } = useAuth();
    const { register, handleSubmit, errors} = useForm();

    const onSubmit = async (formData) => {
        setIsLoading(true);
        const {username ,email, password} = formData;
        const graphqlQuery = {
            query :`
                mutation {
                    createUser( input : {
                        username : "${username}",
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
            const {_id , token} = data.createUser;
            console.log(_id , token)
            authDispatch({type : "SIGNUP_SUCCESS", payload : { _id , token }});
            login( _id, token);
            setIsLoading(false);
            history.push('/');
        } catch (error) {
            console.log(error);
            authDispatch({type: "SIGNUP_FAILED" , payload : error });
            setIsLoading(false);
        }
    }
    return (
        <div className="Auth-form-container">
            <h2>Signup</h2>
            {isLoading && <LoadingSpinner/>}

            <form className="Auth-form" onSubmit={handleSubmit(onSubmit)}>
                {authState.errors &&
                    <div className="Auth-error-box">
                    {
                        authState.errors.map(err => (
                        <p key={err.message}>{err.message}<MdErrorOutline/></p>
                        ))
                    }
                </div>}
                <Input
                    label='Username'
                    id="username"
                    type="text"
                    name="username"
                    ref={register({
                        required :  'Username is required',
                        minLength : {value : 2 , message: "Username must be at least 2"}
                    })}
                    className='Auth-form-input'
                    error={errors.username ? errors.username.message : ''}
                />
                <Input
                    label="Email"
                    id="email"
                    type="email"
                    name="email"
                    ref={register({required : 'Email is required'})}
                    className='Auth-form-input'
                    error={errors.email ? errors.email.message : ''}
                />
                <Input
                    label="Password"
                    id="password"
                    type="password"
                    name="password"
                    ref={register({
                        required : 'Password is required',
                        minLength : {value : 6 , message: "Password must be at least 6 characters"}
                    })}
                    className='Auth-form-input'
                    error={errors.password ? errors.password.message : ''}
                />
                <Button type="submit">Signup</Button>
            </form>
        </div>
    )
}

export default Signup
