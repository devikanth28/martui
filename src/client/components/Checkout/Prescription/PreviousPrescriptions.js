import React, { useState, useEffect } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import Alert from '../../Common/Alert';
import PrescriptionService from '../../../services/PrescriptionService';
import Validate from '../../../helpers/Validate';
import HealthRecord from './HealthRecord';
import NoHealthRecordIcon from '../../../images/common/no-prescription-icn-cssbg.svg';

const PreviousPrescriptions = (props) => {

	const prescriptionService = PrescriptionService();
	const validate = Validate();
	const recordsPerPage = 10;
	const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
	const [isPreviousPrescriptionsLoading, setPreviousPrescriptionsLoading] = useState(false);
	const [healthRecords, setHealthRecords] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [currentPageNo, setCurrentPageNo] = useState(0);
	const [pageNumbers, setPageNumbers] = useState([]);

	useEffect(() => {
		if(validate.isEmpty(healthRecords)) {
			setHealthRecords(props.healthRecords);
			setPageNumbers(getPageNumbers(props.totalHealthRecords));
			setCurrentPageNo(1);
		}
	}, []);

	const bindSearchText = (searchInput) => {
		setSearchText(searchInput);
	}

	const getPreviousHealthRecords = (pageNo) => {
		setPreviousPrescriptionsLoading(true);
		let requestedPageNo = 0;
		if(validate.isNumeric(pageNo)) {
			requestedPageNo = parseInt(pageNo);
		} else if(validate.isAlphaWithoutSpace(pageNo) && "PreviousPage" == pageNo) {
			requestedPageNo = currentPageNo - 1;
		} else if(validate.isAlphaWithoutSpace(pageNo) && "NextPage" == pageNo) {
			requestedPageNo = currentPageNo + 1;
		}
		if(requestedPageNo == 0) {
			requestedPageNo = 1;
		}
		let nextRecordIndex = ((requestedPageNo-1) * recordsPerPage);
		props.setSelectedPreviousPrescription(null);
		prescriptionService.getPreviousHealthRecords(nextRecordIndex, searchText).then((response) => {
			if (validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode) {
				if(validate.isNotEmpty(response.responseData.healthRecords)) {
					setHealthRecords(response.responseData.healthRecords);
					setPageNumbers(getPageNumbers(response.responseData.totalRecords));
					setCurrentPageNo(requestedPageNo);
				} else {
					setHealthRecords([]);
					setPageNumbers(getPageNumbers(0));
					setCurrentPageNo(requestedPageNo);
				}
			} else if ("FAILURE" == response.statusCode) {
				setAlertInfo({ message: response.message, type: "" });
			}
			setPreviousPrescriptionsLoading(false);
		}).catch(function(error) {
			setPreviousPrescriptionsLoading(false);
			setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
		});
	}

	const getPageNumbers = (totalNoOfRecords) => {
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
		return pageNos;
	}

	return (
		<React.Fragment>
			<Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
			<div className="col p-0">
				<section className="body-height">
					<div className="header"> 
						<p>Select from previous prescriptions</p>
					</div>
					<div className="select-previous-prescription">
						<a className="back-btn" href="javascript:void(0)" onClick={() => props.togglePreviousPrescriptions(false)} title="Back to options">
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
								<g transform="translate(-48.941 -316.765)">
									<rect fill="none" width="24" height="24" transform="translate(48.941 316.765)"/>
									<path fill="#e71c37" d="M59.108,319.236a.915.915,0,0,0-.6.238l-9.3,8.706a.938.938,0,0,0,0,1.312l9.3,8.586a.945.945,0,0,0,1.312-.119.936.936,0,0,0,0-1.312l-7.394-6.917H71.987a.954.954,0,0,0,0-1.908H52.429l7.513-6.917a.847.847,0,0,0,.358-.715,1.7,1.7,0,0,0-.238-.716A5.386,5.386,0,0,0,59.108,319.236Z" transform="translate(0 -0.471)"/>
								</g>
							</svg>
							Back to options
						</a>
						<div className="prescription-search-field col">
							<div className="input-group mb-3">
								<input type="text" className="form-control" placeholder="Search By Doctor Name or Patient Name or Record Name" aria-label="Search By Doctor Name or Patient Name or Record Name" onChange={(event) => bindSearchText(event.target.value)} autoComplete="off"/>
								<div className="input-group-append">
									<button type="button" className="btn btn-outline-secondary" disabled={isPreviousPrescriptionsLoading} onClick={() => getPreviousHealthRecords(0)}>Go!</button>
								</div>
							</div>
						</div>
						<div className="previous-prescription-container" >
							{!isPreviousPrescriptionsLoading && validate.isNotEmpty(healthRecords) && healthRecords.map((eachHealthRecord) => {
								return (
									eachHealthRecord.recordImageDetailList && eachHealthRecord.recordImageDetailList.length>0 &&
									<React.Fragment key={eachHealthRecord.recordId}>
										<div className="each-prescription">
											<div>
												<HealthRecord key={eachHealthRecord.recordId} healthRecordImages={eachHealthRecord.recordImageDetailList}/>
												<div className="prescription-details-text">
													<p title={eachHealthRecord.recordName}><span className="truncate">{eachHealthRecord.recordName}</span></p>
													<p>Record ID:<span>{eachHealthRecord.recordId}</span></p>
													<p>Patient:<span className="text-truncate">{eachHealthRecord.patientName}</span></p>
													<p>Doctor:<span className="text-truncate">{eachHealthRecord.doctorName}</span></p>
												</div>
												<div className="custom-control custom-radio">
													<input type="radio" className="custom-control-input" id={eachHealthRecord.recordId} onClick={() => props.setSelectedPreviousPrescription(eachHealthRecord.recordId)} name="select-previous-prescription"/>
													<label className="custom-control-label" htmlFor={eachHealthRecord.recordId}><p>Click to Select Prescription</p></label>
												</div>
											</div>
										</div>
									</React.Fragment>
								);
							})}
							{isPreviousPrescriptionsLoading &&
								<div className="each-prescription">
									<div className="ph-item mb-0">
										<div className="ph-col-12 p-0">
											<div className="ph-picture"></div>
										</div>
										<div>
											<div className="ph-row">
												<div className="ph-col-4"></div>
												<div className="ph-col-2 empty"></div>
												<div className="ph-col-6"></div>
												<div className="ph-col-4"></div>
												<div className="ph-col-2 empty"></div>
												<div className="ph-col-6"></div>
												<div className="ph-col-4"></div>
												<div className="ph-col-2 empty"></div>
												<div className="ph-col-6"></div>
												<hr/>
												<div className="ph-col-12"></div>
											</div>
										</div>
									</div>
								</div>
							}
						</div>
						{!isPreviousPrescriptionsLoading && validate.isEmpty(healthRecords) &&
							<div className="no-presciption-content">
								<img className="mb-3" src={NoHealthRecordIcon} alt="No Health Record Icon" title="No Health Record Icon"/>
								<small><strong>No Health Record Found</strong></small>
							</div>
						}
						{!isPreviousPrescriptionsLoading && validate.isNotEmpty(healthRecords) && (pageNumbers.length > 1) &&
							<Pagination>
								{(currentPageNo > 1) &&
									<PaginationItem>
										<PaginationLink previous={(currentPageNo > 1)} onClick={() => getPreviousHealthRecords("PreviousPage")}/>
									</PaginationItem>
								}
								{pageNumbers.map(eachPage =>
									<PaginationItem key={eachPage} active={(eachPage == currentPageNo)}>
										<PaginationLink onClick={() => getPreviousHealthRecords(eachPage)}>{eachPage}</PaginationLink>
									</PaginationItem>
								)}
								{(currentPageNo < pageNumbers.length) &&
									<PaginationItem>
										<PaginationLink next={(currentPageNo < pageNumbers.length)} onClick={() => getPreviousHealthRecords("NextPage")}/>
									</PaginationItem>
								}
							</Pagination>
						}
					</div>
				</section>
			</div>
		</React.Fragment>
	);
}

export default PreviousPrescriptions;