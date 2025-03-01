import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {json} from "../../utils/index";

const useStyles = makeStyles(() => ({
    title: {
        // display: "flex",
        color: "white",
        // flexGrow: 1,
        "& a": {
            color: "white",
            textDecoration: "none"
        }
    },
    entry: {
        marginRight:'15px',
        flewGrow: 0,
       
        fontSize:'1em',
        textTransform:'capitalize',
    },
    entryBlock: {
        display: 'flex',
        alignItems: 'center',
        padding: "1em",
       
        '&> p': {
            textTransform:'uppercase',
            fontSize: "0.8em"
        },

        "& .MuiTextField-root":{
            width:"100%",
            marginLeft: "1em",
        }

    },
    entryHead: {
        fontSize:"1.2em",
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: "10px 10px 0 0",
        padding: "1em", 
        marginBottom:"2px",
        
    },
    entrySection: {
       
        color:'white',

        "& .MuiFilledInput-root": {
            backgroundColor:"transparent",
            
        },
        "& .MuiFilledInput-underline:before": {
            borderColor: "white"
        }
    }, 
    entryBody: {
        backgroundColor: '#4d4d4d',
        borderRadius: "0 0 10px 10px", 
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        marginBottom: "1em"
    },
    entryOrder: {
        backgroundColor: 'white',
    },

    entryTag: {
        position:'relative'
    },

    hidden: {
        display: "none"
    },
    tagField: {
        width:'100%'
    }
}));

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
];


export default function Entry({num = 0, data = {}, handleChange, id = null})
{

    const [tags, setTags] = useState([]);
    const [savedTags, setSavedTags] = useState([]);
    const classes = useStyles();
    const handleTags = (evt, value) => {
        // console.log(evt)
        console.log(value)
        setTags([json(value)]);
       
    }

    useEffect( () => {
        handleChange();
        if(data?.tags && data?.tags.length > 0){
            const tagsSaved = [];
            for(let i = 0 ; i < data.tags.length; i++){
                tagsSaved.push(data.tags[i])
            }
            setSavedTags(tagsSaved);
        }
    }, [tags])
    
    return (
        <Box component={'section'} className={classes.entrySection}>
            <Grid className={classes.entryHead}>
            <Chip
                label={num}
                component="div"
                href="#basic-chip"
                variant="outlined"
                className={classes.entryOrder}
            />
            </Grid>
            <Grid className={classes.entryBody}>
                <Grid className={classes.entryBlock}>
                    <Typography>Title:</Typography>

                    {
                        data?.id && (

                            <TextField
                            name={"id"}
                            type="hidden"
                            className={classes.hidden}
                            hidden
                            value={data?.id}
                            >
                            </TextField>

                        ) 
                    }
                    
                    <TextField
                    variant="filled"
                    size="small"
                    margin="normal"
                    className={classes.title}
                    name={"title"}
                    // name={"title-"+num}
                    onChange={() => handleChange()}
                    value={data?.title ?? ''}
                    >
                    </TextField>
                </Grid>
                <Grid className={classes.entryBlock}>
                    <Typography>Entry:</Typography>
                    <TextField
                        label="Enter the answer"
                        multiline
                        variant='filled'
                        className={classes.entry}
                        minRows={3}
                        name={"entry"}
                        // name={"entry-"+num}
                        onChange={() => handleChange()}
                        value={data?.entry ?? ''}
                    >
                    </TextField>
                </Grid>
                <Grid className={[classes.entryBlock,classes.entryTag]}>
                    <Typography>Tags:</Typography>
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        freeSolo
                        disablePortal={true}
                        options={data?.tagList ?? []}
                        // options={data?.tagList ?? []}
                        className={classes.tagField}
                        getOptionLabel={(option) => {

                            console.log('option')
                            console.log(option)
                            // Value selected with enter, right from the input
                            if (typeof option === 'string') {
                                return  option;
                            }
                            // Add "xxx" option created dynamically
                            if (option.inputValue) {
                                return { name: option.inputValue, id: null};
                            }
                            // Regular option
                            return option.title;
                        }}
                        // defaultValue={[top100Films[1]]}
                        defaultValue={savedTags}
                        
                        onChange={handleTags}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="filled"
                            label="Multiple values"
                            placeholder="Tags"
                        />
                        )}
                    />

                    <TextField type="hidden" className={classes.hidden} value={tags} name={`tags[]`} />
                </Grid>
                <TextField
                        type="hidden" 
                        className={classes.hidden} 
                        name={"order"}
                        value={data?.id ?? num}
                    />
                <TextField
                        type="hidden" 
                        className={classes.hidden} 
                        name={"topicId"}
                        value={id}
                    />
            </Grid>

        </Box>
    );
}