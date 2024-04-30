import React from 'react'
import PaymentHeader from './PaymentHeader'
import PaymentModes from './PaymentModes'

const PaymentHome = () => {
  return (
    <>
    <PaymentHeader/>
    <div className='container-lg container-fluid'>

    <PaymentModes/>
    </div>
    <footer className="footer fixed-bottom mt-auto py-2">
                <div className="container-lg container-fluid px-0 px-sm-3">
                    <div className="row align-items-center no-gutters">
                    	<div className="col-12 payment-footer">
                            <button role="button"/*  onClick={()=>handleBack()} */ className="btn brand-secondary px-5 rounded-pill custom-btn-lg">Back</button>
                            {/* !isRetryPayment && 
                                <button role="button" onClick={()=>props.history.push("/doctorconsultation")} className="btn btn-dark px-5 ml-3">Browse Other Doctors</button>
                            */}
                                <button role="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3 custom-btn-lg" /* onClick={() => createBooking("C", "COD", null)} */>Confirm &amp; Proceed</button>
                        </div>
                    </div>
                </div>
            </footer>
    </>
  )
}

export default PaymentHome