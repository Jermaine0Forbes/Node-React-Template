import React, {useEffect, useState, useCallback, useRef, useMemo} from 'react';
import { 
    Container, Grid, Box, 
    Typography,TextField, Button, 
    CircularProgress, FormControl,
    Select, MenuItem, InputLabel,
    Snackbar
} from '@material-ui/core';
import { Alert } from '@mui/material';
import { useParams,useNavigate } from "react-router-dom";
import { useQuery, useMutation } from 'react-query';
import Layout2 from './Layout2';

const fetchUser = async (id) => {
    const res = await fetch(process.env.URL+'/api/user/'+id);
    return res.json();

}

const updateUser = async (id,data) => {
    return fetch(process.env.URL+'/api/user/'+id, {
        method: "PUT",
        headers:{
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .catch(err => { console.log(err)});
}


export default function Update()
{
    const { id  } = useParams();
    const [open, setOpen] = useState(false);
    const [level, setLevel] = useState(1);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    console.log(id)

    const handleClose = () => { setOpen(!open)};
    const {isLoading, isSuccess, data, dataUpdatedAt} = useQuery('get-user', () => fetchUser(id), {
        refetchOnMount:true,
    });

    useEffect( () => {
        if(data?.id !== id && data ) {
            console.log("data updated at:"+dataUpdatedAt)
          
            setName(data?.username);
            setEmail(data?.email);
            setLevel(data?.adminLevel)
        }

        console.log("data is: ")
        console.log(data)
        console.log("user currently is: "+data?.username)
    }, [data, id, dataUpdatedAt]);

    const {mutate, isSuccess : updateSuccess } = useMutation({
        mutationFn: ({id:i, data: d}) => {updateUser(i,d)},
        onSuccess: () => { setOpen(true)}
    })


    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        const updatedUser = {};
        const form = new FormData(e.target);
        for (const [key, value] of form.entries()){
            updatedUser[key] = value;
        };
        console.log('data')
        console.log(updatedUser)
        mutate({ id: id, data: updatedUser});
    },[data]);

    const handleChange = (e) => {
        e.preventDefault();
        // console.log(formRef.current)
        switch(e.target.name)
        {
            case 'email':
                setEmail(e.target.value)
                break;
            default:
                setName(e.target.value)
        }
       
    };

    return (
        <Layout2>
            <Container>
                <Box component={'form'}  onSubmit={(e) => handleSubmit(e)}>
                <Typography variant="h3">Update</Typography>
                    <Grid item xs={4}>
                        {
                            isLoading && (
                            <CircularProgress color="secondary" />
                            ) 
                        }
                        {
                            isSuccess && data && (
                                <>
                                <Grid>
                                    <TextField label="email" name="email" type='email' value={email} onChange={(e) => {handleChange(e)}}></TextField>
                                </Grid>    
                                <Grid>
                                    <TextField label="username" name="username" value={name} onChange={(e) => {handleChange(e)}} ></TextField>
                                </Grid>                    
                                <Grid >
                                    <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Admin Level</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="adminLevel"
                                        name="adminLevel"
                                        value={level}
                                        onChange={ (e) =>{ setLevel(e.target.value)} }
                                    >
                                        <MenuItem value={1}>Admin I</MenuItem>
                                        <MenuItem value={2}>Admin II</MenuItem>
                                        <MenuItem value={3}>Admin III</MenuItem>
                                        <MenuItem value={4}>Admin IV</MenuItem>
                                    </Select>
                                    </FormControl>
                                </Grid>
                                <Grid >
                                    <Button   type='submit' variant='contained' color="secondary">Submit</Button>
                                </Grid>
                                
                                </>
                            )
                        }
                        {
                            updateSuccess && (
                                <Snackbar open={open} autoHideDuration={10000} onClose={handleClose} >
                                    <Alert  severity="success" sx={{ width: '100%' }}>
                                        <strong>{name}</strong> has been updated!
                                    </Alert>
                                </Snackbar>
                            )
                        }
                    </Grid>
                </Box>
            </Container>
        </Layout2>
    );
}