import React, {useContext} from 'react';
import { Container, Grid, Box, Typography,TextField, Button, Link, CircularProgress } from '@material-ui/core';
import { useMutation } from 'react-query';
import { useNavigate } from "react-router-dom";
import {AuthContext} from './AuthProvider';

export default function Register()
{
    const navigate = useNavigate();
    const {setToken} = useContext(AuthContext);
    const {isLoading, isSuccess, mutate} = useMutation({
        mutationFn: (formData) =>{
            return fetch(process.env.URL+'/api/register', { 
                method:'POST', 
                headers:{
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(formData),
            })
            .catch(err => console.error(err));
        },
        onSuccess: async (data) => {
            if(data.status === 200){
                const token =  await data.text();
                setToken(token)
                localStorage.setItem('usr', token);
                navigate('/');
            }
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {};
        const form = new FormData(e.target);
        for (const [key, value] of form.entries()){
            data[key] = value;
        };

        mutate(data)
    }
    
    return (
        <Container>
            {
                isLoading ? (
                    <CircularProgress color="secondary" />
                ) : (

                <Box component={'form'} onSubmit={(e) => handleSubmit(e)} >
                    <Typography variant="h1">Register</Typography>
                    <Grid>
                        <TextField label="email" name="email" type='email'></TextField>
                    </Grid>    
                    <Grid>
                        <TextField label="username" name="username"></TextField>
                    </Grid>
                    <Grid>
                        <TextField label="password" name="password" type="password" value="password"></TextField>
                    </Grid>
                    <Grid >
                        <Button   type='submit' variant='contained' color="secondary">Submit</Button>
                    </Grid>
                    <Link href='/login' color="secondary">Have an account? Sign in here</Link>
                </Box>
                )
            }

        </Container>
    );
}