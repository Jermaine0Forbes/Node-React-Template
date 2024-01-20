import React, {useCallback, useContext, useState} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import PasswordField from '../components/Form/PasswordField';
import { useMutation } from 'react-query';
import { useNavigate } from "react-router-dom";
import {AuthContext} from '../providers/AuthProvider';
import { loginUser } from '../services/login';


export default function Login()
{

    const {setToken} = useContext(AuthContext);
    const redirect = useNavigate();
    const [showPass, setShowPass ] = useState(true);
    const [pass, setPass] = useState('password');
    const [err, setErr] = useState(null);

    const togglePass = () => { setShowPass(!showPass)};

    const handlePass = (e) => {
        setPass(e.target.value);
    }

    const {mutate} = useMutation({
        mutationFn: (user) => loginUser(user),
        onSuccess: async (data) => { 
            let error;
            if(data.status === 200){
                setErr(null)
                const token =  await data.text();
                setToken(token)
                localStorage.setItem('usr', token);
                redirect('/');
            }else if (data.status === 401){
                error = await data.text();
                setErr(error);
            }else if (data.status === 400){
                error = await data.json();
                setErr(error)
            }
         }
    })

    const handleSubmit = useCallback( (e) => {
        e.preventDefault();
        setErr(null)

        const user = {};
        const form = new FormData(e.target);
        for (const [key, value] of form.entries()){
            user[key] = value;
        };
        mutate(user);
    },[])
    
    return (
        <Container>
            <Box component={'form'} onSubmit={(e) => handleSubmit(e)}>
                <Typography variant="h3">Login</Typography>
                <Typography variant="subtitle2" color="error">{err?.other}</Typography>
                <Grid>
                    <TextField label="email" name="email"></TextField>
                    <Typography variant="subtitle2" color="error">{err?.email}</Typography>
                </Grid>
                <Grid>
                    <PasswordField  value={pass} onChange={handlePass} showPassword={showPass} handleShowPassword={togglePass}/>
                    <Typography variant="subtitle2" color="error">{err?.password}</Typography>
                </Grid>
                <Grid >
                    <Button type='submit' variant='contained' color="secondary" >Submit</Button>
                </Grid>
                <Link href='/register' variant="subtitle1" color="secondary">Don't have an account? Sign up here</Link>
            </Box>
        </Container>
    );
}