import React, {useEffect, useReducer , useState} from 'react';
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
  // console.log('App rendering');
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, {todos : TODOS});
  const graphqlQuery = {
    query : `
      {
        getTodos {
            todos{
            _id
            title
            isCompleted
        }
        }
      }
    `
  };
  useEffect(() => {
    document.title = "Todo app";
    console.log("EFFECT HOOK")
    fetch('http://localhost:5000/graphql',{
      method : "POST",
      body : JSON.stringify(graphqlQuery),
      headers : {
        'Content-Type' : 'application/json'
      }
    })
    .then(res => {
      return res.json();
    })
    .then(({data}) => {
      dispatch({type : "SET_TODOS", payload:data.getTodos.todos});
      setIsLoading(false);
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <TodoAddForm dispatch={dispatch}/>
      { isLoading ? <div className="App-Loading-spinner"/>:
      <TodoList todos={state.todos} dispatch={dispatch}/>}
    </div>
  );
}
export default App;
