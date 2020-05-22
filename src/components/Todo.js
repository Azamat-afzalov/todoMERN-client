import React, {useCallback } from 'react';
import {FiTrash} from 'react-icons/fi';
import {MdDone} from 'react-icons/md';
import './Todos.css';

const Todo = React.memo(({id, children, isCompleted , dispatch}) => {
    // console.log(`Todo ${children} is rendering`);
    // console.log(isCompleted , id, children, isCompleted , deleteTodo , checkTodo);

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
                        'Content-Type' : 'application/json'
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
    },[id,dispatch])

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
                        'Content-Type' : 'application/json'
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

    },[id,dispatch]);

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
