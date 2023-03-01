import React from "react";
import axios from "../axios/axios";
import { useEffect,useState } from "react";

export const CercaPrenotazione = () => {
  let [code,setCode] = useState("");

  const submit = (e) => {
    axios.post("/api/codeprenotazione", code, {
      headers: { "Content-Type": "application/json" },
    })
    .then((result) => {
        console.log(result.data)
      })
      .catch((error) => console.log(error));
  }

  return (
    <section className="py-5">
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <h2>Cerca qui la tua prenotazione!</h2>
            <div className="lead">
              <form
                onSubmit={submit}
                
              >
                <div className="col-4 my-4">
                  <label htmlFor="code" className="form-label">
                    Codice Prenotazione
                  </label>
                  <input
                    type="text"
                    name="code"
                    id="code"
                    className="form-control"
                    required
                    placeholder="Inserisci qui..."
                    value={code}
                    onChange={(e)=> setCode(e.target.value)}
                  />
                </div>
                <div className="col-4 my-4">
                  <button className="btn btn-secondary" type="submit">Search</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
