import React, { useEffect, useState } from "react";

export const ListOfBus = () => {
  const [tratte, setTratte] = useState([]);
  useEffect(()=>{
    let arr = []
    for (let i = 0; i <localStorage.length; i++) {
        arr.push(JSON.parse(localStorage.getItem(i)));
    }
    setTratte(arr);
    
    
  },[]);

  const listbus = tratte.map((option, index) => {
    return (
      <tr key={index}>
        <td>
          {option.partenza} - {option.arrivo}
        </td>
        <td>{option.bus}</td>
        <td>{option.to_char}</td>
        <td>{option.ora_partenza}</td>
        <td>{option.ora_arrivo}</td>
        <td>{option.prezzo}</td>
        <td>
          <a href={`/registrazione/${option.id}`} className="btn btn-secondary" onClick={(e) => localStorage.clear()}>
            Scegli
          </a>
        </td>
      </tr>
    );
  });
  return (
    <div className="container m-5 text-center justify-content-center">
      <table className="table table-success table-striped">
        <thead>
          <tr>
            <th scope="col">Bus</th>
            <th scope="col">Numero</th>
            <th scope="col">Data</th>
            <th scope="col">Ora Partenza</th>
            <th scope="col">Ora Arrivo</th>
            <th scope="col">Prezzo</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
            {listbus}
        </tbody>
      </table>
    </div>
  );
};
