import React from "react";
import Card from "react-bootstrap/Card";

export default function DogCard({dog, onSelect, isSelected}) {
    const handleSelect = (id) => {
        if (onSelect) {
            onSelect(id);
        }
    }
    return (
        <Card className={`mb-3 ${isSelected ? 'card-selected' : ''}`}
            onClick={() => handleSelect(dog.id)}
        >
            <Card.Img variant="top" src={dog.img} className="card-image-container"/>
            <Card.Body>
                <Card.Title>{dog.breed}</Card.Title>
                <Card.Text>
                    Name: {dog.name}
                    <br/>
                    Age: {dog.age}
                    <br/>
                    Zipcode: {dog.zip_code}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}