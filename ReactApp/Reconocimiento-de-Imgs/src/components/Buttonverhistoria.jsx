import { Button } from '@mui/material';
import React from 'react'
import { useNavigate} from 'react-router-dom'

import './Buttonverhistoria.css';

export const Buttonverhistoria = (props)=>{

    const navigate= useNavigate();

    const linkTo=()=>{
        navigate(`/historia/${Object.values(props)}`);
    }
    /*let nuevoIndices= props.maps(=>(element){ element})*/
    return (<Button onClick={linkTo} variant='contained'>ver historia</Button>)
}