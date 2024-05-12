import React, {useContext, useState, useEffect, Fragment}  from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { TextField, InputAdornment} from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import {AuthContext} from '../providers/AuthProvider';
import {getInch, getPound, convStat, getPokemon, uniqueKey} from '../services/publicApi';
import { toJson } from '../services/util';
// import { AccessTime } from '@mui/icons-material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

export default function Home()
{
    const { currentUser} = useContext(AuthContext);
    const redirect = useNavigate();
    const [name, setName] = useState(null);
    const [pokemon, setPokemon] = useState([]);
    const seconds = 10;
    const [value, setValue] = useState([]);
    const [isFinished, setIsFinished] = useState(false);
    const isLoading = !!(pokemon.length == 0);
    const hasLoaded = !isLoading;
   
    // useEffect(() => {

    // }, [ ]);
    return (
        <Container>
            <Box>
                <main>
                    <Typography component="h3">Settings</Typography>

                    <Box component="section">
                        <TextField
                            label="Number of Pokemon"
                            id="outlined-start-adornment"
                            sx={{ m: 1, width: '25ch' }}
                            type="number"
                        />
                        <TextField
                        label="Time to memorize"
                        id="outlined-start-adornment-2"
                        sx={{ m: 1, width: '25ch' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">seconds</InputAdornment>,
                        }}
                    />
                    </Box>
                </main>
            </Box>
        </Container>
    );
}