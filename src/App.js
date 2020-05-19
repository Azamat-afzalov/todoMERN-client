import React, {useEffect} from 'react';
import TodoList from './components/TodoList';
import TodoAddForm from './components/TodoAddForm';
import './App.css';

function App() {
  useEffect(() => { document.title = "Todo app"}, []);
  return (
    <div className="App">
      <TodoAddForm/>
      <TodoList/>
    </div>
  );
}

export default App;
