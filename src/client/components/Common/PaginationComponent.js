import React, { useState, useEffect } from 'react';
import {Pagination, PaginationItem, PaginationLink  } from 'reactstrap';
import Validate from '../../helpers/Validate';

const PaginationComponent = ({className:className,totalNoOfRecords:totalNoOfRecords,recordsPerPage:recordsPerPage,currentPageNo:currentPageNo,onSelectHandler:onSelectHandler,...rest}) => {

    const [pageNumbers,setPageNumbers] = useState([]);
    const validate = Validate(); 

    useEffect(()=>{
        getPageNumbers(totalNoOfRecords,recordsPerPage);
    },[totalNoOfRecords,recordsPerPage])

    const getPageNumbers = (totalNoOfRecords,recordsPerPage) => {
		let noOfPages = 0;
		if(validate.isNumeric(totalNoOfRecords) && parseInt(totalNoOfRecords) > 0) {
			noOfPages = parseInt(parseInt(totalNoOfRecords) / recordsPerPage);
			const reminder = (parseInt(totalNoOfRecords) % recordsPerPage);
			if(reminder > 0) {
				noOfPages = noOfPages + 1;
			}
        }
		let pageNos = [];
		for (let eachPage = 1; eachPage <= noOfPages ; eachPage++) {
			pageNos.push(eachPage);
		}
        setPageNumbers(pageNos);
    }
        
    return(
        <React.Fragment>
            { pageNumbers.length > 1  &&
                <Pagination className={validate.isNotEmpty(className) ? className : "pagination-component"}>
                    {(currentPageNo > 1) &&
                        <PaginationItem>
                            <PaginationLink previous={(currentPageNo > 1)} onClick={() => onSelectHandler(currentPageNo -1,...Object.values(rest))}/>
                        </PaginationItem>
                    }
                    {pageNumbers.map(eachPage =>
                        <PaginationItem key={eachPage} active={(eachPage == currentPageNo)}>
                            <PaginationLink onClick={() => onSelectHandler(eachPage,...Object.values(rest))}>{eachPage}</PaginationLink>
                        </PaginationItem>
                    )}
                    {(currentPageNo < pageNumbers.length) &&
                        <PaginationItem>
                            <PaginationLink next={(currentPageNo < pageNumbers.length)} onClick={() => onSelectHandler((currentPageNo + 1),...Object.values(rest))}/>
                        </PaginationItem>
                    }
                </Pagination>
            }
        </React.Fragment>
    )
};

export default PaginationComponent;