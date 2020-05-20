export default function reducer(state , action){
    switch (action.type) {
        case "ADD_TODO":
            console.log(state);
            return {
                todos: [
                    {   id : Math.random() ,
                        title : action.payload,
                        isCompleted: false
                    },
                    ...state.todos
                ]
            }
        case "DELETE_TODO":
            return { todos: state.todos.filter(todo => todo.id !== action.payload)};
        case "CHECK_TODO" :
            return {
                todos : state.todos.map(todo => todo.id === action.payload ? {
                    ...todo,
                    isCompleted: !todo.isCompleted
                } : todo )
            };
        case "SET_TODOS" :
            return {
                todos: [...action.payload]
            }
        default:
            return state;
    }
}