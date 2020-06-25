import React, { useContext, useEffect } from 'react';
import globalContext from '../../../context/globalContext.js';
import TodoList  from '../../todo/TodoList.js';
import TodoAddForm from '../../todo/TodoAddForm';
import LoadingSpinner from '../../uiElements/LoadingSpinner';
import './TodoPage.css';
import modalContext from "../../../context/modalContext";


const TodoPage = () => {
    const {authState, todoState, todoDispatch } =  useContext(globalContext);
    // const {handleModal} = useContext(modalContext);
    const token = authState.token;
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
            }
            catch (errors) {
                // handleModal(errors);
                todoDispatch({
                    type : "FETCH_TODOS_FAILED",
                    payload : {
                        errors : errors,
                        isLoading : false
                    }
                });

            }
        }
        if(authState.isAuth){
            console.log('Fetching todos');
            fetchData();
        }

    }, [token, todoDispatch, authState.isAuth]);
    return (
        <div className="MainPage">
            <TodoAddForm dispatch={todoDispatch}/>
            {!authState.isAuth && <div className='TodoList-not-found'>Please login to add todos</div>}
            { todoState.isLoading && todoState.todos && authState.isAuth && <LoadingSpinner/>}
            {!(todoState.isLoading || todoState.errors) && <TodoList
                todos={todoState.todos}
                dispatch={todoDispatch}
            /> }

        </div>
    )
}

export default TodoPage;


