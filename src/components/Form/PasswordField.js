import React from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


export default function PasswordField({readOnly, onChange, value, handleShowPassword, showPassword}) {

    return (
        <>
            {
                readOnly ?
                <TextField
                    data-test-id={'password-field'} 
                    disabled
                    type={showPassword ? "text" : "password"} 
                    InputProps={{ 
                        readOnly:readOnly,
                        endAdornment:
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleShowPassword}
                                >
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>,
                    }} 
                    label='password' 
                    name='password' 
                    defaultValue={value} 
                />
                :
                <TextField
                    data-test-id={'password-field'} 
                    type={showPassword ? "text" : "password"} 
                    InputProps={{ readOnly:readOnly,
                        endAdornment: 
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleShowPassword}
                                >
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>,
                    }} 
                    label='password' 
                    name='password' 
                    value={value ?? ''} 
                    onChange={(e) => {onChange(e)}}
                />
            }
        </>
    )
}