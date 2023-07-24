import React from 'react';
import { 
    Container, Grid, Box,
    Typography, CircularProgress

} from '@material-ui/core';
import { useParams,useNavigate } from "react-router-dom";
import { useQuery } from 'react-query';

const fetchUser = async (id) => {
    const res = await fetch(process.env.URL+'/api/user/'+id);
    return res.json();

}


export default function Update()
{
    const { id  } = useParams();
    console.log(id)
    // const redirect = useNavigate();
    
    // if(!Number.isInteger(id)){
    //     console.log(id+" is not a number")
    //     redirect("/list");
    // }
    const {isLoading, isSuccess, data} = useQuery('users', () => fetchUser(id));

    return (
        <Container>
            <Box>
            <Typography variant="h3">Update</Typography>
                <Grid item xs={4}>
                    {
                        isLoading && (
                        <CircularProgress color="secondary" />
                        ) 
                    }
                    {
                        isSuccess && (
                            <p>{data.username}</p>
                        )
                    }
                </Grid>
            </Box>
        </Container>
    );
}