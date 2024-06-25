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

export default function Home()
{
    const { currentUser} = useContext(AuthContext);
    const redirect = useNavigate();
    const [name, setName] = useState(null);
    const [pokemon, setPokemon] = useState([]);
    const seconds = 10;
    const [values, setValues] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const isLoading = !!(pokemon.length == 0);
    const hasLoaded = !isLoading;
    const formRef = useRef(null);

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

        // const options = {};
        // const form = new FormData(formRef.current);
        // for (const [key, value] of form.entries()){
        //     options[key] = value;
        // };
    }
   
    useEffect(() => {

    }, [ ]);
    return (
        <Container>
            <Box>
                <main>
                    <Typography variant="h3" >Settings</Typography>

                    <Box component="form" ref={formRef}>
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