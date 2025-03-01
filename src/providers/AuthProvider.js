import React, {useEffect, useState, createContext} from 'react';
import { isExpired, decodeToken } from "react-jwt";
import {logoutUser} from "../services/login";

export const AuthContext = createContext(null);

export default function AuthProvider ({children}) {

    const usr = localStorage.getItem('usr') ?? '';
    const [token, setToken] = useState(usr);
    const [oldToken, setOldToken] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [loggedOut, setLoggedOut] = useState(false);

    const logout = () => {
        setOldToken(token);
        setToken('');
        localStorage.removeItem('usr')
        setCurrentUser(null);
        setLoggedOut(true);
        console.log('logging out?')
    }

    const getUser =  (token)  => token && !isExpired(token) ? decodeToken(token): false ;

    useEffect(() => {
        let tokenExpired
        if(token)  {
            tokenExpired = isExpired(token);
            
            if( (token && !tokenExpired) || token != oldToken){
                 console.log("token:")
                 console.log(token)
                 console.log("old token:")
                 console.log(oldToken)
                try {
                const myDecodedToken = decodeToken(token);
                setLoggedOut(false);
                 setCurrentUser(myDecodedToken);
                 setOldToken(token);
                } catch(err) {
                    console.log("jwt error")
                    console.log(err)
                }
            }

            if(tokenExpired){
                logout();
            }

        }



    }, [token, loggedOut])

    const value = {
        token,
        setToken,
        currentUser,
        logout,
        getUser,
        loggedOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}