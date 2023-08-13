import React, {useEffect, useState} from 'react';
import { 
    Container, Grid, Box, 
    Typography,TextField, Button, 
    CircularProgress, FormControl,
    Select, MenuItem, InputLabel,
    Snackbar
} from '@material-ui/core';
import { Alert } from '@mui/material';
// import { css } from '@emotion/react';
import { useMutation } from 'react-query';
import { useNavigate } from "react-router-dom";
import { faker } from '@faker-js/faker';

export default function Create()
{
    const [open, setOpen] = useState(false);
    const [level, setLevel] = useState(faker.number.int({max:4,min:1}));
    const navigate = useNavigate();
    const firstName = faker.person.firstName();
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
            .catch(err => console.error(err));
        },
    });
    useEffect(() => isSuccess && setOpen(!open) , [isSuccess])

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {};
        const form = new FormData(e.target);
        for (const [key, value] of form.entries()){
            data[key] = value;
        };
        console.log('data')
        console.log(data)
        mutate(data)
    }

    const handleClose = () => { setOpen(!open)};
     
    return (
        <Container>
            {
                isLoading ? (
                    <CircularProgress color="secondary" />
                ) : (

                <Box component={'form'} onSubmit={(e) => handleSubmit(e)} >
                    <Typography variant="h3">Create</Typography>
                    <Grid>
                        <TextField label="email" name="email" type='email' defaultValue={firstName+"@example.com"}></TextField>
                    </Grid>    
                    <Grid>
                        <TextField label="username" name="username" defaultValue={firstName+" "+faker.person.lastName()}></TextField>
                    </Grid>                    
                    <Grid item xs={2}>
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Admin Level</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="adminLevel"
                            name="adminLevel"
                            defaultValue={level}
                            onChange={ (e) =>{ setLevel(e.target.value)} }
                        >
                            <MenuItem value={1}>Admin I</MenuItem>
                            <MenuItem value={2}>Admin II</MenuItem>
                            <MenuItem value={3}>Admin III</MenuItem>
                            <MenuItem value={4}>Admin IV</MenuItem>
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid>
                        <TextField label="password" name="password" type="password" value="123"></TextField>
                    </Grid>
                    <Grid >
                        <Button   type='submit' variant='contained' color="secondary">Submit</Button>
                    </Grid>
                </Box>
                )
            }
            {
                isSuccess && (
                    <Snackbar open={open} autoHideDuration={10000} onClose={handleClose} >
                        <Alert  severity="success" sx={{ width: '100%' }}>
                            User <strong>{firstName}</strong> has been created!
                        </Alert>
                    </Snackbar>
                )
            }

        </Container>
    );
}