export default function reducer(state , action){
    switch (action.type) {
        case "FETCH_TODOS_SUCCESS" :
            return {
                error: '',
                todos: [...action.payload.todos],
                isLoading : action.payload.isLoading
            }
        case "ADD_TODO_SUCCESS":
            return {
                todos: [
                    {   _id : action.payload._id ,
                        title : action.payload.title,
                        isCompleted: action.payload.isCompleted
                    },
                    ...state.todos
                ]
            }
        case "DELETE_TODO_SUCCESS":
            return {
                isLoading: false,
                todos: state.todos.filter(todo => todo._id !== action.payload)
            };
        case "CHECK_TODO_SUCCESS" :
            return {
                todos : state.todos.map(todo => todo._id === action.payload ? {
                    ...todo,
                    isCompleted: !todo.isCompleted
                } : todo )
            };

        case "FETCH_TODOS_FAILED":
            return {
                errors : action.payload.errors,
                isLoading : action.payload.isLoading
            }
        case "ADD_TODO_FAILED":
            return {
                errors : action.payload
            }
        case "DELETE_TODO_FAILED":
            return {
                errors : action.payload
            }
        case "CHECK_TODO_FAILED" :
            return {
                errors : action.payload
            }

        default:
            return state;
    }
}