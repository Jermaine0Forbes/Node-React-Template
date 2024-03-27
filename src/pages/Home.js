import React, {useContext, useState, useEffect}  from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import {List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {AuthContext} from '../providers/AuthProvider';
import {getInch, getPound, convStat, getPokemon} from '../services/publicApi';

export default function Home()
{
    const { currentUser} = useContext(AuthContext);
    const [name, setName] = useState(null);
    const [poke, setPoke] = useState([]);

   
    useEffect(() => {
        if(currentUser){
            setName(currentUser?.username)
        }else{
            setName(null);
        }
        if(poke.length === 0){
            getPokemon(100, setPoke);
        }
    }, [currentUser, poke ]);
    return (
        <Container>
            <Box>
                <main>
                    { name ? 
                        <Typography component="h4">Welcome, {name}!</Typography>
                        :
                        <div>Home pages</div>


                    }
                    {
                        poke.length  > 0 && (
                            <>
                                <List>
                                    {
                                        poke.map((e,i) => {

                                            return (
                                            <>
                                            <ListItem  key={i} alignItems='flex-start'>
                                                <ListItemAvatar>
                                                    <Avatar src={e?.sprites?.front_default} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={e.name}
                                                    secondary={
                                                        <>
                                                        <Typography component="span" sx={{display: 'block'}}>id: {e.order}</Typography>
                                                        <br/>
                                                        <Typography component="span">
                                                            height: {convStat(e.height)} meters | {getInch(e.height)} inches
                                                        </Typography>
                                                        <br/>
                                                        <Typography component="span">
                                                            weight: {convStat(e.weight)} kilograms | {getPound(e.weight)} pounds
                                                        </Typography>
                                                        </>
                                                    }
                                                />
                                            </ListItem>
                                            <Divider key={(i+1)*3.54} />
                                            
                                            </>
                                            );
                                        })
                                    }
                                </List>
                            </>
                        )
                    }
                </main>
            </Box>
        </Container>
    );
}