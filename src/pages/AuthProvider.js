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


    console.log('AuthProvider re-rendered')
    useEffect(() =>{
        // const myToken  = token === '' ? localStorage.getItem('usr') : token; 
        // const isMyTokenExpired = isExpired(myToken);
        const tokenExpired = isExpired(token);
        
        if( token && !tokenExpired){
            
            try {
                const myDecodedToken = decodeToken(token);
                // const myDecodedToken = decodeToken(myToken);
                    
            console.log("token decoded")
            console.log(myDecodedToken)
             setCurrentUser(myDecodedToken);
            } catch(err) {
                console.log("jwt error")
                console.log(err)
            }
        }

        if(tokenExpired){
            console.log('token has expired')
            logout();
        }

    }, [token])

    const value = {
        token,
        setToken,
        currentUser,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}