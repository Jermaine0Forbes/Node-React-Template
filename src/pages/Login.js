import React, {useCallback, useContext} from 'react';
import { Container, Grid, Box, Typography,TextField, Button, Link } from '@material-ui/core';
import { useMutation } from 'react-query';
import { useNavigate } from "react-router-dom";
import {AuthContext} from './AuthProvider';

const loginUser = async (data) => {
    const resp = await fetch(process.env.URL+'/api/login', {
        method: "POST",
        headers:{
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    });
    return  resp;
}

export default function Login()
{

    const {setToken} = useContext(AuthContext);
    const redirect = useNavigate();

    const {mutate} = useMutation({
        mutationFn: (user) => loginUser(user),
        onSuccess: async (data) => { 
            if(data.status === 200){
                const token =  await data.text();
                setToken(token)
                localStorage.setItem('usr', token);
                redirect('/');
            }
         }
    })

    const handleSubmit = useCallback( (e) => {
        e.preventDefault();

        const user = {};
        const form = new FormData(e.target);
        for (const [key, value] of form.entries()){
            user[key] = value;
        };
        mutate(user);
    },[])
    
    return (
        <Container>
            <Box component={'form'} onSubmit={(e) => handleSubmit(e)}  >
                <Typography variant="h1">Login</Typography>
                <Grid>
                    <TextField label="username or email" name="email"></TextField>
                </Grid>
                <Grid>
                    <TextField label="password" name="password"></TextField>
                </Grid>
                <Grid >
                    <Button type='submit' variant='contained' color="secondary">Submit</Button>
                </Grid>
                <Link href='/register' color="secondary">Don't have an account? Sign up here</Link>
            </Box>
        </Container>
    );
}