import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {LensBlur} from '@mui/icons-material/';



  export const Header = ()=>{
    const navigate = useNavigate();

    const redirect = ()=>navigate('/');
  
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{backgroundColor:"#44F01F", display: { xs: 'none', sm: 'flex'} }}>
          <Toolbar>            
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2, color:"#261ff0" }}   
              onClick={redirect}
            >
              <LensBlur fontSize="large"/>
            </IconButton>            
            <Typography
              variant="h3"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', color:"#261ff0" } }}
            >
              Poética Aleatoria
            </Typography>
            
          </Toolbar>
        </AppBar>
      </Box>
    );
}