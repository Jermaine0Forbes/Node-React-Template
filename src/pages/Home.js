import React, {useContext, useState, useEffect}  from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {AuthContext} from '../providers/AuthProvider';

export default function Home()
{
    const { currentUser} = useContext(AuthContext);
    const [name, setName] = useState(null);

    useEffect(() => {
        if(currentUser){
            setName(currentUser?.username)
        }else{
            setName(null);
        }
    }, [currentUser]);
    return (
        <Container>
            <Box>
                <main>
                    { name ? 
                        <Typography component="h4">Welcome, {name}!</Typography>
                        :
                        <div>Home pages</div>
                    }
                </main>
            </Box>
        </Container>
    );
}