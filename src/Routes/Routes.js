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
import Login from '../component/login';

//---------- main route

const Router = () => {


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
                        <RouteProtecter>
                            <ViewReport />
                        </RouteProtecter>
                    }
                />

                <Route
                    path="/add-report"
                    element={
                        <RouteProtecter>
                            <ViewReport />
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