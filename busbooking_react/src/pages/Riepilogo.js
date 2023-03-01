import React, { useState } from "react";
import axios from "../axios/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import {v4 as uuidv4} from 'uuid';

export const Riepilogo = () => {
  let trattaID = parseInt(localStorage.getItem("trattaID"));
  let [tratta, setTratta] = useState({});
  const navigate = useNavigate();
  let postiSelezionati = localStorage.getItem("postiSelezionati");
  let arrPosti = postiSelezionati.split(",");
  let utente = JSON.parse(localStorage.getItem("utente"));

  useEffect(() => {
    axios
      .get("/api/tratta/" + trattaID)
      .then((result) => {
        setTratta(result?.data[0]);
      })
      .catch((error) => console.log(error));
  }, []);

  const submit = async (e) =>{
    e.preventDefault();
    try {
      await axios.post("/api/utente", utente, {
        headers: { "Content-Type": "application/json" },
      })
      .then((result) =>{
        if(result?.status===201){
          let utenteID = parseInt(result?.data[0].id);
          let code = uuidv4();
          let jsonp = JSON.stringify( {
            "code": code,
            "utente": utenteID,
            "tratta": trattaID
          });
          axios.post("/api/addprenotazione", jsonp, {
            headers: { "Content-Type": "application/json" },
          }).then((result) =>{
            let prenotazioneID = parseInt(result?.data[0].id);
            let jsonPosto = [];
            arrPosti.forEach(element=>{
              jsonPosto = JSON.stringify({
                "id": element,
                "prenotazione" : prenotazioneID,
                "bus": tratta.bus
              });
              axios.post("/api/addposto", jsonPosto, {
                headers: { "Content-Type": "application/json" },
              }).then((result) =>{
                localStorage.clear();
                navigate("/conferma/" + prenotazioneID);
              }).catch((error)=> console.log(error));
            })
              
          })
        }
      })
    } catch (error) {
      
    }
  }

  return (
    <>
      <div className="container m-4 ">
        <div className="row">
          <div className="col-sm-8">
            <div className="card">
              <h3 className="card-header">Riepilogo Biglietto</h3>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-4 mb-2">
                    <b>
                      <span>Numero Bus: </span>
                    </b>{" "}
                    {tratta.bus}
                  </div>
                </div>
                <div className="row ">
                  <div className="col-sm-4 mb-2">
                    <b>
                      <span>Da </span>
                    </b>{" "}
                    {tratta.partenza}{" "}
                    <span>
                      <b> alle </b>
                    </span>{" "}
                    {tratta.ora_partenza}
                  </div>
                  <div className="col-sm-4 mb-2">
                    <span>
                      <b>A </b>
                    </span>{" "}
                    {tratta.arrivo}{" "}
                    <span>
                      <b> alle </b>
                    </span>{" "}
                    {tratta.ora_arrivo}
                  </div>
                </div>
              </div>
              <div className="card-footer text-muted">
                <span>Data </span> {tratta.to_char} <br />
                <span>Prezzo {tratta.prezzo}$</span>
              </div>
            </div>
          </div>
          <div className="col-sm-3 mx-5 text-center">
            <span>Clicca qui per confermare la tua prenotazione:</span>
            <br />
            <form onSubmit={submit}>
              <button className="btn btn-secondary" type="submit">
                Prenota
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="container m-4 riepilogo">
        <div className="card">
          <h3 className="card-header">Riepilogo Posti</h3>
          <div className="card-body">
            <div className="row ">
              <div className="col-sm-12">
                <b>
                  <span>Numero Posti: </span>
                </b>{" "}
                {postiSelezionati}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container m-4 riepilogo">
        <div className="card">
          <h3 className="card-header">Riepilogo Dati Passeggero</h3>
          <div className="card-body">
            <div className="row ">
              <div className="col-sm-4">
                <span>
                  <b>Name:</b> {utente.first_name}
                </span>
              </div>
              <div className="col-sm-4">
                <span>
                  <b>Last Name:</b> {utente.last_name}
                </span>
              </div>
            </div>
            <div className="row ">
              <div className="col-sm-4 ">
                <span>
                  <b>Email:</b> {utente.email}
                </span>
              </div>
              <div className="col-sm-4">
                <span>
                  <b>Telefono:</b> {utente.phone}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
