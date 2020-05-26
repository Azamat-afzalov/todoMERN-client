function saveToLocalStorage(token){
    window.locatStorage.setItem('token' , token );
}
export default function authReducer(state , action) {
    switch (action.type) {
        case "SIGNUP_SUCCESS":
            const {_id , token} = action.payload;
            if( _id && token){
                console.log(_id , token)
                return {
                    authErrors : null,
                    userId : _id,
                    isAuth : true,
                    token : token
                }
            }
            return state;
        case "LOGIN_SUCCESS":
            return {}
        case "SIGNUP_FAILED":
            return {}
        case "LOGIN_FAILED":
            return {}

        default:
            return state;
    }
}