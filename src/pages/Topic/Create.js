import React, {useContext, useState} from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useColor } from '../../hooks/users';
import {AuthContext} from '../../providers/AuthProvider';
import { useNavigate } from "react-router-dom";
import { useMutation } from 'react-query';
import { createTopic } from '../../services/topic';

export default function TopicCreate()
{
        const {getUser, token} = useContext(AuthContext);
        const user = getUser(token);
        const color = useColor(user?.adminLevel);
        const [form, setForm] = useState({})
        const redirect = useNavigate();
        const {isLoading, mutate} = useMutation({
            mutationFn: (data) => createTopic(data),
            onSuccess: async (data) => {
                
                if(data.status === 200){
                    const topic = await data.json();
                    console.log(topic)
                    redirect('/topic/'+topic?.id);
                } 
            },
            onError: async (err) => {
                console.log(err)
            }
        });

        const handleForm = (e) => {
            const field = e.target;
            let value = field.name === "subtopic" ? field.checked :field.value;
            const formData = {...form, [field.name] : value  }
            // console.log(formData)
            setForm(formData)
         };

        const handleSubmit = (e) => {
            e.preventDefault();
            const data = {...form, userId: user?.id};
            // console.log(data)
            mutate(data)
        }
    
    return (
        <Container>
                <Box component={'form'} onSubmit={(e) => handleSubmit(e)} >
                    <Typography variant="h3">Create a new topic</Typography>
                    {/* <Typography variant="subtitle2" color="error">{errors?.other}</Typography> */}
                    <Grid>
                        <TextField label="title" name="title" type='text' onChange={handleForm}></TextField>
                        {/* <Typography variant="subtitle2" color="error">{errors?.email}</Typography> */}
                    </Grid>    
                    <Grid>
                        <FormGroup>
                            <FormControlLabel control={<Switch  inputProps={{name:"subtopic"}} onChange={handleForm}/>} label="is it a subtopic" />
                        </FormGroup>
                    </Grid>

                    <Grid >
                        <Button   type='submit' variant='contained' style={{ backgroundColor:color, color:"white"}}>Submit</Button>
                    </Grid>
                </Box>
        </Container>
    );
}