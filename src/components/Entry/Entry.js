import React, { useState } from 'react';
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

    hidden: {
        display: "none"
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
    const classes = useStyles();
    const handleTags = (evt, value) => {
        // console.log(value)
        setTags([json(value),...tags]);
        if(tags.length > 0) {
            handleChange();
        }
    }
    
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
                <Grid className={classes.entryBlock}>
                    <Typography>Tags:</Typography>
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        options={top100Films}
                        getOptionLabel={(option) => option.title}
                        defaultValue={[top100Films[1]]}
                        
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
                    {
                        (tags.length > 0) ? (

                            tags.map((e,i) => <TextField type="hidden" className={classes.hidden} value={e} key={i} name={`tags[]`} />)
                        ):
                        ( <TextField type="hidden" className={classes.hidden} name={`tags[]`}/>)

                    }
                    {/* <TextField
                        label="Enter any tags"
                        multiline
                        variant='filled'
                        className={classes.entry}
                        minRows={1}
                        name={"tags"}
                        // name={"tags-"+num}
                        onChange={() => handleChange()}
                        value={data?.tags ?? ''}
                    >
                    </TextField> */}
                </Grid>
                <TextField
                        type="hidden" 
                        className={classes.hidden} 
                        name={"order"}
                        value={num}
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