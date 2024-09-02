import React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Tooltip from '@mui/material/Tooltip';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link} from "react-router-dom";

export default function UserListItem({ level, id, color, name})
{
    return (
        <Tooltip  title={"Admin Level "+level}>
        <ListItemButton  divider component={Link} to={"/user/"+id}>
            <ListItemIcon>
                <AccountCircleIcon style={{ color: color}} />
            </ListItemIcon>
            <ListItemText>
                {name}
            </ListItemText>
        </ListItemButton>
    </Tooltip>
    )
}
