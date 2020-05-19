import React from "react";
import Todo from "./Todo";

import "./Todos.css";

const todos = [
    {id : '1',title : 'first  todo' , isCompleted : false},
    {id : '2',title : 'second  todo' , isCompleted : true},
    {id : '3',title : 'third  todo' , isCompleted : false},
    {id : '4',title : 'fourth  todo' , isCompleted : true}
];

const TodoList = () => {
return (
    <ul className='TodoList-ul'>
    {todos.map((todo) => (
        <Todo key={todo.id} id={todo.id} isCompleted={todo.isCompleted}>
            {todo.title}
        </Todo>
    ))}
    </ul>
);
};

export default TodoList;
