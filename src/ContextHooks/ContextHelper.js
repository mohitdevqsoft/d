//---------- imports

// react
import React, { useContext } from "react";
import { AppContext } from "./GlobalContextProvide";

//---------- context


const ContextHelper = () => {

    //---------- state, veriable, context and hooks
    const {
        currentUser,
                
        setCurrentUser,
    } = useContext(AppContext);

    //---------- main app / component

    return {
        currentUser,
                
        setCurrentUser,
    }

}

//---------- export component

export default ContextHelper;
