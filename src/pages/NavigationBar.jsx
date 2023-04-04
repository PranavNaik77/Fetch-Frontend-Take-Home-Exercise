import React from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import Fetch_Rewards_Logo from '../Resources/Images/Fetch_Rewards_Logo.jpg'
import { logout } from '../services/authServices';

function NavigationBar(props) {
    const navigate = useNavigate();

    const onLogout = () => {
        logout().then(res => {
            navigate('/');
            props.onLogout();
        });
    }
    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand href="#home">
                    <img className="image-container" alt='Fetch Rewards' src={Fetch_Rewards_Logo}/>
                    Dog Finder
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                { props.loggedIn && <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Button type="submit" onClick={onLogout} style={{backgroundColor: "#300D38"}}>
                        Log out
                    </Button>
                </Navbar.Collapse> }
            </Container>
        </Navbar>
    );
}

export default NavigationBar;