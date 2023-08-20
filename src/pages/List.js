import React, { useState, useEffect } from 'react';
import { 
    Container, Grid, Box,
    CircularProgress, Typography
} from '@material-ui/core';
import { 
    List as ListContainer,ListItemIcon,
    ListItemText,ListItemButton,Tooltip  
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link} from "react-router-dom";
import { useQuery } from 'react-query';


const fetchUsers = async () => {
   const res = await fetch(process.env.URL+'/api/users');
   return res.json();
}

export default function List()
{
    const [users,setUsers] = useState([]);
    const {isLoading, isSuccess, data} = useQuery('users', fetchUsers, {
        staleTime: Infinity
    });
    useEffect(() => { data?.users?.length && setUsers(data.users)}, [isSuccess]);
    console.log(data)
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
                                        let color = 'secondary';
                                        switch(e.adminLevel){
                                            case 1:
                                                color = 'primary'
                                                break;
                                            case 2:
                                                color = 'success'
                                                break;

                                            case 3:
                                                color = 'info'
                                                break;

                                        }
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