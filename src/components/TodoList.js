import React from "react";
import Todo from "./Todo";

import "./Todos.css";

const TodoList = ({todos, deleteTodo,checkTodo}) => {
    console.log('TodoList rendering')
return (
    <ul className='TodoList-ul'>
        {todos.map((todo) => (
            <Todo
                key={todo.id}
                id={todo.id}
                isCompleted={todo.isCompleted}
                deleteTodo={deleteTodo}
                checkTodo={checkTodo}
            >
                {todo.title}
            </Todo>
        ))}
    </ul>
);
};

export default TodoList;
