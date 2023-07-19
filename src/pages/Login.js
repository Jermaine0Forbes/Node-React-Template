import React from 'react';
import { Container, Grid, Box, Typography,TextField, Button, Link } from '@material-ui/core';
import { css } from '@emotion/react'

const btnStyle = css`
    margin-top: 1em;
`;
export default function Login()
{
    
    return (
        <Container>
            <Box component={'form'} onChange={(e) => console.log(e)}  >
                <Typography variant="h1">Login</Typography>
                <Grid>
                    <TextField label="username" name="username"></TextField>
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