import React, {useContext, useState, useEffect} from 'react';
import { useQuery, useMutation } from 'react-query';
import {useParams} from "react-router-dom";
import { makeStyles } from '@material-ui/core';

// Components
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';
import UserAlert from '../../components/Snackbar/UserAlert';

//Hooks
import { useColor } from '../../hooks/users';

//Providers
import {AuthContext} from '../../providers/AuthProvider';

// Services
import { fetchTag, updateTag } from '../../services/tags';


const useStyles = makeStyles(() => ({
    tagTitle: {
        marginLeft: "1em",
        marginBottom: "1em",

    },

}));


export default function TagEdit()
{
    const {getUser, token} = useContext(AuthContext);
    const user = getUser(token);
    const color = useColor(user?.adminLevel);
    const [tag, setTag] = useState('');
    const [open, setOpen] = useState(false);
    const {id} = useParams();
    const classes = useStyles();

    const {isLoading,  data} = useQuery({
        queryKey:['get-tag'], 
        queryFn:() => fetchTag(id),
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        setTag(data?.name);
    },[data]);

    const { mutate, isSuccess} = useMutation({
        mutationFn: (data) => updateTag(data),
        onSuccess: async (data) => {

            if(data.ok){
                setOpen(true);
            }
            console.log(data)
        },
    });

    const handleSubmit = () => {
        const data = {
            id,
            name: tag,
        };
        mutate(data);
    }

    const handleClose = () => setOpen(!open) ;

    return (
        <Container>
                <Box component={'main'}  >
                        <Typography variant="h3">Tag:
                            <TextField 
                                    name="tag" 
                                    type='text' 
                                    value={tag ?? ''}
                                    onChange={e => setTag(e.target.value)}
                                    variant="standard"
                                    size="small"
                                    margin="normal"
                                    className={classes.tagTitle}
                                />
                        </Typography>

                        <Grid component={'section'}>
                            <Button   
                                type='submit' 
                                variant='contained' 
                                style={{ backgroundColor:color, color:"white"}}
                                onClick={handleSubmit}
                            >
                                Save changes
                            </Button>
                        </Grid>
                </Box>
                {
                    isSuccess && (
                        <UserAlert
                            isOpen={open} 
                            duration={10000} 
                            onClose={handleClose}
                            status="success"
                            >
                            <strong>{tag}</strong> has been updated!
                        </UserAlert>
                    )
                }
        </Container>
        
    );
}