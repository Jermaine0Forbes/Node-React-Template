import React, {useEffect} from 'react';
import { Container, Grid, Box, Typography,TextField, Button, Link, CircularProgress } from '@material-ui/core';
import { css } from '@emotion/react';
import { useMutation } from 'react-query';
import { useNavigate } from "react-router-dom";

const btnStyle = css`
    margin-top: 1em;
`;

export default function Register()
{
    const navigate = useNavigate();
    const {isLoading, isSuccess, mutate} = useMutation({
        mutationFn: (formData) =>{
            return fetch(process.env.URL+'/api/register', { 
                method:'POST', 
                headers:{
                    'Content-Type': "application/json"
                    // 'Content-Type': "multipart/form-data"
                },
                body: JSON.stringify(formData),
                // body: formData,
            })
            // .then((res) =>  {
            //     console.log(res.status)
            //     if(res.status === 200)
            //        return redirect("/");
                
            //     console.log('nothing')
            // })
            .catch(err => console.error(err));
        },
    });
    ;
    useEffect(() => isSuccess && navigate("/") , [isSuccess])

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {};
        const form = new FormData(e.target);
        for (const [key, value] of form.entries()){
            data[key] = value;
        };
        console.log('data')
        console.log(data)
        // console.log(e)
        mutate(data)
        // mutation.mutate(form)
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