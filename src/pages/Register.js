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
    const [errors, setErrors] = useState(null)
    const [pass, setPass ] = useState('password');
    const {setToken} = useContext(AuthContext);
    const {isLoading, mutate} = useMutation({
        mutationFn: (data) => registerUser(data),
        onSuccess: async (data) => {
            if(data.status === 200){
                const token =  await data.text();
                setToken(token)
                localStorage.setItem('usr', token);
                navigate('/');
            } else if (data.status === 400){
                const errArr = await data.json();
                setErrors(errArr);
            }
        },
        onError: async (err) => {
            console.log(err)
        }
    });

    const changePass = (e) => {
        setPass(e.target.value);
    }

    const togglePass = () => { setShowPass(!showPass)};

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(null);

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
                    <Typography variant="subtitle2" color="error">{errors?.other}</Typography>
                    <Grid>
                        <TextField label="email" name="email" type='email'></TextField>
                        <Typography variant="subtitle2" color="error">{errors?.email}</Typography>
                    </Grid>    
                    <Grid>
                        <TextField label="username" name="username"></TextField>
                        <Typography variant="subtitle2" color="error">{errors?.username}</Typography>
                    </Grid>
                    <Grid>
                        <PasswordField   value={pass} onChange={changePass} showPassword={showPass} handleShowPassword={togglePass}/>
                        <Typography variant="subtitle2" color="error">{errors?.password}</Typography>
                    </Grid>
                    <Grid >
                        <Button   type='submit' variant='contained' color="secondary">Submit</Button>
                    </Grid>
                    <Link href='/login' variant="subtitle1" color="secondary">Have an account? Sign in here</Link>
                </Box>
                )
            }

        </Container>
    );
}