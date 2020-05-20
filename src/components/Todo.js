import React, {useCallback} from 'react';
import {FiTrash} from 'react-icons/fi';
import {MdDone} from 'react-icons/md';
import './Todos.css';

const Todo = React.memo(({id, children, isCompleted , deleteTodo , checkTodo}) => {
    console.log(`Todo ${children} is rendering`)
    const deleteHandler = useCallback(() => {
        deleteTodo(id);
    },[id,deleteTodo]);
    const checkHandler = useCallback(() => {
        checkTodo(id);
    },[id, checkTodo])

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
