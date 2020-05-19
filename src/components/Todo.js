import React from 'react';
import {FiTrash} from 'react-icons/fi';
import {MdDone} from 'react-icons/md';
import './Todos.css';

const Todo = ({id,children,isCompleted}) => {
    return (
        <li style={{textDecoration:isCompleted ? 'line-through' : ''}} className='Todo-li'>
            {children}
            <div className="Todo-icon-box">
                <span className="Todo-icon-box-trash">
                    <FiTrash/>
                </span>
                <span className="Todo-icon-box-done">
                    <MdDone/>
                </span>
            </div>
        </li>
    )
}

export default Todo
