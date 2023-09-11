import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';


export default function EmailField({readyOnly, onChange, value}) {

    return (
        <>
            {
                readyOnly ?
                <TextField label="email" name="email" type='email' defaultValue={value} />
                :
                <TextField label="email" name="email" type='email' value={value} onChange={(e) => {onChange(e)}}/>
            }
        </>
    )
}