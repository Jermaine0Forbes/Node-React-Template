import React, {useCallback, useContext} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link} from "react-router-dom";
import { useMutation } from 'react-query';
import { useNavigate } from "react-router-dom";
import {AuthContext} from '../providers/AuthProvider';
import { loginUser } from '../services/login';

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