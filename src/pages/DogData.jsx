import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import DogCard from "./DogCard";

export default function DogData({dogs, selectedCards, setSelectedCards}) {
    if (dogs.length === 0) {
        return (
            <div className="no-data-text">
                <img src={require('../Resources/Images/no-data.webp')} alt='NO DOG FOUND' style={{ width: 300, height: 200 }}/>
                <h4>Oops, No Dogs Found!</h4>
            </div>
        );
    }

    const handleCardSelect = (id) => {
        if (!selectedCards.includes(id)) {
            setSelectedCards([...selectedCards, id]);
        } else {
            setSelectedCards(selectedCards.filter((cardId) => cardId !== id));
        }
    }

    return (
        <Container>
            <Row xs={1} md={4}>
                {
                    dogs.map(dog => <Col key={dog.id} className="mb-5" id={dog.id}>
                        <DogCard dog={dog}
                            isSelected={selectedCards.includes(dog.id)}
                            onSelect={handleCardSelect}
                        />
                    </Col>)
                }
            </Row>
        </Container>
    );
}