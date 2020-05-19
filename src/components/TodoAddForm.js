import React from 'react';

import './Form.css';

const TodoAddForm = () => {
    return (
        <form className='TodoAddForm-form'>
            <input type="text" className="TodoAddForm-input" name="todo"/>
            <button type="submit" className="TodoAddForm-button" >Add</button>
        </form>
    )
}

export default TodoAddForm
