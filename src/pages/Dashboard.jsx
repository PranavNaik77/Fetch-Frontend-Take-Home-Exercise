import React  from 'react';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Alert from 'react-bootstrap/Alert';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from 'react-bootstrap/Spinner';

import DogData from './DogData';
import FetchRewardDropdown from './FetchRewardDropdown';
import FetchRewardPagination from "./FetchRewardPagination";
import FilterName from './FilterName';

import { getCities, getCityByState, getLocation, getStates } from '../services/locationServices';
import { getBreeds, getDogData, getDogIds } from '../services/dogServices';
import { AGE_MENU, DEFAULT_MAX_AGE, DEFAULT_MIN_AGE, DEFAULT_SEARCH_QUERY, FILTERS_MENU, SORT_BY } from '../constants';
import {Stack} from "react-bootstrap";

function Dashboard(props) {
    const [dogs, setDogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [breeds, setBreeds] = useState([]);
    const [selectedbreeds, setSelectedbreeds] = useState([]);
    const [selectedStates, setSelectedStates] = useState([]);
    const [previousPageQuery, setPreviousPageQuery] = useState("");
    const [nextPageQuery, setNextPageQuery] = useState("");
    const [total, setTotal] = useState(0);
    const [cities, setCities] = useState(getCities);
    const [selectedcity, setSelectedcity] = useState();
    const [currentPageQuery,setCurrentPageQuery] = useState(DEFAULT_SEARCH_QUERY);
    const [minimumAge, setMinimumAge] = useState(DEFAULT_MIN_AGE);
    const [maximumAge, setMaximumAge] = useState(DEFAULT_MAX_AGE);
    const [ageAlert, setAgeAlert] = useState(false);
    const [show, setShow] = useState(false);
    const [selectedSort, setSelectedSort] = useState(SORT_BY[0]);
    const [alert, setAlert] = useState(false);
    const [selectedCards, setSelectedCards] = useState([]);

    useEffect(() => {
        let query = DEFAULT_SEARCH_QUERY + `sort=breed:${selectedSort.value}&`;
        getBreeds().then(data => setBreeds(data));
        fetchDogData(query);
    },[]);

    useEffect(() => {
        const cities = []
        selectedStates.forEach(state =>
            cities.push(...getCityByState(state.value).map(city => city.name))
        );
        setCities(cities);
    }, [selectedStates]);

    const fetchDogData = (query) => {
        setIsLoading(true);
        getDogIds(query).then(data => {
            setTotal(data.total);
            setNextPageQuery(data.next);
            setPreviousPageQuery(data.prev);
            getDogData(data.resultIds).then(data => {
                let arr = data.map((dog) => {
                    return {...dog, isSelected : false}
                })
                setDogs(arr);
                setIsLoading(false);
            });
        });
    }

    const fetchNextPage = () => {
        fetchDogData(nextPageQuery);
    }

    const fetchPrevPage = () => {
        fetchDogData(previousPageQuery);
    }

    const fetchPage = (pageNumber) => {
        const from = (pageNumber - 1) * 25;
        fetchDogData(currentPageQuery+'from='+from);
    }

    const getZipCodes = async () => {
        const locations = await getLocation(selectedStates, selectedcity);
        return locations.results.map(location => location.zip_code);
    }
 
    const handleSelectedBreeds = (data) => {
        setSelectedbreeds(data);
    }

    const handleSelectedStates = (data) => {
        setSelectedStates(data);
    }

    const handleSelectedCity = (data) => {
        setAlert(false);
        setSelectedcity(data ? data.value : "");
    }

    const handleMatch = async () => {
        props.findMatch(selectedCards);
    }

    const getSearchQuery = (zipCodes) => {
        let query = DEFAULT_SEARCH_QUERY + `sort=breed:${selectedSort.value}&`;
        query += selectedbreeds.map(breed => `breeds=${breed.value}&`).join("");
        query += zipCodes.map(zipcode => `zipCodes=${zipcode}&`).join("");
        return (query + `ageMin=${minimumAge.value}&ageMax=${maximumAge.value}&`);
    }

    const handleSearch = async () => {
        if(minimumAge.value > maximumAge.value){
            setAgeAlert(true);
            return;
        }
        setAgeAlert(false);
        if (selectedStates.length > 0 && !selectedcity) {
            setAlert(true);
            return;
        }
        let zipCodes = [];
        if (selectedcity) {
            zipCodes = await getZipCodes();
            if (zipCodes.length === 0) {
                setTotal(0);
                setDogs([]);
                return;
            }
        }
        const query = getSearchQuery(zipCodes);
        setCurrentPageQuery(query);
        fetchDogData(query);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const showCanvas = () => {
        return (
            <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>More Filters</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <FilterName name='Minimum Age' xs={12}/>
                    <FetchRewardDropdown
                        data={AGE_MENU}
                        value={[minimumAge]}
                        onChange={setMinimumAge}
                    />
                    <FilterName name='Maximum Age' xs={12}/>
                    <FetchRewardDropdown
                        data={AGE_MENU}
                        value={[maximumAge]}
                        onChange={setMaximumAge}
                    />
                    {ageAlert && <Alert variant="danger" onClose={() => setAgeAlert(false)} dismissible>
                        <p>
                            Maximum Age Cannot be less than Minimum Age
                        </p>
                    </Alert>}
                    <FilterName name='Sort By' xs={12}/>
                    <FetchRewardDropdown
                        options={SORT_BY}
                        value={[selectedSort]}
                        onChange={setSelectedSort}
                    />
                    <Button variant="outline-primary" onClick={handleSearch} > Apply </Button>
                </Offcanvas.Body>
            </Offcanvas>
        )
    }

    return (
        <div className="bg-color">
            <div className='parameters-container'>
                <Container>
                    <Row>
                        { FILTERS_MENU.map((name, index) => <FilterName key={index} name={name}/>) }
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <FetchRewardDropdown
                                data={breeds}
                                placeholder="All Breeds"
                                value={selectedbreeds}
                                onChange={handleSelectedBreeds}
                                isMulti
                            />
                        </Col>
                        <Col xs={3}>
                            <FetchRewardDropdown
                                data={getStates}
                                placeholder="All States"
                                value={selectedStates}
                                onChange={handleSelectedStates}
                                isMulti
                            />
                        </Col>
                        <Col xs={3}>
                            <FetchRewardDropdown
                                data={cities}
                                placeholder="Select City"
                                onChange={handleSelectedCity}
                                isClearable={true}
                            />
                        </Col>
                    </Row>
                </Container>
                <div className="align-buttons">
                    <Stack direction={"horizontal"} gap={3}>
                        <Button variant="outline-primary" onClick={handleSearch} >Search</Button>
                        <Button variant="outline-primary" onClick={handleShow}> More Filters </Button>
                        <Button variant="outline-primary" onClick={handleMatch} disabled={selectedCards.length === 0}>Find a Match</Button>
                    </Stack>
                </div>
            </div>
            {
                show && showCanvas()
            }
            <div className="alert-message">
                {alert &&
                    <Alert variant="danger" onClose={() => setAlert(false)} dismissible>
                        <p>
                            Please select a city
                        </p>
                    </Alert>
                }
            </div>
            {isLoading ? (
                <div className="center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <div>
                    <DogData dogs={dogs}
                        selectedCards={selectedCards}
                        setSelectedCards={setSelectedCards}
                    />
                </div>
            )}
                <FetchRewardPagination
                    onPrevClick={fetchPrevPage}
                    onNextClick={fetchNextPage}
                    onPageChange={fetchPage}
                    total={total}
                    hidden={isLoading}
                />
        </div>
    );
}

export default Dashboard;