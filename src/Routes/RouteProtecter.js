import React from "react";
import { Route, Navigate } from "react-router-dom";
import ContextHelper from "../ContextHooks/ContextHelper";

const RouteProtecter = ({ children, currentRoute }) => {
  let isLogin = false;

  //---------- state, veriable, context and hooks , params
  const {
    currentUser,

    setCurrentUser,
  } = ContextHelper();

  console.log("RouteProtecter", currentUser);

  if (!currentUser?.token) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser?.isadmin && currentRoute === "/view-report") {
    return <Navigate to={"/add-report"} replace />;
  }
  //   if (currentUser?.isadmin && currentRoute === "/image-viewer") {
  //     return <Navigate to={"/"} replace />;
  //   }
  return children;
};

export default RouteProtecter;
