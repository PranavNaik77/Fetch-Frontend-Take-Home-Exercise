import React, { useEffect, useState }  from 'react';
import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NavigationBar from './pages/NavigationBar';
import { checkLogin } from './services/authServices';
import DogFound from "./pages/DogFound";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedDogs, setSelectedDogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    login();
  },[]);

  const login = () => {
    checkLogin().then(res => {
      setIsLoggedIn(true);
      navigate('/dashboard');
    }).catch(e => {
      console.log(e);
      setIsLoggedIn(false);
      navigate('/login');
    });
  }

  const setDogs = (data) => {
    setSelectedDogs(data);
    navigate('/dogfound');
  }

  const toDashboard = () => {
    navigate('/dashboard');
  }

  return (
      <>
        <NavigationBar loggedIn={isLoggedIn} onLogout={() => {
          setIsLoggedIn(false);
          navigate('/login');
        }}/>
        <Routes>
          <Route exact path="/login" element={<Login onLogin={() => setIsLoggedIn(true)}/>} />
          <Route exact path="/dashboard" element={<Dashboard findMatch={setDogs}/>}/>
          <Route exact path="/dogfound" element={<DogFound selectedDog={selectedDogs} toDashboard={toDashboard}/>}/>
        </Routes>
      </>
  );
}