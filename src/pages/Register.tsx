import React from 'react';
import { Container, Grid, Box, Typography,TextField, Button, Link } from '@material-ui/core';
import { css } from '@emotion/react';
import { useQuery } from 'react-query';

const btnStyle = css`
    margin-top: 1em;
`;
export default function Register():JSX.Element
{
    const handleSubmit = (e:any) => {
        console.log(e);
        return false;
    }
    return (
        <Container>
            <Box component={'form'} onSubmit={(e) => handleSubmit(e)}  >
                <Typography variant="h1">Register</Typography>
                <Grid>
                    <TextField label="username" name="username"></TextField>
                </Grid>
                <Grid>
                    <TextField label="password" name="password"></TextField>
                </Grid>
                <Grid >
                    <Button type='submit' variant='contained' color="secondary">Submit</Button>
                </Grid>
                <Link href='/login' color="secondary">Have an account? Sign in here</Link>
            </Box>
        </Container>
    );
}