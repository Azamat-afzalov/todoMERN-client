import React, {useEffect, useReducer } from 'react';
import {Switch,Route} from 'react-router-dom';
import AuthContext from './context/AuthContext'
import todoReducer from './reducer/todoReducer';
import authReducer from './reducer/authReducer';
import useAuth from './hooks/useAuth';
import Header from './components/header/Header';
import TodoList from './components/todo/TodoList';
import TodoAddForm from './components/todo/TodoAddForm';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import LoadingSpinner from './components/uiElements/LoadingSpinner';
import './App.css';

function App() {
const { token, userId , login , logout} = useAuth();
const [todoState, todoDispatch] = useReducer( todoReducer, {
    errors : {},
    todos : [],
    isLoading : true
});
const [authState, authDispatch] = useReducer(authReducer, {
    isAuth : false,
    userId :  null,
    token :  null,
    errors : null
});
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
    // console.log("EFFECT HOOK")
    async function fetchData(){
    try {
        const res = await fetch('http://localhost:5000/graphql', {
        method : "POST",
        body : JSON.stringify(graphqlQuery),
        headers : {
            'Content-Type' : 'application/json'
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
        })
    } catch (errors) {
        todoDispatch({
        type : "FETCH_TODOS_FAILED",
        payload : {
            errors : errors,
            isLoading : false
        }
        })
    }
    }
    fetchData();
}, []);

useEffect(() => {
    authDispatch({ type:"SET_AUTH", payload : {
        isAuth : !!token,
        _id : userId,
        token : token
    }})
}, [userId,token,login,logout])

return (
    <AuthContext.Provider value={{
        authState,
        authDispatch
    }}>
        <Header/>
        <Switch>
            <Route path="/login" exact>
                <Login/>
            </Route>
            <Route path="/signup" exact>
                <Signup/>
            </Route>
            <Route path="/">
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
                    <TodoList
                        todos={todoState.todos}
                        dispatch={todoDispatch}
                    />}
                </div>
            </Route>
        </Switch>
    </AuthContext.Provider>
);
}
export default App;
