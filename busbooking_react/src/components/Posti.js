import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "../axios/axios";

export const Posti = () => {
  let busId = -1;
  const navigate = useNavigate();
  let trattaID = parseInt(localStorage.getItem("trattaID"));
  let num_posti = [];
  let [arr2,SetArr2] = useState([])
  for (let i = 1; i <= 20; i++) {
    num_posti.push(i);
  }

  useEffect(() => {
    
    axios
      .get("/api/tratta/" + trattaID)
      .then((result) => {
        busId = Number(result.data[0].bus);
        axios
          .get("/mostraposti/" + busId)
          .then((result) => {

            let postiOccupati = result?.data
            let a = [];
            postiOccupati.forEach((element) => {
              a.push(parseInt(element.id));
              
            });
            SetArr2(a);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, []);

  const matrice = num_posti.map((element) => {    
    if (arr2.includes(element)) {
      return (
        <div
          className="outer-seat div-inline posto-occupato"
          key={element}
          id={element}
          aria-disabled="true"
        >
          {element}
        </div>
      );
    } else {
      return (
        <div className="outer-seat div-inline" id={element} key={element}>
          {element}
        </div>
      );
    }
  });

  const submit = (e) => {
    e.preventDefault();
    var arrayPosti = document.getElementsByClassName("outer-seat");
    var count = 0;
    var idPostiList = [];
    for (const element of arrayPosti) {
      if (element.className === "outer-seat div-inline selected-outerColor") {
        count += 1;
        idPostiList.push(element.id);
      }
    }
    idPostiList = idPostiList.toString();
    localStorage.setItem("postiSelezionati", idPostiList);
    navigate("/riepilogo");
  };

  return (
    <header className="py-5 bg-image-full">
      <div className="text-center m-5">
        <h3 className="text-center py-4">Seleziona i posti desiderati</h3>
        <div className="row my-3 justify-content-center">
          <div className="col-3">
            <label htmlFor="persone" className="form-label">
              Persone
            </label>
            <input
              type="number"
              className="form-control"
              id="persone"
              placeholder="Seleziona i posti"
              readOnly
              value={0}
            />
          </div>
        </div>
        <div className="row my-3 justify-content-center">
          <div className="col-2">{matrice}</div>
        </div>
        <form onSubmit={submit}>
          <button className="btn btn-secondary" type="submit">
            Select
          </button>
        </form>
      </div>
    </header>
  );
};
