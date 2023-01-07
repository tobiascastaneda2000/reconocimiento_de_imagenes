import { Img } from "./Img";
import { useEffect, useState } from "react";
import './LabelsItem.css'
import { v4 as uuidv4 } from 'uuid';
import {  Link } from 'react-router-dom';
import  "./LabelsList.css";
import { Card } from "react-bootstrap";
import {Button} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CardActionArea,  CardContent, Typography, Box } from "@mui/material";
import {Sync, BlurCircular} from '@mui/icons-material/';
const theme = createTheme({
  typography: {
    
      fontSize: 20, 
      fontFamily: 'Signika' 
    
    
  },

  palette: {
    primary: {
      main: "#0cf76f",
      darker:"#44F01F",
    },
    secondary:{
      main:"#261ff0",
      light:'#0c80f7',

    }
  },
}
);



export const LabelsItem = (props) => {
  let indices = props.labels.map(label => (label.index));
  const [LoadTime, setLoadTime]=useState(true)
  useEffect(()=>{
    setTimeout(()=>{setLoadTime(false)},1000)
  },[])
  const windowSize=screen.width;

  return (
   

    <ThemeProvider theme={theme}> 
    <Card variant="outlined" className="card" sx={{display:"flexBox"}}>   
    {windowSize<700 && LoadTime?  <CardContent className="container2"> <Box className="img" sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}> 
   <BlurCircular color="primary" sx={{fontSize:60}}/>
    <Typography variant="h4" color="primary" sx={{fontFamily:"signika", textAlign:"center"}}> RELATO <br/> EN <br/>PRODUCCIÓN </Typography>
    </Box></CardContent>:<CardContent sx={{display:"flex", flexDirection:"column"}}>             
    <Img props={props.nameFile}></Img>  
    <Button href={`/historia/${indices}`} variant="outlined" color="primary" size="large" sx={{alignSelf:"center"}}>
    Ver relato
    </Button>           
    </CardContent>  }
   
    </Card>
   </ThemeProvider> )
}

          
          
        
        
          
           
              

            
            
          
           
       
        
     
       
        
    
 

