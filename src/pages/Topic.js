import React, {useContext} from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useColor } from '../hooks/users';
import {AuthContext} from '../providers/AuthProvider';
import { useMutation } from 'react-query';
import { createTopic } from '../services/topic';

export default function Topic()
{
        const {getUser, token} = useContext(AuthContext);
        const user = getUser(token);
        const color = useColor(user?.adminLevel);
        const {isLoading, mutate} = useMutation({
            mutationFn: (data) => createTopic(data),
            onSuccess: async (data) => {
                if(data.status === 200){
                    const token =  await data.text();
                    setToken(token)
                    localStorage.setItem('usr', token);
                    navigate('/');
                } else if (data.status === 400){
                    const errArr = await data.json();
                    setErrors(errArr);
                }
            },
            onError: async (err) => {
                console.log(err)
            }
        });

        const handleSubmit = (e) => {
            e.preventDefault();
            setErrors(null);
    
            const data = {};
            const form = new FormData(e.target);
            for (const [key, value] of form.entries()){
                data[key] = value;
            };
            mutate(data)
        }
    
    return (
        <Container>
                <Box component={'form'} onSubmit={(e) =>console.log(e)} >
                    <Typography variant="h3">Create a new topic</Typography>
                    {/* <Typography variant="subtitle2" color="error">{errors?.other}</Typography> */}
                    <Grid>
                        <TextField label="title" name="title" type='text'></TextField>
                        {/* <Typography variant="subtitle2" color="error">{errors?.email}</Typography> */}
                    </Grid>    
                    <Grid>
                        <FormGroup>
                            <FormControlLabel control={<Switch />} label="is it a subtopic" />
                        </FormGroup>
                    </Grid>

                    <Grid >
                        <Button   type='submit' variant='contained' style={{ backgroundColor:color, color:"white"}}>Submit</Button>
                    </Grid>
                </Box>
        </Container>
    );
}