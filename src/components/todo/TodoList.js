import React from "react";
import Todo from "./Todo";

import "./Todos.css";

const TodoList = ({todos, deleteTodo, checkTodo, dispatch}) => {
    // console.log('TodoList rendering');
    return (
        <ul className='TodoList-ul'>
            {todos.map((todo) => (
                <Todo
                    key={todo._id}
                    id={todo._id}
                    isCompleted={todo.isCompleted}
                    // deleteTodo={deleteTodo}
                    dispatch={dispatch}
                >
                    {todo.title}
                </Todo>
            ))}
        </ul>
    );
};

export default React.memo(TodoList);
