//---------- imports

// react
import React, { useEffect, useState, createContext } from "react";


//---------- context

const AppContext = createContext();

//---------- main app / component

const GlobalContextProvide = (props) => {

    //---------- state, veriables and hooks

    const [currentUser, setCurrentUser] = useState({islogin:false})


    //---------- return main view

    return (
        <AppContext.Provider
            value={{
                currentUser,
                
                setCurrentUser,
            }}
        >

            {
                props.children
            }
        </AppContext.Provider >

    );
};

//---------- export component

export { GlobalContextProvide, AppContext };
// export default { GlobalContextProvide, AppContext };
