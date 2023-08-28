import React, {useEffect, useState, useCallback, useRef, useContext} from 'react';
import { Container, Grid, Box, Typography,TextField, Button, Link } from '@material-ui/core';
import { css } from '@emotion/react';
import { useMutation } from 'react-query';
import { useNavigate } from "react-router-dom";
import {AuthContext} from './AuthProvider';

const btnStyle = css`
    margin-top: 1em;
`;

const loginUser = async (data) => {
    const resp = await fetch(process.env.URL+'/api/login', {
        method: "POST",
        headers:{
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    });

    // console.log(resp);

    return  resp;
}

export default function Login()
{

    const {setToken} = useContext(AuthContext);
    const redirect = useNavigate();

    const {mutate, isSuccess, isLoading, error, data} = useMutation({
        mutationFn: (user) => loginUser(user),
        // onError : (error) =>  {console.log(error)}
        onSuccess: async (data) => { 
            if(data.status === 200){
                const token =  await data.text();
                setToken(token)
                localStorage.setItem('usr', token);
                console.log('storage successfully set!');
                redirect('/');
            }
         }
    })

    // useState(() => {
    //     if(data)
    //     console.log('data is: '+data);
    // }, [error, data]);

    const handleSubmit = useCallback( (e) => {
        e.preventDefault();

        const user = {};
        const form = new FormData(e.target);
        for (const [key, value] of form.entries()){
            user[key] = value;
        };
        // console.log('data')
        // console.log(user)
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