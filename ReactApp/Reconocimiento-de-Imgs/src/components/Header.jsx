import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { HomeOutlined } from '@mui/icons-material';


  export const Header = ()=>{
    const navigate = useNavigate();

    const redirect = ()=>navigate('/');
  
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>            
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}   
              onClick={redirect}
            >
              <HomeOutlined fontSize="large"/>
            </IconButton>            
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Poesía Aleatoria
            </Typography>
            
          </Toolbar>
        </AppBar>
      </Box>
    );
}