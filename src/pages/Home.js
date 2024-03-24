import React, {useContext, useState, useEffect}  from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {AuthContext} from '../providers/AuthProvider';
import {getDiffNumArr, getPokemon} from '../services/publicApi';

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
            getPokemon(10, setPoke);
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
                        poke.length && (
                            <ul>
                                {
                                    poke.map((e,i) => {

                                        return (<li key={i}>{e.name}</li>);
                                    })
                                }
                            </ul>
                        )
                    }
                </main>
            </Box>
        </Container>
    );
}