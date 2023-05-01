
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import ContextHelper from '../ContextHooks/ContextHelper';

const RouteProtecter = ({ children }) => {

    let isLogin = false;

    //---------- state, veriable, context and hooks , params
    const {
        currentUser,

        setCurrentUser
    } = ContextHelper()

console.log("RouteProtecter",currentUser);


    if (isLogin) {

        return (
            <Navigate to="/" replace />
        )
    }

    return children;
};

export default RouteProtecter;