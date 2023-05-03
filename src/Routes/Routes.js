//---------- imports 

// react
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// private route
import RouteProtecter from './RouteProtecter';

// component
import Goodbye from '../component/goodbye';
import Success from '../component/success';

import ViewReport from "../component/ViewReport/ViewReport"
import Login from '../component/Login/login';
import ContextHelper from '../ContextHooks/ContextHelper';
import CustomTable from '../component/Common/CustomTable';
import AddReport from '../component/AddReport/AddReport';

//---------- main route

const Router = () => {
    const {
        currentUser,

        setCurrentUser
    } = ContextHelper()



    // console.log("currentUser", currentUser);

    //---------- View

    return (
        <BrowserRouter>
            <Routes>

                {
                    //---------- private route
                }
                <Route
                    path="/view-report"
                    element={
                        <RouteProtecter currentRoute={'/view-report'}>
                            <ViewReport />
                        </RouteProtecter>
                    }
                />

                <Route
                    path="/add-report"
                    element={
                        <RouteProtecter currentRoute={'/add-report'}>
                            <AddReport />
                        </RouteProtecter>
                    }
                />

                {
                    //---------- public route
                }
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />

            </Routes>
        </BrowserRouter>
    )
}

export default Router;