import React, { useEffect, useState }  from 'react';
import Pagination from 'react-bootstrap/Pagination';
import PageItem from "react-bootstrap/PageItem";
import { DATA_PER_PAGE, MAX_PAGE } from '../constants';

function FetchRewardPagination (props) {
    const [currentPage, setCurrentPage] = useState(1);
    const [startPageIndex, setStartPageIndex] = useState(1);
    const [endPageIndex, setEndPageIndex] = useState(MAX_PAGE);

    const endIndex = Math.min(MAX_PAGE, Math.ceil(props.total/DATA_PER_PAGE));
    
    useEffect(() => {
        setEndPageIndex(endIndex);
    },[props.total]);

    const handlePrevClick = () => {
        if (currentPage > 1) {
            if (currentPage === startPageIndex) {
                setStartPageIndex(currentPage - MAX_PAGE);
                setEndPageIndex(currentPage - 1);
            }
            props.onPrevClick();
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextClick = () => {
        if (currentPage < Math.ceil(props.total/DATA_PER_PAGE)) {
            if (currentPage === endPageIndex) {
                setStartPageIndex(currentPage + 1);
                setEndPageIndex(Math.min(currentPage + MAX_PAGE, Math.ceil(props.total/DATA_PER_PAGE)));
            }
            props.onNextClick();
            setCurrentPage(currentPage + 1);
        }
    }

    const handlePageClick = (e) => {
        props.onPageChange(e.target.text);
        setCurrentPage(parseInt(e.target.text));
    }

    const renderItem = () => {
        const items = [];
        for (let page = startPageIndex; page <= endPageIndex; page++) {
            items.push(
                <PageItem key={page} onClick={e => handlePageClick(e)} value={page} active={page === currentPage}>
                    { page }
                </PageItem>
            );
        }
        return items;
    }

    return (
        <Pagination className="page-footer" hidden={props.hidden}>
            <Pagination.Prev onClick={handlePrevClick}/>
            {renderItem()}
            <Pagination.Next onClick={handleNextClick}/>
        </Pagination>
    );
}

export default FetchRewardPagination;