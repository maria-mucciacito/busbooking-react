import React from 'react';
import { useEffect,useState } from 'react';
import axios from '../axios/axios';
import { useParams } from 'react-router';

export const Conferma = () => {
    let prenotazioneID = parseInt(useParams().id);
    let [code,setCode] = useState("");
    useEffect(() => {
        axios
          .get("/api/prenotazione/"+ prenotazioneID)
          .then((result) => {
            setCode(result.data[0].code)
          })
          .catch((error) => console.log(error));
      }, []);
  return (
    <div className="m-t text-center">
        <h2>Conferma Prenotazione</h2>
        <p>La tua prenotazione è stata confermata con il codice {code}. <br/>
            Grazie per aver scelto la nostra compagnia!</p>
        <a href="/">Torna alla Home</a>
    </div>
  )
}
