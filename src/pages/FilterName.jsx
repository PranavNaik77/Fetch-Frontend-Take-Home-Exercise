import React from "react";
import { Col } from "react-bootstrap";

export default function FilterName({name, xs}) {
    return (
        <Col xs={3}><h4>{name}</h4></Col>
    );
}