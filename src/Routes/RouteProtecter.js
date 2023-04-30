
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const RouteProtecter = ({ children }) => {

    let isLogin = true;


    if(isLogin){

        return(
            <Navigate to="/" replace/>
        )
    }

    return children;
};

export default RouteProtecter;