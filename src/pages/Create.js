import React, {useEffect, useState} from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import EmailField from '../components/Form/EmailField';
import UsernameField from '../components/Form/UsernameField';
import PasswordField from '../components/Form/PasswordField';
import Button from '@material-ui/core/Button';
import Section from '../components/Section';
import { useMutation } from 'react-query';
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

    const togglePass = () => { setShowPass(!showPass)};

    const {isLoading, isSuccess, mutate} = useMutation({
        mutationFn: (data) => postUser(data),
    });

    useEffect(() => isSuccess && setOpen(!open) , [isSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {};
        const form = new FormData(e.target);
        for (const [key, value] of form.entries()){
            data[key] = value;
        };
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
                                <PasswordField readOnly value="123" showPassword={showPass} handleShowPassword={togglePass}/>
                            </Grid>
                            <Grid>
                                <Button type='submit' variant='contained' color="secondary">Submit</Button>
                            </Grid>
                        </Box>
                    </Section>
                </WhileLoading>

            {
                isSuccess && (
                    <UserAlert
                        isOpen={open} 
                        duration={10000} 
                        onClose={handleClose}
                        status="success"
                    >
                        User <strong>{firstName}</strong> has been created!
                    </UserAlert>
                )
            }
        </Container>
    );
}