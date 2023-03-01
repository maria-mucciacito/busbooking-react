import './App.css';
import { React } from 'react';
import { Routes, Route } from "react-router-dom";
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import {Home} from './pages/Home';
import { ListOfBus } from './components/ListOfBus';
import {NotFound} from './components/NotFound';
import { FormUtente } from './components/FormUtente';
import { Posti } from './components/Posti';
import { Riepilogo } from './pages/Riepilogo';
import { Conferma } from './pages/Conferma';

function App() {

  return (
    <> 
      <Header/>
      <Routes>
        <Route path="/" exact="true" element={<Home/>} />
        <Route path="/searchbus" exact="true" element={<ListOfBus/>} />
        <Route path="/registrazione/:id" exact="true" element={<FormUtente/>}  />
        <Route path="/selezionaposti" exact="true" element={<Posti/>} />
        <Route path="/riepilogo" exact="true" element={<Riepilogo/>} />
        <Route path="/conferma/:id" exact="true" element={<Conferma/>} />
        <Route path='*' element={<NotFound />}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
