import React, { useState, useEffect } from 'react';
import upLogo from '../../../images/common/up.svg';
import downLogo from '../../../images/common/down.svg' ;
import moment from "moment";
import Validate from '../../../helpers/Validate';
import MyAccountService from '../../../services/MyAccountService';
import PaginationComponent from '../../Common/PaginationComponent';
import Alert from '../../Common/AlertMessage';
import FlexiRewardGhostImage from './FlexiRewardGhostImage';
import NoFlexiHistory from '../../../images/common/no-flexirewards-transactions.svg';
import CONFIG from '../../../constants/ServerConfig'

const RewardsSummary = (props) => {

    const [flexiRewardTransactions,setFlexiRewardTransactions] = useState();
    const [totalRows,setTotalRows] = useState(0);
    const [availableFrom,setAvailableFrom] = useState();
    const [availablePoints,setAvailablePoints] = useState();
    const [redeemedPoints, setRedeemedPoints] = useState();
    const [totalPoints, setTotalPoints] = useState();
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [displayNoDataFound,setDisplayNoDataFound] = useState(false);
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const recordsPerPage =10;
    const [displayGhostImage,setDisplayGhostImage] = useState(true);
    const enableLinkForRedirectionInMdx=["Lab Order Creation"];
    const validate = Validate();
    const myAccountService = MyAccountService();
    const noTransactionText = (props.isPayback || props.isMdxPoints) ? (`${props.isPayback ? 'No MedPlus Payback Transactions' : 'No MDx Transactions'} `) : `No FlexiTransactions`;

    useEffect(() => {
        getFlexiRewardsTransactionDetails(1);
    }, [props.isPayback,props.routePath]);

    const redirectToHome = ()=>{
        window.location.href = CONFIG.REDIRECT_HOME_URL;
    }

    const pointsConversionFormat = (points)=>{
        return props.isMdxPoints ? parseFloat(points).toFixed(2) : parseInt(points);
    }

    const getFlexiRewardsTransactionDetails = (requestedPageNo) =>{
        setDisplayGhostImage(true);
        myAccountService.getFlexiRewardsTransactionDetails(requestedPageNo,props.isPayback,props.isMdxPoints).then(response => {
            setDisplayGhostImage(false);
            if(validate.isNotEmpty(window)){
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            }
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.dataObject)) {
                let responseData = response.dataObject;
                if("success" === responseData.message){
                    setFlexiRewardTransactions(responseData.pointRecords);
                    setTotalRows(responseData.totalRows);
                    setCurrentPageNo(requestedPageNo);
                    if(validate.isNotEmpty(responseData.availableFrom)){
                        setAvailableFrom(responseData.availableFrom);
                    }
                    if(validate.isNotEmpty(responseData.availablePoints)){
                        setAvailablePoints(pointsConversionFormat(responseData.availablePoints));
                        setRedeemedPoints(validate.isNotEmpty(responseData.pointsRedeemed) ? pointsConversionFormat(responseData.pointsRedeemed) : "0");
                        setTotalPoints(validate.isNotEmpty(responseData.totalPoints) ? pointsConversionFormat(responseData.totalPoints) : "0");
                    }
                   setDisplayNoDataFound(false);   
                }else if("No Data Found" === responseData.message){
                    setDisplayNoDataFound(true);
                }
            } else if(validate.isNotEmpty(response) && response.statusCode === "FAILURE") {
                setAlertInfo({ message: response.message, type: "" });
                return;
            }
        }).catch(function(error) {
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
            setDisplayGhostImage(false);
            console.log("Error occured in flexi reward transaction details page :" + error);
            return;
        });
    
    }

    const FlexiRewardTransaction = (props) => { 
        let transaction = props.transaction;
        return(
            <div className="card mx-3">
                <div className="card-body flexi-content">
                    <p>
                        <img alt={transaction.points > 0 ? "down" : "up"} src={transaction.points > 0 ? downLogo : upLogo} className={transaction.points > 0 ? "down mb-1" : "up mb-1"} />
                        <br/>
                        <span className="text-secondary">{moment(new Date(transaction.transactionDate)).format("MMM DD, YYYY")}</span>
                        
                    </p>
                    {!props.isMdxPoints && validate.isNotEmpty(transaction.counterInvoiceID) && transaction.counterInvoiceID > 0 &&
                        <p> <span className="text-secondary d-block mb-2">Reference Id</span>
                            <React.Fragment>
                                {props.isPayback  && transaction.transactionType === "Points Expired" && 
                                    <span className="font-weight-bold">{transaction.displayTransactionId}</span>
                                }
                                {props.isPayback && transaction.transactionType !== "Points Expired" &&
                                    <a href={(validate.isNumeric(transaction.displayTransactionId) ? `/invoiceDetails/${transaction.displayTransactionId}/${transaction.storeId}` : `/orderDetails/${transaction.displayTransactionId}`)} title='View your Transaction Summary' aria-label='View your Transaction Summary' aria-role="button" className='btn-link-blue' target="_blank" rel='noopener'>
                                        <strong >{transaction.displayTransactionId}</strong>    
                                        <svg className="align-baseline ml-1" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 18 18">
                                            <g id="Link_open" data-name="Link Open" transform="translate(-1761 -666)" clip-path="url(#clip-path)">
                                                <g id="noun-external-link-3388428-404040" transform="translate(1751.332 656.333)">
                                                    <path id="Path_42754" data-name="Path 42754" d="M25.868,17.868a.8.8,0,0,0-.8.8v6.4h-12.8v-12.8h6.4a.8.8,0,1,0,0-1.6h-7.2a.8.8,0,0,0-.8.8v14.4a.8.8,0,0,0,.8.8h14.4a.8.8,0,0,0,.8-.8v-7.2a.8.8,0,0,0-.8-.8Z" transform="translate(0 0)" fill="#404040" />
                                                    <path id="Path_42755" data-name="Path 42755" d="M66.918,10.729a.807.807,0,0,0-.306-.062h-4a.8.8,0,1,0,0,1.6h2.069L58.846,18.1h0a.8.8,0,1,0,1.131,1.131L65.812,13.4v2.069a.8.8,0,1,0,1.6,0v-4a.8.8,0,0,0-.494-.738Z" transform="translate(-40.744 0)" fill="#404040" />
                                                </g>
                                            </g>
                                        </svg>
                                    </a>
                                }
                                {!props.isPayback && 
                                    <span className="font-weight-bold">{transaction.counterInvoiceID}</span>
                                }
                            </React.Fragment>
                            
                        </p>
                    }
                    {!props.isMdxPoints && !(validate.isNotEmpty(transaction.counterInvoiceID) && transaction.counterInvoiceID > 0) &&
                        <p> <span className="text-secondary d-block mb-2">Reference Id</span>
                          <React.Fragment>
                                {props.isPayback  && transaction.transactionType === "Points Expired" && 
                                    <span className="font-weight-bold">{transaction.displayTransactionId}</span>
                                }
                                {props.isPayback  && transaction.transactionType !== "Points Expired" &&
                                    <a href={(validate.isNumeric(transaction.displayTransactionId) ? `/invoiceDetails/${transaction.displayTransactionId}/${transaction.storeId}` : `/orderDetails/${transaction.displayTransactionId}`)} title='View your Transaction Summary' aria-label='View your Transaction Summary' aria-role="button" className='btn-link-blue' target="_blank" rel='noopener'>
                                        <strong >{transaction.displayTransactionId}</strong>    
                                        <svg className="align-baseline ml-1" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 18 18">
                                            <g id="Link_open" data-name="Link Open" transform="translate(-1761 -666)" clip-path="url(#clip-path)">
                                                <g id="noun-external-link-3388428-404040" transform="translate(1751.332 656.333)">
                                                    <path id="Path_42754" data-name="Path 42754" d="M25.868,17.868a.8.8,0,0,0-.8.8v6.4h-12.8v-12.8h6.4a.8.8,0,1,0,0-1.6h-7.2a.8.8,0,0,0-.8.8v14.4a.8.8,0,0,0,.8.8h14.4a.8.8,0,0,0,.8-.8v-7.2a.8.8,0,0,0-.8-.8Z" transform="translate(0 0)" fill="#404040" />
                                                    <path id="Path_42755" data-name="Path 42755" d="M66.918,10.729a.807.807,0,0,0-.306-.062h-4a.8.8,0,1,0,0,1.6h2.069L58.846,18.1h0a.8.8,0,1,0,1.131,1.131L65.812,13.4v2.069a.8.8,0,1,0,1.6,0v-4a.8.8,0,0,0-.494-.738Z" transform="translate(-40.744 0)" fill="#404040" />
                                                </g>
                                            </g>
                                        </svg>
                                    </a>
                                }
                                {!props.isPayback &&
                                    <span className="font-weight-bold">{transaction.invoiceId}</span>
                                }
                            </React.Fragment>
                        </p>
                    }
                {props.isMdxPoints && 
                    <p> <span className="text-secondary d-block mb-2">Reference Id</span>
                        {(validate.isNotEmpty(transaction.displayTransactionId) && (transaction.points<0 && enableLinkForRedirectionInMdx.includes(transaction.transactionType)) ?
                            <a href={`/labOrderDetail/${transaction.displayTransactionId}`} title='View your Transaction Summary' aria-label='View your Transaction Summary' aria-role="button" className='btn-link-blue' target="_blank" rel='noopener'>
                                <strong >{transaction.displayTransactionId}</strong>    
                                <svg className="align-baseline ml-1" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 18 18">
                                    <g id="Link_open" data-name="Link Open" transform="translate(-1761 -666)" clip-path="url(#clip-path)">
                                        <g id="noun-external-link-3388428-404040" transform="translate(1751.332 656.333)">
                                            <path id="Path_42754" data-name="Path 42754" d="M25.868,17.868a.8.8,0,0,0-.8.8v6.4h-12.8v-12.8h6.4a.8.8,0,1,0,0-1.6h-7.2a.8.8,0,0,0-.8.8v14.4a.8.8,0,0,0,.8.8h14.4a.8.8,0,0,0,.8-.8v-7.2a.8.8,0,0,0-.8-.8Z" transform="translate(0 0)" fill="#404040" />
                                            <path id="Path_42755" data-name="Path 42755" d="M66.918,10.729a.807.807,0,0,0-.306-.062h-4a.8.8,0,1,0,0,1.6h2.069L58.846,18.1h0a.8.8,0,1,0,1.131,1.131L65.812,13.4v2.069a.8.8,0,1,0,1.6,0v-4a.8.8,0,0,0-.494-.738Z" transform="translate(-40.744 0)" fill="#404040" />
                                        </g>
                                    </g>
                                </svg>
                            </a> : <span className="font-weight-bold">{validate.isNotEmpty(transaction.displayTransactionId) ? transaction.displayTransactionId : (validate.isNotEmpty(transaction.counterInvoiceID) ? transaction.counterInvoiceID : '-')}</span>)
                        }
                    </p>  
                }
                    
                    <p>
                        <span className="text-secondary d-block mb-2">Points</span>
                        <strong class={`ml-2 ${transaction.points < 0 ? `text-brand` : `text-success`}`}> {pointsConversionFormat(Math.abs(transaction.points))} 
                            <span class="ml-1">{transaction.points < 0 ? "(Dr)" : "(Cr)"}</span>
                        </strong>
                    </p>
                    {/* <p> <span className="text-secondary d-block mb-2">Balance Points</span>
                        <span className="font-weight-bold">123</span>                  
                    </p> */}
                    <p> <span className="text-secondary d-block mb-2">Transaction Type</span>
                        <span className="font-weight-bold">{transaction.transactionType}</span>                  
                    </p>
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>
            <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
            {!displayGhostImage && !displayNoDataFound &&
                <div id="rewardsSummary">
                    <div className="body FlexiRewards-Summary pb-3">
                        <div className="d-flex justify-content-between p-3">
                            {(props.isPayback || props.isMdxPoints ) && <p className="mb-0"> <strong className="vertical-inline-sub">{`${props.isPayback ? 'MedPlus Payback Points Transaction History' : 'MDx Points Wallet Transaction History'} `}</strong>
                                {/* {validate.isNotEmpty(availableFrom) && 
                                    <small className="text-secondary">Records available from {moment(new Date(availableFrom)).format("MMM DD, YYYY")}</small>
                                } */}
                            </p> }
                            {!props.isPayback && !props.isMdxPoints && <p className='mb-0'> <strong className='vertical-inline-sub'>FlexiRewards Transaction History</strong></p>}
                            <p className="mb-0">
                            {/* <small className="text-muted">Records available from Apr 29, 2018 </small> */}
                            {validate.isNotEmpty(totalRows) && 
                                <React.Fragment>
                                    {/* <span className="dot-separator text-dark"></span> */}
                                    <small className="text-muted text-right">Showing {(currentPageNo-1)*recordsPerPage + 1} to {(currentPageNo*recordsPerPage > totalRows ? totalRows : currentPageNo*recordsPerPage )} of {totalRows} Entries </small> 
                                </React.Fragment>
                            }
                            </p>
                            {/* <p className="mb-0 text-right">
                                {validate.isNotEmpty(availablePoints) &&
                                    <React.Fragment>
                                        <strong>
                                            Total Balance Points:
                                            <strong className="ml-2 text-success"> {availablePoints}</strong> 
                                        </strong>
                                        <br/>
                                    </React.Fragment>
                                }
                                {validate.isNotEmpty(totalRows) && 
                                    <small className="text-secondary text-right">Showing {(currentPageNo-1)*recordsPerPage + 1} to {(currentPageNo*recordsPerPage > totalRows ? totalRows : currentPageNo*recordsPerPage )} of {totalRows} Entries </small> 
                                }    
                            </p> */}
                        </div>
                        <div className="detailed-content">
                            <p>
                                <span className="label-text">
                                    Available
                                </span>
                                <br/>
                                <span className="amount-text">{pointsConversionFormat(availablePoints)}</span>
                            </p>
                            <p>
                                <span className="label-text">
                                    {(props.isPayback || props.isMdxPoints) ? `Debited` : `Redeemed`}
                                </span>
                                <br/>
                                <span className="amount-text">{pointsConversionFormat(redeemedPoints)}</span>
                            </p>
                            <p>
                                <span className="label-text">
                                {(props.isPayback || props.isMdxPoints) ? `Credited` : `Total`}
                                </span>
                                <br/>
                                <span className="amount-text">{pointsConversionFormat(totalPoints)}</span>
                            </p>
                        </div>
                        {validate.isNotEmpty(flexiRewardTransactions) && 
                            flexiRewardTransactions.map((flexiRewardTransaction,i) => {
                                return(flexiRewardTransaction && 
                                    <FlexiRewardTransaction transaction={flexiRewardTransaction} key={i} isMdxPoints={props.isMdxPoints}  isPayback={props.isPayback}></FlexiRewardTransaction>
                                );
                            })
                        }
                        {validate.isNotEmpty(flexiRewardTransactions) && 
                            <PaginationComponent totalNoOfRecords={totalRows} recordsPerPage = {recordsPerPage} currentPageNo={currentPageNo}  onSelectHandler = {getFlexiRewardsTransactionDetails}></PaginationComponent>
                        }
                    </div>
                </div>
            }
            <FlexiRewardGhostImage rewardSummaryLoader={displayGhostImage}></FlexiRewardGhostImage>
            {displayNoDataFound && 
                <section>
                    <div className="no-flexi-transaction body-height">
                        <img src={NoFlexiHistory} alt={noTransactionText} title={noTransactionText} />
                        <h6>{noTransactionText}</h6>
                        {(props.isPayback || props.isMdxPoints) && <button className="btn px-5 btn-brand-gradient rounded-pill custom-btn-lg" onClick={redirectToHome}>Start Ordering</button>}
                    </div>
                </section>
            }
        </React.Fragment>
    )
}
export default RewardsSummary;