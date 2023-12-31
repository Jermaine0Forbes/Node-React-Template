import React, {useContext, useState} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import PasswordField from '../components/Form/PasswordField';

import { useMutation } from 'react-query';
import { useNavigate} from "react-router-dom";
import {AuthContext} from '../providers/AuthProvider';
import { registerUser } from '../services/login';

export default function Register()
{
    const navigate = useNavigate();
    const [showPass, setShowPass ] = useState(false);
    const {setToken} = useContext(AuthContext);
    const {isLoading, mutate} = useMutation({
        mutationFn: (data) => registerUser(data),
        onSuccess: async (data) => {
            if(data.status === 200){
                const token =  await data.text();
                setToken(token)
                localStorage.setItem('usr', token);
                navigate('/');
            }
        }
    });

    

    const togglePass = () => { setShowPass(!showPass)};

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
                    <Typography variant="h3">Register</Typography>
                    <Grid>
                        <TextField label="email" name="email" type='email'></TextField>
                    </Grid>    
                    <Grid>
                        <TextField label="username" name="username"></TextField>
                    </Grid>
                    <Grid>
                        <PasswordField readOnly value="password" showPassword={showPass} handleShowPassword={togglePass}/>
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