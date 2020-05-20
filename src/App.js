import React, {useEffect, useReducer} from 'react';
import reducer from './reducer/reducer';
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
  // console.log('App rendering')
  const [state, dispatch] = useReducer(reducer, {todos : TODOS});
  useEffect(() => { document.title = "Todo app"}, []);

  return (
    <div className="App">
      <TodoAddForm dispatch={dispatch}/>
      <TodoList todos={state.todos} dispatch={dispatch}/>
    </div>
  );
}
export default App;
