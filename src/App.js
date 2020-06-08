import React, {useEffect, useReducer } from 'react';
import {Switch,Route} from 'react-router-dom';
import globalContext from './context/globalContext';
import modalContext from './context/modalContext';
import todoReducer from './reducer/todoReducer';
import authReducer from './reducer/authReducer';
import useAuth from './hooks/useAuth';
import useModal from "./hooks/useModal";
import MainPage from './components/todo/MainPage.jsx';
import Header from './components/header/Header';

import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import './App.css';
import Modal from "./components/uiElements/Modal/Modal";
import Button from "./components/uiElements/Button";

function App() {

    const { token, userId } = useAuth();
    const { modal, toggleModal , modalContent, handleModal, dismissModal } = useModal();

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

    const actionButtons = (
        <>
            <Button onClick={dismissModal}>
                Close
            </Button>
        </>
    )

    useEffect(() => {
        // console.log("SET_AUTH",token);
        authDispatch({ type:"SET_AUTH", payload : {
            isAuth : !!token,
            _id : userId,
            token : token
        }})
    }, [ userId, token]);

    return (
        <globalContext.Provider value={{
            authState,
            authDispatch,
            todoState,
            todoDispatch,
        }}>
            <modalContext.Provider  value={{
                modal,
                toggleModal ,
                modalContent,
                handleModal,
                dismissModal
            }}>
                <Header/>
                <Switch>
                    <Route path="/login" exact>
                        <Login/>
                    </Route>
                    <Route path="/signup" exact>
                        <Signup/>
                    </Route>
                    <Route path="/">
                        <MainPage/>
                    </Route>
                </Switch>
                {modal && <Modal
                    title='Error occured'
                    content={authState.errors || todoState.errors}
                    actions={actionButtons}/>
                }
            </modalContext.Provider>
        </globalContext.Provider>
    );
}
export default App;
