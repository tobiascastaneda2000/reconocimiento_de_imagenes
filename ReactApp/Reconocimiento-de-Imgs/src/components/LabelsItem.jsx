import { Img } from "./Img";
import './LabelsItem.css'
import { v4 as uuidv4 } from 'uuid';
import {  Link } from 'react-router-dom';
import { Card } from "react-bootstrap";
import { CardActionArea,  CardContent, Grid, Typography } from "@mui/material";




export const LabelsItem = (props) => {


  let indices = props.labels.map(label => (label.index));

  return (

    <Link to={`/historia/${indices}`}>
      <Card variant="outlined" className="card">
        <Grid container>
          <Grid item md={4} xs={4}>
            <Img props={props.nameFile}></Img>
          </Grid>
        </Grid>
        <CardContent>
          <Grid container>
            <Grid item md={4} xs={4}>
              <Typography gutterBottom component="div" variant="subtitle1">
                Etiquetas:
              </Typography>

            </Grid>
            <Grid item md={8} xs={8} >
              {props.labels.map(label => (
                <Typography key={uuidv4()} variant="body1" color="text.secondary" paragraph className="etiqueta" >
                 {'-'} {label.text}
                </Typography>
              ))}
            </Grid>
          </Grid>
        </CardContent>
        <CardActionArea>
            {/* <CardActions>
              <Buttonverhistoria indice={indices}> </Buttonverhistoria>
            </CardActions> */}
        </CardActionArea>
      </Card>
    </Link>)
}



