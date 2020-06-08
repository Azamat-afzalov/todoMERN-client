import React, { useContext, useEffect } from 'react';
import globalContext from '../../context/globalContext.js';
import Modal from "../uiElements/Modal/Modal";
import TodoList  from './TodoList.js';
import TodoAddForm from './TodoAddForm';
import LoadingSpinner from './../uiElements/LoadingSpinner';
import './MainPage.css';
import modalContext from "../../context/modalContext";
import Button from "../uiElements/Button";
// import './../../App.css';

const MainPage = () => {
    const {authState, todoState, todoDispatch } =  useContext(globalContext);
    const { modal , toggleModal, handleModal, modalContent, dismissModal } = useContext(modalContext);
    console.log(authState.errors);
    const token = authState.token;
    const closeModal = () =>{
        console.log('clearErrors');
        dismissModal()
    }
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

                handleModal(errors);
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

    }, [token, todoDispatch]);
    const actionButtons = (
        <>
            <Button onClick={dismissModal}>
                Close
            </Button>
        </>
    );
    return (
        <div className="MainPage">
            <TodoAddForm dispatch={todoDispatch}/>
            { todoState.isLoading && todoState.todos && <LoadingSpinner/>}
            {!(todoState.isLoading || todoState.errors) && <TodoList
                todos={todoState.todos}
                dispatch={todoDispatch}
            /> }

        </div>
    )
}

export default MainPage;


