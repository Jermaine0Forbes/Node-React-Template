import React, {useContext}  from 'react';
import {AuthContext} from '../providers/AuthProvider';
import { Navigate} from "react-router-dom";


export default function ProtectedRoute({children, level = 0})
{
    const { currentUser} = useContext(AuthContext);

    if(currentUser && currentUser?.adminLevel <= level ){
        return children;
    }

    return <Navigate to='/forbidden' replace/>;
}