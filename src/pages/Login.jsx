import React from 'react';
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { login } from '../services/authServices';

function Login(props) {
    const [userName,setUserName] = useState();
    const [email,setEmail] = useState("");
    const [errors, setErrors] = useState({email: "", userName: ""});
    const navigate = useNavigate();

    const validateFields = () => {
        const err = {};
        if (!userName.trim()) err.userName = "UserName is required";
        if (!email.trim()) {
            err.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            err.email = 'Email is invalid';
        }
        setErrors(err);
    }

    const handleSubmit = (e) => {
        validateFields();
        e.preventDefault();
        login(userName.trim(), email.trim()).then(response => {
            if(response.ok){
                props.onLogin();
                navigate("/dashboard");
            }
        }).catch(e => {
            console.log(errors);
        })
    };

    return (
        <div className="bg-image">
            <div className="Auth-form-container">
                <div className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign in</h3>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="fromBasic" onChange={(e) => setUserName(e.target.value)}>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="username" placeholder="Enter Username" isInvalid={!!errors.userName}/>
                                {errors.userName && <Form.Control.Feedback type='invalid'>{errors.userName}</Form.Control.Feedback>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email"
                                                placeholder="Enter email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                isInvalid={!!errors.email}
                                />
                                {errors.email && <Form.Control.Feedback type={"invalid"}>{errors.email}</Form.Control.Feedback>}
                            </Form.Group>
                            <Button variant="primary" type="submit">Submit</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
