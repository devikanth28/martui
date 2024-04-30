import React, { useState, useEffect } from 'react';
import amount from '../../../images/common/amount.svg';
import moment from "moment";
import Validate from '../../../helpers/Validate';
import MyAccountService from '../../../services/MyAccountService';
import PaginationComponent from '../../Common/PaginationComponent';
import Alert from '../../Common/AlertMessage';
import NoWalletHistory from '../../../images/common/no-wallet-history.svg'
import CONFIG from '../../../constants/ServerConfig';
import WalletIcon from '../../../images/common/medpluswallet-icn.svg';
import Wallet2xIcon from '../../../images/common/medpluswallet-icn2x.png';

const WalletSummary = (props) => {

    const [walletTransactions, setWalletTransactions] = useState({});
    const [totalRows, setTotalRows] = useState(0);
    const [availableFrom, setAvailableFrom] = useState();
    const [availableBalance, setAvailableBalance] = useState();
    const [regularCash, setRegularCash] = useState();
    const [flexiCash, setFlexiCash] = useState();
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [displayNoDataFound, setDisplayNoDataFound] = useState(false);
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const recordsPerPage = 10;
    const [displayGhostImage, setDisplayGhostImage] = useState(true);
    const validate = Validate();
    const myAccountService = MyAccountService();

    useEffect(() => {
        getWalletTransactionDetails(1);
    }, []);

    const redirectToHome = () => {
        window.location.href = CONFIG.REDIRECT_HOME_URL;
    }

    const getWalletTransactionDetails = (requestedPageNo) => {
        setDisplayGhostImage(true);
        myAccountService.getWalletTransactionDetails(requestedPageNo, recordsPerPage).then(response => {
            if (validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.dataObject)) {
                let walletInfo = response.dataObject;
                if (requestedPageNo == 1) {
                    if (validate.isNotEmpty(walletInfo.numberOfRecords) && walletInfo.numberOfRecords > 0) {
                        setDisplayGhostImage(false);
                        let transactions = {}
                        let initialRecords = Object.keys(walletInfo.mWalletTransactions).length;
                        Object.entries(walletInfo.mWalletTransactions).map((values, index) => {
                            if (index < initialRecords && index >= initialRecords - 10) {
                                transactions[values[0]] = values[1];
                            }
                        });
                        setWalletTransactions(transactions);
                        setTotalRows(walletInfo.numberOfRecords);
                        setCurrentPageNo(requestedPageNo);
                        setRegularCash(walletInfo.mwalletAmount);
                        setFlexiCash(walletInfo.flexiAmount);
                        setAvailableBalance(walletInfo.mwalletAmount + walletInfo.flexiAmount);
                        if (validate.isNotEmpty(walletInfo.availableFrom)) {
                            setAvailableFrom(walletInfo.availableFrom);
                        }
                    } else {
                        setDisplayNoDataFound(true);
                        setDisplayGhostImage(false);
                    }
                } else {
                    setDisplayGhostImage(false);
                    setCurrentPageNo(requestedPageNo);
                    setWalletTransactions(walletInfo.mWalletTransactions);
                }
            } else if (validate.isNotEmpty(response) && response.statusCode === "FAILURE") {
                setDisplayNoDataFound(true);
                setDisplayGhostImage(false);
                setAlertInfo({ message: response.message, type: "" });
                return;
            }
        }).catch(function (error) {
            setDisplayNoDataFound(true);
            setDisplayGhostImage(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
            console.log("Error occured in flexi reward transaction details page :" + error);
            return;
        });

    }

    const GhostImage = () => {
        return (
            <section className="body-height">
                <div className="d-flex justify-content-between p-3">
                    <p className="mb-0">
                        <strong>Detailed History</strong>
                    </p>
                    <div style={{ 'width': '270px' }} className="mb-0">
                        <div className="ph-item mb-3 p-0">
                            <div className="p-0">
                                <div className="ph-row mb-0">
                                    <div className="ph-col-12 mb-0"></div>
                                </div>
                            </div>
                        </div>
                        <div className="ph-item mb-0 d-non p-0">
                            <div className="p-0">
                                <div className="ph-row mb-0">
                                    <div className="ph-col-2 mb-0 empty"></div>
                                    <div className="ph-col-10 mb-0"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mx-3 d-block p-0 mb-3 shadow-sm">
                    <div className="ph-item mb-0 py-3">
                        <div className="ph-col-1 p-0">
                            <div style={{ 'height': '44px', 'width': '44px' }} className="ph-picture mb-0"></div>
                        </div>
                        <div className="pt-3">
                            <div className="ph-row pt-1">
                                <div className="ph-col-1 empty"></div>
                                <div className="ph-col-1"></div>
                                <div className="ph-col-2 empty"></div>
                                <div className="ph-col-2"></div>
                                <div className="ph-col-2 empty"></div>
                                <div className="ph-col-1"></div>
                                <div className="ph-col-2 empty"></div>
                                <div className="ph-col-1"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mx-3 d-block p-0 mb-3 shadow-sm">
                    <div className="ph-item mb-0 py-3">
                        <div className="ph-col-1 p-0">
                            <div style={{ 'height': '44px', 'width': '44px' }} className="ph-picture mb-0"></div>
                        </div>
                        <div className="pt-3">
                            <div className="ph-row pt-1">
                                <div className="ph-col-1 empty"></div>
                                <div className="ph-col-1"></div>
                                <div className="ph-col-2 empty"></div>
                                <div className="ph-col-2"></div>
                                <div className="ph-col-2 empty"></div>
                                <div className="ph-col-1"></div>
                                <div className="ph-col-2 empty"></div>
                                <div className="ph-col-1"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    const WalletTransaction = (props) => {
        let transactionsList = props.transactionsList;
        if (!transactionsList || transactionsList.length === 0) {
            return <React.Fragment></React.Fragment>
        }
        let multipleTransaction = transactionsList.length > 1;
        let transactionReason = transactionsList[0].displayTransactionReason ? transactionsList[0].displayTransactionReason.toLowerCase() : '';
        let documentIdLabel = transactionReason === "Expiry" ? "Expired" : transactionReason === 'Expiry Refund' && !multipleTransaction ? "Expiry Refund" : "Invoice Id";
        let documentIdValue = documentIdLabel === "Invoice Id" ? transactionsList[0].documentId : "";
        let transactionFromLabel = transactionsList[0].comment === "Expire" ? "Wallet Type" : transactionsList[0].transactionType === "D" ? "Used From" : "Added To";
        let transactionFromValue = multipleTransaction ? "Total Cash" : transactionsList[0].medWalletType === "MEDWALLET" ? "RegularCash" : "FlexiCash";
        let transactionAmountValue = multipleTransaction ? Math.abs(transactionsList[0].amount + transactionsList[1].amount) : Math.abs(transactionsList[0].amount);
        let balanceValue = multipleTransaction ? transactionsList[0].openingBalance + transactionsList[1].openingBalance + transactionsList[0].amount + transactionsList[1].amount : transactionsList[0].openingBalance + transactionsList[0].amount;
        let regularCashObj = transactionsList.filter((each) => { if (each.medWalletType === "MEDWALLET") return each; })[0];
        let flexiCashObj = transactionsList.filter((each) => { if (each.medWalletType === "FLEXI") return each; })[0];
        return (
            <div className="card mx-3">
                <div className="card-body wallet-content">
                    <p>
                        <img className="mb-1" alt="amount" src={amount} height="44" /><br />
                        {validate.isNotEmpty(transactionsList[0].transactionDate) &&
                            <span className="text-secondary">{moment(new Date(transactionsList[0].transactionDate)).format("MMM DD, YYYY")}</span>
                        }
                    </p>
                    {validate.isNotEmpty(documentIdLabel) &&
                        <p> <span className="text-secondary d-block mb-2">{documentIdLabel}</span>
                            {documentIdValue !== "" && <strong>{documentIdValue}</strong>}
                        </p>
                    }
                    {validate.isNotEmpty(transactionAmountValue) &&
                        <p> <span className="text-secondary d-block mb-2">Transaction</span>
                            <strong className={`${transactionsList[0].transactionType === "D" ? "text-brand" : "text-success"} ml-2`}>&#x20B9; {parseFloat(transactionAmountValue).toFixed(2)}
                                <span className="ml-1">{transactionsList[0].transactionType === "D" ? "(Dr)" : "(Cr)"}</span>
                            </strong>
                        </p>
                    }
                    {validate.isNotEmpty(balanceValue) &&
                        <p> <span className="text-secondary d-block mb-2">Balance (INR)</span>
                            <strong className="ml-2">&#x20B9; {parseFloat(balanceValue).toFixed(2)}</strong>
                        </p>
                    }
                    <p> <span className="text-secondary d-block mb-2">{transactionFromLabel}</span>
                        <span className="font-weight-bold">{transactionFromValue}</span>
                    </p>

                </div>
                {(transactionReason || multipleTransaction) &&
                    <div className="card-footer cash-details d-flex justify-content-between">
                        <p>
                            {transactionReason &&
                                <React.Fragment>
                                    Reason: <strong className="text-capitalize">{transactionReason}</strong>
                                </React.Fragment>
                            }
                        </p>
                        <p>
                        {multipleTransaction && 
                            <React.Fragment>
                            RegularCash <strong><span className='rupee'>&#x20B9;</span>{Math.abs(regularCashObj.amount)}</strong>
                                        <svg className="mx-3 vertical-inline-inherit" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                                            <path fill="#08ce73" d="M11.143,6.964H7.286V3.107a.857.857,0,0,0-.857-.857H5.571a.857.857,0,0,0-.857.857V6.964H.857A.857.857,0,0,0,0,7.821v.857a.857.857,0,0,0,.857.857H4.714v3.857a.857.857,0,0,0,.857.857h.857a.857.857,0,0,0,.857-.857V9.536h3.857A.857.857,0,0,0,12,8.679V7.821A.857.857,0,0,0,11.143,6.964Z" transform="translate(0 -2.25)"/>
                                        </svg>
                            FlexiCash <strong><span className='rupee'>&#x20B9;</span>{Math.abs(flexiCashObj.amount)}</strong></React.Fragment>
                        }
                        </p>
                    </div>
                }
            </div>
        )
    }

    return (
        <React.Fragment>
            <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo} />
            {!displayGhostImage && !displayNoDataFound &&
                <div id="walletSummary">
                    <div className="body bg-white my-wallet-summary pb-3">
                        <div className="align-items-baseline d-flex justify-content-between p-3">
                            <p className="mb-0 font-weight-bold"> Detailed History
                            </p>
                            {/* <p className="mb-0 text-right">
                                    {validate.isNotEmpty(availableBalance) &&
                                        <React.Fragment>
                                            <strong>
                                                Total Wallet Balance :
                                                    <strong className="ml-2 text-success"> {availableBalance}</strong> 
                                            </strong>
                                            <br/>
                                        </React.Fragment>
                                    }
                                    {validate.isNotEmpty(totalRows) && 
                                        <small className="text-secondary text-right">Showing {(currentPageNo-1)*recordsPerPage + 1} to {(currentPageNo*recordsPerPage > totalRows ? totalRows : currentPageNo*recordsPerPage )} of {totalRows} Entries </small> 
                                    }    
                                </p> */}
                            <p className='mb-0 wallet-history'>
                                <span className='mr-2'>
                                    <img src={WalletIcon} alt="MedPlus Wallet" title="MedPlus Wallet" height="36"/>
                                </span>
                                <span className="amount-text">
                                    <small className='mr-2'>Total Wallet Balance</small>
                                    <strong className="rupee">&#x20B9;</strong> {parseFloat(availableBalance).toFixed(2)}</span>
                            </p>
                            {availableFrom && <p className="records-text">
                                <small className="text-secondary">Records available from {moment(new Date(availableFrom)).format("MMM DD, YYYY")}</small>
                                {/* <span className="dot-separator text-dark"></span>
                                    {validate.isNotEmpty(totalRows) && 
                                        <React.Fragment>
                                            <small className="text-muted text-right">Showing {(currentPageNo-1)*recordsPerPage + 1} to {(currentPageNo*recordsPerPage > totalRows ? totalRows : currentPageNo*recordsPerPage )} of {totalRows} Entries </small> 
                                        </React.Fragment>
                                    }   */}
                            </p>}
                        </div>

                        {/* detail summary of current balances  */}
                        {/* <div className="detailed-content">
                                <p>
                                    <span className="label-text">
                                        RegularCash
                                    </span>
                                    <br/>
                                <span className="amount-text"><strong className="rupee">&#x20B9;</strong> {parseFloat(regularCash).toFixed(2)}</span>
                                </p>
                                <p>
                                    <span className="label-text">
                                        FlexiCash
                                    </span>
                                    <br/>
                                    <span className="amount-text"><strong className="rupee">&#x20B9;</strong> {parseFloat(flexiCash).toFixed(2)}</span>
                                </p>
                                <p>
                                    <span className="label-text">
                                    Total Balance
                                    </span>
                                    <br/>
                                    <span className="amount-text"><strong className="rupee">&#x20B9;</strong> {parseFloat(availableBalance).toFixed(2)}</span>
                                </p>
                            </div> */}
                        {validate.isNotEmpty(walletTransactions) &&
                            Object.keys(walletTransactions).reverse().map((transactionId, i) => {
                                return (walletTransactions[transactionId] &&
                                    <WalletTransaction transactionsList={walletTransactions[transactionId]} key={i} history={props.history}></WalletTransaction>
                                );
                            })
                        }
                        {validate.isNotEmpty(walletTransactions) &&
                            <PaginationComponent totalNoOfRecords={totalRows} recordsPerPage={recordsPerPage} currentPageNo={currentPageNo} onSelectHandler={getWalletTransactionDetails}></PaginationComponent>
                        }
                    </div>
                </div>
            }
            {displayGhostImage &&
                <GhostImage />
            }
            {displayNoDataFound &&
                <section>
                    <div className="no-wallet-transaction body-height">
                        <img src={NoWalletHistory} alt="no wallet history" title="no wallet history" />
                        <h6>No wallet Transactions</h6>
                        <button className="btn px-5 btn-brand-gradient rounded-pill custom-btn-lg" onClick={redirectToHome}>Start Ordering</button>
                    </div>
                </section>
            }
        </React.Fragment>
    )
}
export default WalletSummary;