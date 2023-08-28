import React, {useEffect, useState, useCallback, useMemo, useContext} from 'react';
import {AuthContext} from '../pages/AuthProvider';
import { isExpired, decodeToken } from "react-jwt";

export const useAuth = () => {

    const {token, setToken, currentUser} = useContext(AuthContext);

    useState(( ) => {
        const myToken  = localStorage.getItem('usr') ; 
        if(!token && myToken){
            console.log('token is empty but local storage is set')
            setToken(myToken)
        }

    },[token])

    return {
        token,
        setToken,
        currentUser
    };
}