import React, {useEffect, useReducer } from 'react';
import {Switch,Route} from 'react-router-dom';
import globalContext from './context/globalContext';
import modalContext from './context/modalContext';
import todoReducer from './reducer/todoReducer';
import authReducer from './reducer/authReducer';
import useAuth from './hooks/useAuth';
import useModal from "./hooks/useModal";
import Header from './components/header/Header';
import Main from './components/pages/main/Main';
import TodoPage from "./components/pages/todo/TodoPage";
import HabitPage from "./components/pages/habit/HabitPage";
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import NotFound from './components/uiElements/404/404';
import './App.css';
import Modal from "./components/uiElements/Modal/Modal";
import Button from "./components/uiElements/Button";


function App() {

    const { token, userId } = useAuth();
    // const { modal , modalContent, handleModal, dismissModal } = useModal();
    // console.log('MODAL APP',modal);
    const [todoState, todoDispatch] = useReducer( todoReducer, {
        errors : {},
        todos : [],
        isLoading : true
    });

    const [authState, authDispatch] = useReducer(authReducer, {
        isAuth : false,
        userId :  null,
        token :  null,
        errors : null
    });

    // console.log(modal, todoState.errors, authState.errors);
    //
    // const actionButtons = (
    //     <>
    //         <Button onClick={dismissModal}>
    //             Close
    //         </Button>
    //     </>
    // )

    useEffect(() => {
        // console.log("SET_AUTH",token);
        authDispatch({ type:"SET_AUTH", payload : {
            isAuth : !!token,
            _id : userId,
            token : token
        }})
    }, [ userId, token]);

    // useEffect(() => {
    //     console.log('changed Modal', modalContent, modal);
    // },[modal,modalContent]);
    return (
        <globalContext.Provider value={{
            authState,
            authDispatch,
            todoState,
            todoDispatch,
        }}>
            {/*<modalContext.Provider  value={{*/}
            {/*    modal,*/}
            {/*    modalContent,*/}
            {/*    handleModal,*/}
            {/*    dismissModal*/}
            {/*}}>*/}
                <Header/>
                    <Switch>
                        <Route path="/" exact>
                            <Main/>
                        </Route>
                        {!authState.isAuth && <Route path="/login" exact>
                            <Login/>
                        </Route>}
                        {!authState.isAuth && <Route path="/signup" exact>
                            <Signup/>
                        </Route>}
                        <Route path='/todo'>
                            <TodoPage/>
                        </Route>
                        <Route path='/habit'>
                            <HabitPage/>
                        </Route>
                        <Route path='*'>
                            <NotFound/>
                        </Route>

                    </Switch>
                {/*{modal && <Modal*/}
                {/*    title='Error occured'*/}
                {/*    content={authState.errors || todoState.errors}*/}
                {/*    actions={actionButtons}/>*/}
                {/*}*/}
            {/*</modalContext.Provider>*/}
        </globalContext.Provider>
    );
}
export default App;
