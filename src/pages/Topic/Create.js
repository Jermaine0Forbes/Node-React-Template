import React, {useContext, useState, useEffect} from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Collapse from '@mui/material/Collapse';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Autocomplete from '@mui/material/Autocomplete';
import Switch from '@material-ui/core/Switch';
import { useColor } from '../../hooks/users';
import {AuthContext} from '../../providers/AuthProvider';
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from 'react-query';
import { createTopic, fetchTopics } from '../../services/topic';

export default function TopicCreate()
{
        const {getUser, token} = useContext(AuthContext);
        const user = getUser(token);
        const color = useColor(user?.adminLevel);
        const [topics, setTopics] = useState([]);
        const [disableSwitch, setDisableSwitch] = useState(true);
        const [subTop, setSubTop] = useState(false);
        const [parentId, setParentId] = useState(null);
        const [form, setForm] = useState({});
        const redirect = useNavigate();
        const {data: topicsData} = useQuery(['fetch-topics', subTop], () => fetchTopics(user?.id));
        const {isLoading, mutate} = useMutation({
            mutationFn: (data) => createTopic(data),
            onSuccess: async (data) => {
                
                if(data.status === 200){
                    const { topic } = await data.json();
                    console.log(topic)
                    redirect('/topic/'+topic?.id);
                } 
            },
            onError: async (err) => {
                console.log(err)
            }
        });

        useEffect( () => {
            let td = JSON.stringify(topicsData);
            let t = JSON.stringify(topics);
            if(td && td !== t) {
                 td = topicsData.map((e) =>( {label: e.title, id: e.id}))
                setDisableSwitch(false);
                setTopics(td);
            }

        }, [topicsData]);

        const handleForm = (e) => {
            const field = e.target;
            // console.log('field')
            // console.log(field.id)
            let value = field.name === "subtopic" ? field.checked :field.value;
            let name = field?.id.includes('combo') ? 'parentTopicId' : field.name;
            if(field.name === "subtopic"){
                setSubTop(value);
            }

            const formData = {...form, [name] : value  }
            console.log(formData)
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
                            <FormControlLabel 
                                control={<Switch disabled={disableSwitch}  inputProps={{name:"subtopic"}} onChange={handleForm}/>} 
                                label="is it a subtopic" 
                            />
                            <Collapse in={subTop}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={topics}
                                    sx={{ width: 300 }}
                                    onChange={handleForm}
                                    renderInput={(params) => <TextField {...params} label="Topics" />}
                                    renderOption={(props,option) =>( 
                                    <li 
                                    {...props} 
                                    key={option.id}
                                    value={option.id}
                                    >{option.label}</li>)}
                                />
                            </Collapse>
                        </FormGroup>
                    </Grid>

                    <Grid >
                        <Button   type='submit' variant='contained' style={{ backgroundColor:color, color:"white"}}>Submit</Button>
                    </Grid>
                </Box>
        </Container>
    );
}