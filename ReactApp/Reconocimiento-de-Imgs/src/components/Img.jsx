import { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import  "./LabelsList.css";

export const Img = ({ props }) => {
  // console.log(`estas son las props de imagenes ${props}`)

  const [ReferenciaImagenes, setReferenciaImagenes]=useState([]);
  useEffect( ()=>{

    const storage = getStorage();
    getDownloadURL(ref(storage, `Images/${props}`))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
    
       
        setReferenciaImagenes(url) })
      .catch((error) => {
        // Handle any errors
      }).finally();

   
 
  },[]);

  return (
    <div className="container2">
      <img src={ReferenciaImagenes} className='img'></img>     
    </div> )
};
