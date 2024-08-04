import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListContainer from '@mui/material/List';
// import { useQuery } from 'react-query';
// import { useColor } from '../hooks/users';
// import UserListItem from "../components/List/UserListItem";
// import WhileLoading from '../components/Loading/WhileLoading';
import { useNavigate } from "react-router-dom";
import { parse } from '../services/util';

export default function Results()
{
    const redirect = useNavigate();

    useEffect(() => { 
        
       if(sessionStorage?.getItem('results')){
        const {original, guesses} = parse(sessionStorage.getItem('results'));


        

       }else{
            redirect('/');
       }

    }, [isSuccess]);
    return (
        <Container>
            <Box>
                <Typography variant="h3">Results</Typography>
                <Grid item xs={4}>
                    {/* <WhileLoading loading={isLoading}>
                        {
                            isSuccess && (
                            users?.length ? (
                                <ListContainer>
                                    {
                                        users.map((e,i) => {
                                            let color = useColor(e.adminLevel);
                                            return (
                                                <UserListItem 
                                                    key={i} 
                                                    id={e.id}
                                                    color={color} 
                                                    level={e.adminLevel} 
                                                    name={e.username}
                                                />
                                            )
                                        })
                                    }
                                </ListContainer>
                            ) : 
                                <p> No users exist </p>
                            )
                        }
                    </WhileLoading> */}

                </Grid>
            </Box>
        </Container>
    );
}