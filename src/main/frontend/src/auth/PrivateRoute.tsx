import React from "react";
import {useAuthenticate} from "./useAuthenticate";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoute = (): React.ReactElement => {
    return useAuthenticate() ? <Outlet/> : <Navigate to="/login" />;
}
export default PrivateRoute