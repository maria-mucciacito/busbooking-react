import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from "react-router-dom";

export const FormUtente = () => {
    const [first_name,setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [phone,setPhone] =useState("");
    const [email,setEmail] = useState("");
    const navigate = useNavigate();
    let trattaId = useParams();
    trattaId = parseInt(trattaId.id);

    const submit = (e) => {
        e.preventDefault();
        let json = JSON.stringify({
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            email: email,
        });
        localStorage.setItem("trattaID", trattaId);
        localStorage.setItem("utente",json);
        navigate("/selezionaposti");
        window.location.reload()

    }
    
    return (
        <div className="container m-5 justify-content-center text-center">
            <h1 className="m-5">Registrazione Utente</h1>
            <form onSubmit={submit}>
                <div className="row m-3 justify-content-center">
                    <div className="col-md-4">
                        <label htmlFor="first_name" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="first_name" required name="first_name" value={first_name} onChange={(e)=> setFirstName(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="last_name" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="last_name" required name="last_name" value={last_name} onChange={(e)=> setLastName(e.target.value)} />
                    </div>
                </div>
                <div className="row m-3 justify-content-center">
                    <div className="col-md-4">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input type="tel" className="form-control" id="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required name="phone" value={phone} onChange={(e)=> setPhone(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" required name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                    </div>
                </div>
                <div className="col-12 my-5">
                    <button className="btn btn-secondary" type="submit">Sign in</button>
                </div>
            </form>
        </div>
    )
}
