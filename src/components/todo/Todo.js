import React, { useCallback, useContext } from 'react';
import globalContext from '../../context/globalContext';
import {FiTrash} from 'react-icons/fi';
import {MdDone} from 'react-icons/md';
import './Todos.css';

const Todo = React.memo(({id, children, isCompleted , dispatch}) => {

    const {authState} = useContext(globalContext);
    const {token} = authState;
    const deleteHandler =  useCallback(() =>{
        (async function () {
            const graphqlQuery = {
                query : `
                    mutation{
                        deleteTodo(id : "${id}"){
                            _id
                        }
                    }
                `
            }
            try {
                // dispatch({type : "DELETE_TODO_SUCCESS", payload :id });
                const response = await fetch('http://localhost:5000/graphql' , {
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json',
                        'Authorization' : `Bearer ${token}`
                    },
                    body: JSON.stringify(graphqlQuery)
                });
                const {data,errors} = await response.json();
                if(errors){
                    throw errors;
                }
                const {_id} = data.deleteTodo;
                dispatch({type : "DELETE_TODO_SUCCESS", payload : _id });
            } catch (errors) {
                dispatch({type : "DELETE_TODO_FAILED", payload: errors});
            }
        })()
    },[id,dispatch,token])

    const checkHandler = useCallback(() => {
        (async function() {
            const graphqlQuery = {
                query : `
                    mutation {
                        toggleComplete(id:"${id}") {
                            _id
                        }
                    }
                `
            }
            try {
                // dispatch({type:"CHECK_TODO_SUCCESS",payload: id});
                // console.log("REQ");
                const response = await fetch('http://localhost:5000/graphql', {
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json',
                        'Authorization' : `Bearer ${token}`
                    },
                    body : JSON.stringify(graphqlQuery)
                });
                const {data,errors} = await response.json();
                if(errors){
                    throw errors;
                }
                const {_id} = data.toggleComplete;
                dispatch({type:"CHECK_TODO_SUCCESS",payload: _id})
            }catch(errors){
                console.log(errors)
                dispatch({type:"CHECK_TODO_FAILED", payload: errors})
            }

        })()

    },[id,dispatch,token]);

    return (
        <li
            style={{textDecoration:isCompleted ? 'line-through' : ''}}
            className='Todo-li'
        >
            {children}
            <div className="Todo-icon-box">
                <span className="Todo-icon-box-trash" onClick={deleteHandler}>
                    <FiTrash/>
                </span>
                <span className="Todo-icon-box-done" onClick={checkHandler}>
                    <MdDone/>
                </span>
            </div>
        </li>
    )
});

export default Todo
