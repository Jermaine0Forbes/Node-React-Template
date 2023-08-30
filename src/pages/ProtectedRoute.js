import React, {useContext, useState, useEffect, useCallback}  from 'react';
import {AuthContext} from './AuthProvider';
import { useNavigate, Navigate} from "react-router-dom";
// import { Container, AppBar,MenuList, MenuItem, Toolbar, makeStyles } from '@material-ui/core';


export default function ProtectedRoute({children, level = 0})
{
    const { currentUser} = useContext(AuthContext);

    if(currentUser && currentUser?.adminLevel <= level ){
        return children;
        
    }

    return <Navigate to='/forbidden' replace/>;

}