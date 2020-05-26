import React , {useState , useContext} from 'react';
import authContext from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import Button from '../uiElements/Button';
import Input from '../uiElements/Input';
import LoadingSpinner from '../uiElements/LoadingSpinner';
import './Auth.css';

const Signup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {authState, authDispatch} = useContext(authContext);
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
            console.log(errors)
            if(errors){
                throw errors;
            }
            const {_id , token} = data.createUser;
            console.log(_id ,token);
            authDispatch({type : "SIGNUP_SUCCESS", payload : { _id , token}});
            setIsLoading(false);
        } catch (errors) {
            console.log(errors);
            authDispatch({type: "SIGNUP_FAILED" , payload : errors});
            setIsLoading(false);
        }

        // console.log("ERRORS",errors)
    }
    return (
        <div className="Auth-form-container">
            <h2>Signup</h2>
            {isLoading && <LoadingSpinner/>}
            <form className="Auth-form" onSubmit={handleSubmit(onSubmit)}>
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
                <Button type="submit">Login</Button>
            </form>
        </div>
    )
}

export default Signup
