import React, {useEffect, useState} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import EmailField from '../components/Form/EmailField';
import UsernameField from '../components/Form/UsernameField';
import PasswordField from '../components/Form/PasswordField';
import Button from '@mui/material/Button';
import Section from '../components/Section';
import { useMutation } from '@tanstack/react-query';
import { faker } from '@faker-js/faker';
import { postUser } from '../services/users';
import UserAlert from '../components/Snackbar/UserAlert';
import SelectAdminLevel from '../components/Form/SelectAdminLevel';
import WhileLoading from '../components/Loading/WhileLoading';

export default function Create()
{
    const [open, setOpen] = useState(false);
    const [level, setLevel] = useState(faker.number.int({max:4,min:1}));
    const [firstName, setFirstName] = useState(faker.person.firstName());
    const [lastName, setLastName] = useState(faker.person.lastName());
    const [showPass, setShowPass ] = useState(false);
    const [noErrors, setNoErrors] = useState(true);

    const togglePass = () => { setShowPass(!showPass)};

    const {isLoading, isSuccess, isError, mutate} = useMutation({
        mutationFn: (data) => postUser(data),
        onSuccess: (data) => {
            // console.log(data)
            if(data?.status !== 200){

                setNoErrors(false);
            }
        }
    });

    useEffect(() => isSuccess && setOpen(!open) , [isSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {};
        const form = new FormData(e.target);
        for (const [key, value] of form.entries()){
            data[key] = value;
        };

        // console.log(data)
        mutate(data)
    }

    const handleClose = () => { setOpen(!open)};
     
    return (
        <Container>
                <WhileLoading isLoading={isLoading}>
                    <Section>
                        <Typography variant="h3">Create</Typography>
                        <Box component={'form'} onSubmit={(e) => handleSubmit(e)} xs={3} >
                            <Grid item xs={3}>
                                <EmailField readOnly value={firstName+"@example.com"}/>
                                <UsernameField readOnly value={firstName+" "+lastName}/>
                            </Grid >
                            <Grid item xs={3}>
                                <SelectAdminLevel
                                    level={level}
                                    setLevel={setLevel}
                                    readOnly
                                />
                            </Grid >
                            <Grid >
                                <PasswordField  value="password" showPassword={showPass} handleShowPassword={togglePass}/>
                            </Grid>
                            <Grid>
                                <Button type='submit' variant='contained' color="secondary">Submit</Button>
                            </Grid>
                        </Box>
                    </Section>
                </WhileLoading>

            {

                isSuccess && (

                    noErrors ? 
                                        <UserAlert
                        isOpen={open} 
                        duration={10000} 
                        onClose={handleClose}
                        status="success"
                    >
                        User <strong>{firstName}</strong> has been created!
                    </UserAlert>

                    :
                    <UserAlert
                        isOpen={open} 
                        duration={10000} 
                        onClose={handleClose}
                        status="error"
                    >
                        User <strong>{firstName}</strong> could not be created
                    </UserAlert>

                )

            }
        </Container>
    );
}