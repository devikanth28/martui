import React from "react"
import amount from '../../../images/common/amount.svg';
const SubscriptionTransactionHistory=(props)=>{
    return(
        <React.Fragment>
            <div className="bg-white my-wallet-summary ml-3 w-100">
                <div className="card">
                    <div className="card-body wallet-content font-16">
                        <p>
                            <img src={amount} alt="Transaction Icon" title="trancation icon" height="44"/>
                            <br/>
                            <span className="text-secondary">Jul 17, 2021</span>
                        </p>
                        <p>
                            <span className="text-secondary d-block">Payment Mode</span>
                            <span className="font-weight-bold">Online</span>
                        </p>
                        <p>
                            <span className="text-secondary d-block">Transaction Number</span>
                            <span className="font-weight-bold">P2105270712594485092557</span>
                        </p>
                        <p>
                            <span className="text-secondary d-block">Status</span>
                            <span className="font-weight-bold">Paid</span>
                        </p>
                        <p>
                            <span className="text-secondary d-block">Amount</span>
                            <span className="font-weight-bold">399</span>
                        </p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body wallet-content font-16">
                        <p>
                            <img src={amount} alt="Transaction Icon" title="trancation icon" height="44"/>
                            <br/>
                            <span className="text-secondary">Jul 17, 2021</span>
                        </p>
                        <p>
                            <span className="text-secondary d-block">Payment Mode</span>
                            <span className="font-weight-bold">Online</span>
                        </p>
                        <p>
                            <span className="text-secondary d-block">Transaction Number</span>
                            <span className="font-weight-bold">P2105270712594485092557</span>
                        </p>
                        <p>
                            <span className="text-secondary d-block">Status</span>
                            <span className="font-weight-bold">Paid</span>
                        </p>
                        <p>
                            <span className="text-secondary d-block">Amount</span>
                            <span className="font-weight-bold">399</span>
                        </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default SubscriptionTransactionHistory