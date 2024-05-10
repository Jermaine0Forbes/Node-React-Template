import React, {useContext, useState, useEffect, Fragment}  from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import {List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, BottomNavigation, BottomNavigationAction} from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import {AuthContext} from '../providers/AuthProvider';
import {getInch, getPound, convStat, getPokemon, uniqueKey} from '../services/publicApi';
import WhileLoading from '../components/Loading/WhileLoading';
import Timer from '../components/Time/Timer';
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
   
    useEffect(() => {
        if(currentUser){
            setName(currentUser?.username)
        }else{
            setName(null);
        }
        if(pokemon.length === 0){
            getPokemon(10, setPokemon);
        }
        if(isFinished){
            sessionStorage.gotPokemon = true;
            sessionStorage.setItem('test', toJson({ seconds, pokemon }));
            redirect('/test');
            // console.log('redirected')
        }
    }, [currentUser, pokemon, isFinished ]);
    return (
        <Container>
            <Box>
                <main>
                    { name ? 
                        <Typography component="h4">Welcome, {name}!</Typography>
                        :
                        <div>Home pages</div>


                    }
                    <WhileLoading isLoading={isLoading}>
                        {
                            hasLoaded && (
                                <>
                                    <List>
                                        {
                                            pokemon.map((e,i) => {

                                                return (
                                                <Fragment  key={'fragment-'+uniqueKey()}>
                                                    <ListItem   alignItems='flex-start'>
                                                        <ListItemAvatar>
                                                            <Avatar  src={e?.sprites?.front_default} />
                                                        </ListItemAvatar>
                                                        <ListItemText 
                                                            primary={e.name}
                                                            secondary={
                                                                <>
                                                                <Typography  component="span" sx={{display: 'block'}}>id: {e.id}</Typography>
                                                                <br/>
                                                                <Typography component="span">
                                                                    height: {convStat(e.height)} meters | {getInch(e.height)} inches
                                                                </Typography>
                                                                <br/>
                                                                <Typography  component="span">
                                                                    weight: {convStat(e.weight)} kilograms | {getPound(e.weight)} pounds
                                                                </Typography>
                                                                </>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <Divider/>
                                                </Fragment>
                                                );
                                            })
                                        }

                                    </List>
                                </>
                            )
                        }
                    </WhileLoading>
                    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                        <BottomNavigation 
                            showLabels
                            value={value}
                            onChange={(event, newValue) => {
                            setValue(newValue);
                            }}
                        >
                            {/* <BottomNavigationAction label="Timer" icon={<AccessTime/>}/> */}
                            <BottomNavigationAction label={<Timer  seconds={seconds} loaded={hasLoaded} finished={setIsFinished} />} />
                            <BottomNavigationAction label="Ready" icon={<ArrowCircleRightIcon/>} onClick={() => setIsFinished(true)}/>
                        </BottomNavigation>
                    </Box>
                </main>
            </Box>
        </Container>
    );
}