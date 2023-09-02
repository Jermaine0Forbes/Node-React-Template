import React, {useEffect, useState} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Snackbar from '@material-ui/core/Snackbar';
import Alert  from '@mui/material/Alert';
import { useMutation } from 'react-query';
import { faker } from '@faker-js/faker';

export default function Create()
{
    const [open, setOpen] = useState(false);
    const [level, setLevel] = useState(faker.number.int({max:4,min:1}));
    const [firstName, setFirstName] = useState(faker.person.firstName());
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
    });
    useEffect(() => isSuccess && setOpen(!open) , [isSuccess])

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {};
        const form = new FormData(e.target);
        for (const [key, value] of form.entries()){
            data[key] = value;
        };
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