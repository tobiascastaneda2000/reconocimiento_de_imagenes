import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import eo from 'date-fns/locale/eo'
import {parse} from 'date-fns'

import {
  collection,
  getDocs,
  getFirestore
} from "firebase/firestore";
import { LabelsItem } from "./LabelsItem";

import "./LabelsList.css";

import { Grid, Pagination } from "@mui/material";
import ReactAudioPlayer from 'react-audio-player';


export const LabelsList = () => {
  // 
  const [ImagenesEtiquetadas, setImagenesEtiquetadas] = useState([]);
  const [ReferenciaImagenes, setReferenciaImagenes] = useState([]);
  const [count, setCount] = useState(1);
  const { id } = useParams();

  const num = 9;
  const [page, setPage] = useState(1);
  const handlePage = (event, value) => {
    setPage(value);    
  };

  useEffect(() => {
    


    const db = getFirestore()
      const queryCollection = collection(db, "ImagenesEtiquetadas");
      getDocs(queryCollection)
        .then((resp) =>
          setImagenesEtiquetadas(resp.docs.map((tag) => (tag.data())))
        )
        .catch((err) => console.log(err))
        .then( (resp)  => { 
          let nuevasImagenes=ImagenesEtiquetadas.map((image,index)=>{

            let year=image.nameFile.slice(30,34);  
            let dia=image.nameFile.slice(8,11);
            let mes=image.nameFile.slice(4,7);  
            let hora=image.nameFile.slice(11,13);
            let minuto=image.nameFile.slice(14,16);
            let segundos=image.nameFile.slice(17,19);
            let mesIndex
            switch(mes)
            { case "Jan":
               mesIndex =0
               break;
               case "Feb":
                mesIndex=1
                break;
                case"Mar":
                mesIndex=2
                break;
                case"Apr":
                mesIndex=3
                break;
                case"May":
                mesIndex=4
                break;
                case"Jun":
                mesIndex=5
                break;
                case"Jul":
                mesIndex=6
                break;
                case"Aug":
                mesIndex=7
                break; 
                case"Sep":
                mesIndex=8
                break;
                case"Oct":
                mesIndex=9
                break;
                case"Nov":
                mesIndex=10
                break;
                case"Dec":
                mesIndex=11
                break;
              }
          
          
          console.log("este es el año "+ year + "este es el día " + dia + " este es el el mes "+ mesIndex + "esta es la hora "+hora + "estos son los minutos"+minuto +"estos son los segundos " +segundos)  
          let fecha=new Date(year, mesIndex, dia, hora, minuto, segundos );
          console.log(fecha);
          return Object.defineProperty(image,"date", {
            value:fecha,
            writable: true,
            enumerable: true,
            configurable: true
          })
          }  )
          console.log("este es el tipo de dato de nueasImagenes "+ typeof nuevasImagenes)
          console.log(nuevasImagenes)
      
           let imagenesOrdenadas=nuevasImagenes.sort((a,b)=> {return b.date - a.date});    
          setReferenciaImagenes(imagenesOrdenadas);
          
         


  })
        .finally();
}, );
  

 




  return (
    <div>
 
    <Grid container className="labels-list">
      {
      ReferenciaImagenes.map((image, index) => (
       


        <Grid key={index} item md={4} xs={12}>
          <LabelsItem key={index} nameFile={image.nameFile} labels={image.labels} />
        </Grid>
      ))}
    </Grid>
    {/* <Pagination count={count} onChange={handlePage} className='pagination'></Pagination>         */}
    </div>
  );
};
