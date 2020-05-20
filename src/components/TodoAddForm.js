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
            dispatch({type : "ADD_TODO", payload:input})
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
