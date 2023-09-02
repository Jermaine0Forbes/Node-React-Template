import React, { useState, useEffect } from 'react';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import ListContainer from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Tooltip from '@mui/material/Tooltip';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link} from "react-router-dom";
import { useQuery } from 'react-query';
import { fetchUsers } from '../services/users';
import { useColor } from '../hooks/users';



export default function List()
{
    const [users,setUsers] = useState([]);
    const {isLoading, isSuccess, data} = useQuery('users', fetchUsers, {
        staleTime: Infinity
    });
    useEffect(() => { data?.users?.length && setUsers(data.users)}, [isSuccess]);
    return (
        <Container>
            <Box>
                <Typography variant="h3">List</Typography>
                <Grid item xs={4}>
                    {
                        isLoading && (
                        <CircularProgress color="secondary" />
                        ) 
                    }
                    {
                        isSuccess && (
                        users?.length ? (
                            <ListContainer>
                                {
                                    users.map((e,i) => {
                                        let color = useColor(e.adminLevel);
                                       
                                    return (
                                        <Tooltip key={i} title={"Admin Level "+e.adminLevel}>
                                            <ListItemButton  divider component={Link} to={"/user/"+e.id}>
                                                <ListItemIcon>
                                                    <AccountCircleIcon color={color} />
                                                </ListItemIcon>
                                                <ListItemText>
                                                    {e.username}
                                                </ListItemText>
                                            </ListItemButton>
                                        </Tooltip>
                                    )
                                    })

                                }
                            </ListContainer>
                        ) : 
                            <p> No users exist </p>
                        )
                    }

                </Grid>
            </Box>
        </Container>
    );
}