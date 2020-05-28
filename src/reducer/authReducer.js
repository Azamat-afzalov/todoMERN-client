export default function authReducer(state , action) {
    switch (action.type) {
        case "SET_AUTH" : {
            return {
                userId : action.payload._id,
                isAuth : action.payload.isAuth,
                token : action.payload.token,
                errors : action.payload.error || null
            }
        }
        case "SIGNUP_SUCCESS":
            // const { _id, token } = action.payload;
            if( action.payload._id && action.payload.token){

                return {
                    userId : action.payload._id,
                    isAuth : true,
                    token : action.payload.token,
                    errors : null
                }
            }
            return state;
        case "LOGIN_SUCCESS":
            if( action.payload._id && action.payload.token){
                return {
                    userId : action.payload_id,
                    isAuth : true,
                    token : action.payloadtoken,
                    errors : null
                }
            }
        case "SIGNUP_FAILED":
            return {
                ...state,
                errors : action.payload
            }
        case "LOGIN_FAILED":
            return {
                ...state,
                errors : action.payload
            }
        case "LOGOUT_SUCCESS" :
            return{
                isAuth : false,
                token : null,
                userId : null,
                errors : null
            }
        default:
            return state;
    }
}