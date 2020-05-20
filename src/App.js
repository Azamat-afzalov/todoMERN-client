import React, {useEffect, useState, useCallback} from 'react';
import TodoList from './components/TodoList';
import TodoAddForm from './components/TodoAddForm';
import './App.css';

const TODOS = [
  {id : '1',title : 'first  todo' , isCompleted : false},
  {id : '2',title : 'second  todo' , isCompleted : true},
  {id : '3',title : 'third  todo' , isCompleted : false},
  {id : '4',title : 'fourth  todo' , isCompleted : true}
];

function App() {
  console.log('App rendering')
  const [todos, setTodos] = useState(TODOS);
  useEffect(() => { document.title = "Todo app"}, []);

  const addTodo = useCallback((todo) => {
    setTodos(prevState => (
        [ {
          title : todo,
          id: Math.random() ,
          isCompleted : false
          },
          ...prevState
        ]
      )
    );
  },[]);

  const deleteTodo = useCallback((id) => {
    setTodos(prevState => (
      prevState.filter(todo => todo.id !== id)
    ))
  },[]);

  const checkTodo = useCallback((id) => {
    setTodos(prevState => (
      prevState.map(todo => todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo)
    ))
  },[])

  return (
    <div className="App">
      <TodoAddForm addTodo={addTodo}/>
      <TodoList todos={todos} deleteTodo={deleteTodo} checkTodo={checkTodo}/>
    </div>
  );
}

export default App;
