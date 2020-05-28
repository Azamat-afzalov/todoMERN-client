import React, {useContext,useEffect} from 'react';
import AuthContext from '../../context/AuthContext.js';
import TodoList from './TodoList.js';
import TodoAddForm from './TodoAddForm';
import LoadingSpinner from './../uiElements/LoadingSpinner';

import './../../App.css';

const MainPage = () => {
    const {authState , todoState,todoDispatch } =  useContext(AuthContext);
    const token = authState.token;
    // console.log('authState',authState);
    useEffect(() => {
        const graphqlQuery = {
        query : `
            {
                getTodos {
                    todos{
                        _id
                        title
                        isCompleted
                }
            }
            }
        `
        };
        document.title = "Todo app";
        async function fetchData() {
            console.log("FETCH DATA")
            try {
                const res = await fetch('http://localhost:5000/graphql', {
                    method : "POST",
                    body : JSON.stringify(graphqlQuery),
                    headers : {
                        'Content-Type' : 'application/json',
                        'Authorization' : `Bearer ${token}`
                    }
                });
                const {data,errors} = await res.json();
                if (errors) {
                    throw errors;
                }
                todoDispatch({
                    type : "FETCH_TODOS_SUCCESS",
                    payload : {
                        todos :data.getTodos.todos ,
                        isLoading : false
                    }
                });
                console.log("FETCHED")
            } catch (errors) {
                console.log("ERRORS : ", errors)
                todoDispatch({
                    type : "FETCH_TODOS_FAILED",
                    payload : {
                        errors : errors,
                        isLoading : false
                    }
                })
            }
        }
        if(token) {
            console.log('TOKEN EXISTS',token);
            fetchData();
        }
    }, [token, todoDispatch]);

    return (
        <div className="App">
            <TodoAddForm dispatch={todoDispatch}/>
            { todoState.isLoading && <LoadingSpinner/>}
            {!todoState.isLoading && todoState.errors ? (
                <div>
                {
                    todoState.errors.map(error => (
                    <p key={error.message}>
                        {error.message}
                    </p>
                    ))
                }
                </div>) :
                (<TodoList
                    todos={todoState.todos}
                    dispatch={todoDispatch}
                />)}
        </div>
    )
}

export default MainPage
