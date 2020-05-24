import React, {useEffect, useReducer } from 'react';
import {Switch,Route} from 'react-router-dom';
import reducer from './reducer/reducer';
import Header from './components/header/Header';
import TodoList from './components/todo/TodoList';
import TodoAddForm from './components/todo/TodoAddForm';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import LoadingSpinner from './components/uiElements/LoadingSpinner';
import './App.css';



function App() {
// console.log('App rendering');
const [state, dispatch] = useReducer(reducer,{
    errors : {},
    todos : [],
    isLoading : true
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
        const res = await fetch('http://localhost:5000/graphql',{
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
        dispatch({
        type : "FETCH_TODOS_SUCCESS",
        payload : {
            todos :data.getTodos.todos ,
            isLoading : false
        }
        })
    } catch (errors) {
        dispatch({
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


return (
    <>
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
                <TodoAddForm dispatch={dispatch}/>
                { state.isLoading && <LoadingSpinner/>}
                {!state.isLoading && state.errors ? (
                <div>
                {
                    state.errors.map(error => (
                    <p key={error.message}>
                        {error.message}
                    </p>
                    ))
                }
                </div>) :
                <TodoList
                todos={state.todos}
                dispatch={dispatch}
                // deleteTodo={deleteTodo}
                />}
            </div>
        </Route>


    </Switch>

    </>
);
}
export default App;
