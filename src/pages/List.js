import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListContainer from '@mui/material/List';
import { useQuery } from 'react-query';
import { fetchUsers } from '../services/users';
import { useColor } from '../hooks/users';
import UserListItem from "../components/List/UserListItem";
import WhileLoading from '../components/Loading/WhileLoading';

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
                    <WhileLoading loading={isLoading}>
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
                    </WhileLoading>

                </Grid>
            </Box>
        </Container>
    );
}