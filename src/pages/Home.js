import React, {useContext, useState, useEffect, useCallback}  from 'react';
import { Container, Grid, Box,Typography } from '@material-ui/core';
import {AuthContext} from './AuthProvider';

export default function Home()
{
    const { currentUser} = useContext(AuthContext);
    const [name, setName] = useState(null);

    useEffect(() => {
        if(currentUser){
            setName(currentUser?.username)
            console.log("bar")
        }
    }, [currentUser]);
    return (
        <Container>
            <Box>
                <main>
                    { name ? 
                        ( <Typography component="h4">Welcome, {name}!</Typography>)
                        :
                        <div>Home pages</div>
                    }
                </main>
            </Box>
        </Container>
    );
}