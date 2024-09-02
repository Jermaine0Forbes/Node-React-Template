import React, {useEffect, useState, useCallback, useRef, useContext} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useColor } from '../hooks/users';
import {fetchUser,updateUser, deleteUser} from '../services/users';
import { useParams,useNavigate } from "react-router-dom";
import { useQuery, useMutation } from 'react-query';
import WhileLoading from '../components/Loading/WhileLoading';
import Section from '../components/Section';
import SelectAdminLevel from '../components/Form/SelectAdminLevel';
import EmailField from '../components/Form/EmailField';
import UsernameField from '../components/Form/UsernameField';
import ConfirmButton from '../components/Button/ConfirmButton';
import {AuthContext} from '../providers/AuthProvider';
import UserAlert from '../components/Snackbar/UserAlert';



export default function Profile()
{
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const [level, setLevel] = useState(4);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const formRef = useRef(null);
    const redirect = useNavigate();
    const { currentUser, setToken} = useContext(AuthContext);

    console.log('currentUser')
    console.log(currentUser)

    const handleClose = useCallback(() => { setOpen(!open)}, [open]);

    const {isLoading, isSuccess, data} = useQuery('get-user', () => fetchUser(id), {
        // refetchOnMount:true,
    });

    const {mutate, isSuccess : updateSuccess } = useMutation({
        mutationFn: ({id:i, data: d}) => {updateUser(i,d)},
        onSuccess: (data) => { 
            
            if(data.status === 200){
                console.log(data)
                const token =  data.text();
                setToken(token)
                localStorage.setItem('usr', token);
                setOpen(true)
            }

        }
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
        if(currentUser?.username == name){
            updatedUser.currentUser = true;
        }
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
        if(data == 400 || del == 200 ) {
            redirect('/list');
        }
    }, [data, id, del]);


    return (
        <Container>
            <Typography variant="h3">Profile</Typography>
                <WhileLoading isLoading={isLoading}>
                        {
                             data ? (
                                <>
                                    <AccountCircleIcon style={{ color: useColor(level)}} sx={{fontSize:'90px'}}/>
                                    <Box component={'form'} ref={formRef} >
                                        <Grid item xs={4}>
                                            <Grid>
                                                <EmailField value={email} onChange={handleChange}/>
                                            </Grid>    
                                            <Grid>
                                                <UsernameField value={name} onChange={handleChange}/>
                                            </Grid>                    
                                            <Grid >
                                                <SelectAdminLevel
                                                    level={level}
                                                    setLevel={setLevel}
                                                />
                                            </Grid>
                                            { currentUser && (currentUser?.adminLevel <= level || currentUser?.username == name ) && (

                                                <Section  sx={{my:'16px'}}>
                                                    <Grid container spacing={2} gap={4}>
                                                        <Grid item>
                                                            <Button type='submit' variant='contained' color="secondary"  onClick={(e) => handleSubmit(e)}>Update</Button>
                                                        </Grid>
                                                        <Grid item>
                                                            <ConfirmButton
                                                                type='delete'
                                                                loading={deleteLoading}
                                                                dialogTitle={`Delete ${name}?`}
                                                                dialogDescription={'Are you sure you want to delete this user?'}
                                                                handleConfirmation={handleDelete}
                                                            >
                                                                Delete    
                                                            </ConfirmButton>    
                                                        </Grid>
                                                    </Grid>
                                                </Section>
                                            )

                                            }
                                        </Grid>
                                    </Box>
                                </>
                            )
                            :
                            <span> something went wrong</span>
                        }
                    </WhileLoading>
                    {
                        updateSuccess && (
                            <UserAlert
                                isOpen={open} 
                                duration={10000} 
                                onClose={handleClose}
                                status="success"
                                >
                                <strong>{name}</strong> has been updated!
                            </UserAlert>
                        )
                    }

        </Container>
    );
}