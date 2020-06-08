import React from "react";
import Todo from "./Todo";

import "./Todos.css";

const TodoList = ({todos, deleteTodo, checkTodo, dispatch}) => {
    // console.log('TodoList rendering');
    if (todos.length > 0) {
        return (
            <ul className='TodoList-ul'>
                {todos.map((todo) => (
                    <Todo
                        key={todo._id}
                        id={todo._id}
                        isCompleted={todo.isCompleted}
                        dispatch={dispatch}
                    >
                        {todo.title}
                    </Todo>
                ))}
            </ul>)
    }else if (todos.length === 0) {
        return (
            <div className='TodoList-not-found'>No todos found</div>
        )
    }
};

export default React.memo(TodoList);
