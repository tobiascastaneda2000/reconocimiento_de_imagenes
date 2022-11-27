import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    const db = getFirestore();

    const queryCollection = collection(db, "ImagenesEtiquetadas");
    getDocs(queryCollection)
      .then((resp) =>
        setImagenesEtiquetadas(resp.docs.map((tag) => (tag.data())))
      )
      .catch((err) => console.log(err))
      .finally();
  }, [id]);
  
  useEffect(()=>{
    setReferenciaImagenes(ImagenesEtiquetadas);
    setCount(Math.ceil(ImagenesEtiquetadas.length/num));   
     
  })
  console.log(ReferenciaImagenes.slice(((page - 1) * num), num * page))

  return (
    <div>
 
    <Grid container className="labels-list">
      {ReferenciaImagenes.map((image, index) => (
        <Grid key={index} item md={4} xs={12}>
          <LabelsItem key={index} nameFile={image.nameFile} labels={image.labels} />
        </Grid>
      ))}
    </Grid>
    {/* <Pagination count={count} onChange={handlePage} className='pagination'></Pagination>         */}
    </div>
  );
};
