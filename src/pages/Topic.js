import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function Topic()
{
    
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
                        <Button   type='submit' variant='contained' color="secondary">Submit</Button>
                    </Grid>
                </Box>
        </Container>
    );
}