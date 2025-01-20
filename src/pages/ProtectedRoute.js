import React, {useContext}  from 'react';
import {AuthContext} from '../providers/AuthProvider';
import { Navigate} from "react-router-dom";


export default function ProtectedRoute({children, level = 0, forbidden = false})
{
    const {getUser, token} = useContext(AuthContext);
    const user = getUser(token);
    const route = forbidden ? "/forbidden" : "/login";

    if(user && user?.adminLevel <= level ){
        return children;
    }

    return <Navigate to={route} replace/>;
}