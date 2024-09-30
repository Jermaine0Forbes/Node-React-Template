import React, {useEffect, useState, useCallback, useRef, useContext} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useColor } from '../hooks/users';
import {fetchUser,updateUser, deleteUser, postProfImage} from '../services/users';
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
    const [openDialog, setOpenDialog] = useState(false);
    const formRef = useRef(null);
    const redirect = useNavigate();
    const { currentUser, setToken} = useContext(AuthContext);

    const { mutate: uploadProfImage, isSuccess: imageUploaded, data: uploadData } = useMutation({
        mutationFn: (data) => postProfImage(data),
        onSuccess: (data) => {
            console.log(data)
        }
    });

    const handleProfileImage = (evt) => {
        const target = evt.target;
        console.log('file')
        console.log(target.files);
        // uploadProfImage(target.files[0]);
        
    };

    const handleClose = useCallback(() => { setOpen(!open)}, [open]);

    const {isLoading, isSuccess, data} = useQuery('get-user', () => fetchUser(id), {
        // refetchOnMount:true,
    });

    const {mutate, isSuccess : updateSuccess, data: updateData } = useMutation({
        mutationFn: ({id:i, data: d}) => updateUser(i,d),
        onSuccess: async (data) => { 
            if(data?.status === 200){

                console.log("profile data:")
                console.log(data)
                const token = await data.text();
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
        if(currentUser?.id == id){
            console.log('this is the current user')
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
        if(updateData){
            console.log('updateData')
            console.log(updateData)
        }
        console.log('currentUser')
        console.log(currentUser)
    
    }, [data, id, del, updateData]);

    const handleDialog = () => setOpenDialog(!openDialog);

    return (
        <Container>
            <Typography variant="h3">Profile</Typography>
                <WhileLoading isLoading={isLoading}>
                        {
                             data ? (
                                <>
                                    <div>

                                        <AccountCircleIcon 
                                        style={{ color: useColor(level)}} 
                                        sx={{fontSize:'90px'}}
                                        onClick={handleDialog}
                                        />
                                        <Dialog open={openDialog}
                                         maxWidth="md"
                                         fullWidth
                                        onClose={handleDialog}
                                        >
                                            <DialogTitle style={{ padding:'1em'}}>Upload an image</DialogTitle>
                                                <IconButton
                                                    aria-label="close"
                                                    onClick={handleDialog}
                                                    sx={(theme) => ({
                                                        position: 'absolute',
                                                        right: 8,
                                                        top: 8,
                                                        color: theme.palette.grey[500],
                                                    })}
                                                    >
                                                <CloseIcon />
                                            </IconButton>
                                            <DialogContent dividers>
                                                {/* <DialogContentText> Drag and Drop</DialogContentText>
                                                <DialogContentText>OR</DialogContentText> */}
                                                <Button 
                                                variant="contained" 
                                                color="primary" 
                                                component="label"
                                                startIcon={<CloudUploadIcon />}
                                                >
                                                    Upload Profile Image
                                                    <input type="file" hidden onChange={handleProfileImage}/>

                                                </Button>
                                            </DialogContent>
                                        </Dialog>

                                    </div>
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
                                            { (currentUser?.adminLevel <= level || currentUser?.id == id ) && (

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