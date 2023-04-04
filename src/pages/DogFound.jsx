import React  from 'react';
import Confetti from "react-confetti";
import { useEffect, useState, useRef } from 'react';
import {getDogData, getMatch} from "../services/dogServices";
import DogCard from './DogCard';
import Button from 'react-bootstrap/Button';

function DogFound(props) {
    const[finalDog, setFinalDog] = useState({});
    const [height, setHeight] = useState(null);
    const [width, setWidth] = useState(null);
    const confetiRef = useRef(null);

    useEffect(() => {
        getMatch(props.selectedDog).then(data => {
            getDogData([data.match]).then(data => {
                setFinalDog(data[0]);
            });
        });
        setHeight(confetiRef.current.clientHeight);
        setWidth(confetiRef.current.clientWidth);
    },[]);

    return(
        <div>
            <div className="Dog-Found-container" ref={confetiRef}>
                <Confetti numberOfPieces={150} width={width} height={height} />
                <div className="Dog-Found">
                    <h3 className="m-3">Congratulations!, You found a new family member</h3>
                    <DogCard dog={finalDog}/>
                    <div className="align-center">
                        <Button variant="primary" size="lg" onClick={props.toDashboard}>
                            Go to Dashboard
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DogFound;