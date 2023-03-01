import React, { useState, useEffect } from "react";
import axios from "../axios/axios";
import { useNavigate } from "react-router-dom";

export const FormPrenotazione = () => {
  const [destinazioni, setDestinazioni] = useState([]);
  useEffect(() => {
    axios
      .get("/destinazioni")
      .then((result) => {
        setDestinazioni(result?.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const optionPartenza = destinazioni.map((option, index) => {
    return (
      <option key={index} value={option.partenza}>
        {option.partenza}
      </option>
    );
  });

  useEffect(() => {
    axios
      .get("/destinazioni")
      .then((result) => {
        let options = document.getElementById("arrivo");
        document
          .getElementById("partenza")
          .addEventListener("input", function () {
            let partenza = document.getElementById("partenza").value;
            let arrivi = [];
            options.innerHTML = '<option value=""></option>';
            for (let x = 0; x < result?.data.length; x++) {
              arrivi.push(result?.data[x].arrivo);
              if (result?.data[x].arrivo === partenza) {
                arrivi.pop(partenza);
              }
            }
            for (let i = 0; i < arrivi.length; i++) {
              options.innerHTML +=
                '<option value="' + arrivi[i] + '">' + arrivi[i] + "</option>";
            }
          });
      })
      .catch((error) => console.log(error));
  }, []);

  const [partenza1,setPartenza1] = useState("");
  const [arrivo1,setArrivo1] = useState("");
  const [data,setData] = useState("");
  const navigate = useNavigate();
  
  const searchBus = async (e) => {
    e.preventDefault();
    let json = JSON.stringify({
        partenza: partenza1,
        arrivo: arrivo1,
        data: data
      });

    try{
        await axios
        .post("/searchbus", json, {
          headers: { "Content-Type": "application/json" },
        })
        .then((result) => {
          if (result.status === 200) {
            localStorage.clear()
            for(let i=0; i< result?.data.length;i++){
              localStorage.setItem(i,JSON.stringify(result.data[i]))
            }
            navigate("/searchbus")
            
          }
        })
        .catch((error) => console.log(error));
        setArrivo1("");
        setPartenza1("");
        setData("");
    } catch (error) {
        console.log(error);
    }
  }


  return (
    <>
      <header className="py-5 bg-image-full">
        <div className="text-center m-5">
          <h1 className=" fs-3 fw-bolder">Prenota ora il tuo viaggio!</h1>

          <form
            className="m-5 "
            onSubmit={searchBus}
            encType="application/x-www-form-urlencoded"
          >
            <div className="row m-3 justify-content-center">
              <div className="col-md-3">
                <label htmlFor="partenza" className="form-label">
                  Da
                </label>
                <select
                  id="partenza"
                  className="form-select"
                  required
                  name="partenza1"
                  value={partenza1}
                  onChange={(e) => setPartenza1(e.target.value)}
                >
                    <option></option>
                  {optionPartenza}
                </select>
              </div>
              <div className="col-md-3">
                <label htmlFor="arrivo" className="form-label">
                  A
                </label>
                <select
                  id="arrivo"
                  className="form-select"
                  required
                  name="arrivo1"
                  value={arrivo1}
                  onChange={(e) => setArrivo1(e.target.value)}
                >
                    <option value=""></option>
                </select>
              </div>
            </div>
            <div className="row m-3 justify-content-center">
              <div className="col-3">
                <label htmlFor="data" className="form-label">
                  Data
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="data"
                  required
                  name="data"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12 my-5">
              <button className="btn btn-secondary" type="submit">Search</button>
            </div>
          </form>
        </div>
      </header>

      <div className="py-5 bg-image-full busimage">
        <div className="divbusimage"></div>
      </div>
    </>
  );
};
