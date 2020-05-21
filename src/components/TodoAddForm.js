import React, {useState, useCallback } from 'react';
import Button from './uiElements/Button';
import './Form.css';

const TodoAddForm = React.memo(({dispatch}) => {

    // console.log('TodoAddForm rendering');
    const [input, setInput] = useState('');
    const inputHandler = useCallback((e) => {
        setInput(e.target.value);
    },[]);
    const submitHandler = useCallback((e) => {
        e.preventDefault()
        if(input){
            async function addTodo() {
                const graphqlQuery = {
                    query : `
                        mutation {
                            createTodo(input : { title : "${input}"}){
                                todo {
                                    _id
                                    title
                                    isCompleted
                                }
                            }
                        }
                    `
                }
                try {
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
                    const {todo} = data.createTodo;
                    console.log(todo)
                    dispatch({type : "ADD_TODO_SUCCESS",  payload :{...todo }})
                } catch (errors) {
                    dispatch({type : "ADD_TODO_FAILED", payload:errors});
                }

            }
            addTodo();
            setInput('');
        }
    },[input,dispatch]);
    return (
        <form className='TodoAddForm-form' autoComplete="off" onSubmit={submitHandler}>
            <div className="TodoAddForm-input-container">
                <input
                    type="text"
                    className="TodoAddForm-input"
                    name="todo"
                    placeholder="What is your plans ?"
                    value={input}
                    onChange={inputHandler}
                />
                <span className='TodoAddForm-clearInput'>&times;</span>
            </div>
            <Button className="TodoAddForm-button" type='submit'>Add</Button>
        </form>
    )
})

export default TodoAddForm
