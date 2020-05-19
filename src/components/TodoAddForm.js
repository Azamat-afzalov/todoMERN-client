import React from 'react';

import './Form.css';

const TodoAddForm = () => {
    return (
        <form className='TodoAddForm-form'>
            <div className="TodoAddForm-input-container">
                <input
                    type="text"
                    className="TodoAddForm-input"
                    name="todo"
                    placeholder="What is your plans ?"
                />
                <span className='TodoAddForm-clearInput'>&times;</span>
            </div>
            <button type="submit" className="TodoAddForm-button" >Add</button>
        </form>
    )
}

export default TodoAddForm
