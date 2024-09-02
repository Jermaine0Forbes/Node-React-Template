import React from 'react';

export const  useColor = (adminLevel) => {
    let color = '#e91e63';
    switch(adminLevel){
        case 1:
            color = '#3f51b5'
            break;
        case 2:
            color = '#009688'
            break;

        case 3:
            color = '#f44336'
            break;

    }
    return color;
}