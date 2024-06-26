import React, {useContext, useState, useEffect, useRef}  from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import {InputAdornment, Grid, FormControl, FormGroup} from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import {AuthContext} from '../providers/AuthProvider';
import {getInch, getPound, convStat, getPokemon, uniqueKey} from '../services/publicApi';
import { toJson } from '../services/util';

export default function Settings()
{
    const { currentUser} = useContext(AuthContext);
    const redirect = useNavigate();
    const [values, setValues] = useState({});

    const handleChange = (evt) => {
        const {name , value} = evt.target;
        console.log(evt.target)
        setValues({...values, [name]: parseInt(value)});
        console.log(values);
    }

    const handleClick = (evt) => {
        evt.preventDefault();
        if(['amount', 'time'].some((item) => !Object.hasOwn(values, item)))
         {
            console.log("at least one field hasn't been filled")
            return;
         }
         sessionStorage.setItem('settings', toJson(values));  
         redirect('/memory'); 

    }
   
    return (
        <Container>
            <Box>
                <main>
                    <Typography variant="h3" >Settings</Typography>

                    <Box component="form">
                        <TextField
                            label="Number of Pokemon"
                            id="outlined-start-adornment"
                            sx={{ m: 1, width: '25ch' }}
                            type="number"
                            name="amount"
                            onChange={handleChange}
                        />
                        <TextField
                            label="Time to memorize"
                            id="outlined-start-adornment-2"
                            name="time"
                            onChange={handleChange}
                            sx={{ m: 1, width: '25ch' }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">seconds</InputAdornment>,
                            }}
                        />
                        <Grid>
                            <Button variant="contained"  onClick={handleClick}>Submit</Button>
                        </Grid>           
                    </Box>
                </main>
            </Box>
        </Container>
    );
}