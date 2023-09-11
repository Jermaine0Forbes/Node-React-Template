import React, {useEffect, useState, createContext} from 'react';
import { isExpired, decodeToken } from "react-jwt";


export const AuthContext = createContext(null);

export default function AuthProvider ({children}) {

    const usr = localStorage.getItem('usr') ?? '';
    const [token, setToken] = useState(usr);
    const [currentUser, setCurrentUser] = useState(null);

    const logout = () => {
        setToken('');
        localStorage.removeItem('usr')
        setCurrentUser(null);
    }

    const getUser =  (token)  => token && !isExpired(token) ? decodeToken(token): false ;

    useEffect(() =>{
        const tokenExpired = isExpired(token);
        
        if( token && !tokenExpired){
            
            try {
            const myDecodedToken = decodeToken(token);
             setCurrentUser(myDecodedToken);
            } catch(err) {
                console.log("jwt error")
                console.log(err)
            }
        }

        if(tokenExpired){
            logout();
        }

    }, [token])

    const value = {
        token,
        setToken,
        currentUser,
        logout,
        getUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}