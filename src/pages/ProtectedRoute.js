import React, {useContext}  from 'react';
import {AuthContext} from '../providers/AuthProvider';
import { Navigate} from "react-router-dom";


export default function ProtectedRoute({children, level = 0})
{
    const {getUser, token} = useContext(AuthContext);
    const user = getUser(token);

    if(user && user?.adminLevel <= level ){
        return children;
    }

    return <Navigate to='/forbidden' replace/>;
}