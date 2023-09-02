import React, {useEffect, useState, useCallback, useRef} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useColor } from '../hooks/users';
import {fetchUser,updateUser, deleteUser} from '../services/users';
import { useParams,useNavigate } from "react-router-dom";
import { useQuery, useMutation } from 'react-query';



export default function Profile()
{
    const { id  } = useParams();
    const [open, setOpen] = useState(false);
    const [level, setLevel] = useState(1);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const formRef = useRef(null);
    const redirect = useNavigate();

    const handleClose = useCallback(() => { setOpen(!open)}, [open]);

    const {isLoading, isSuccess, data} = useQuery('get-user', () => fetchUser(id), {
        refetchOnMount:true,
    });

    const {mutate, isSuccess : updateSuccess } = useMutation({
        mutationFn: ({id:i, data: d}) => {updateUser(i,d)},
        onSuccess: () => { setOpen(true)}
    })

    const { mutate: deleting , isLoading: deleteLoading, data: del } = useMutation({
        mutationFn: (id) =>  deleteUser(id),
        onSuccess: () => {   
            if(del == 200 ){ 
            redirect('/list')
        };
    }
    });

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        const updatedUser = {};
        const form = new FormData(formRef.current);
        for (const [key, value] of form.entries()){
            updatedUser[key] = value;
        };
        mutate({ id: id, data: updatedUser});
    },[data]);

    const handleChange = (e) => {
        e.preventDefault();
        switch(e.target.name)
        {
            case 'email':
                setEmail(e.target.value)
                break;
            default:
                setName(e.target.value)
        }
    };

    const handleDelete = useCallback((e) => { e.preventDefault(); deleting(id)},[id]);

    useEffect( () => {
        if(data?.id !== id && data ) {
            setName(data?.username);
            setEmail(data?.email);
            setLevel(data?.adminLevel)
        }
        if(data == 500 || del == 200 ) {
            redirect('/list');
        }
    }, [data, id, del]);


    return (
        <Container>
            <Typography variant="h3">Profile</Typography>

                    {
                        isLoading && (
                            <CircularProgress color="secondary" />
                        ) 
                    }
                    {
                        isSuccess && data && (
                            <>
                                <AccountCircleIcon color={useColor(level)} sx={{fontSize:'90px'}}/>
                                <Box component={'form'} ref={formRef} >
                                    <Grid item xs={4}>
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
                                        <Box component={'section'}  sx={{my:'16px'}}>
                                            <Grid container spacing={2} gap={2}>
                                                <Grid item>
                                                    <Button type='submit' variant='contained' color="secondary"  onClick={(e) => handleSubmit(e)}>Save</Button>
                                                </Grid>
                                                <Grid item>
                                                    <LoadingButton type='delete' loading={deleteLoading} variant='contained'  onClick={(e) => handleDelete(e)}>Delete</LoadingButton>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                </Box>
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

        </Container>
    );
}