import React from 'react';
import CONFIG from '../../constants/ServerConfig';

const MyAccountBreadcrumb = (props) => {

    const pageTitles = {myAccount: "My Profile",
        viewPrescription: "Health Records",
        purchaseHistory: "Purchase History",
        labOrders: "My Lab Orders",
        labOrderDetail: "My Lab Orders",
        myWishlist: "Frequently Ordered List",
        myRefills:"Refill History",
        refillDetails:"Refill History",
        myCoupons: "My Coupons",
        myBookings: "My Bookings",
        flexiRewards: "FlexiRewards",
        redeemRewards : "FlexiRewards",
        myWallet: "MedPlus Wallet",
        myComplaints: "My Complaints",
        prescriptionUpload: "Upload Prescription",
        newUserPrescriptionUpload: "Upload Prescription",
        doctorconsultationbookings: "My Bookings",
        paybackPointsHistory: "MedPlus Payback Points History",
        mdxPointsHistory : "MDx Points Wallet History",
        healthTrends : "Health Trends",

    };

    const goToHome = () => {
        window.location.href = CONFIG.REDIRECT_HOME_URL;
    }

    const goToMyAccount = () => {
        props.history.push('/myProfile');
    }

    return (
        <React.Fragment>
            <nav aria-label="breadcrumb bg-none">
                <ol className="breadcrumb bg-none mb-0">
                    <li className="breadcrumb-item"><button className='btn btn-link p-0 text-decoration-none' role="button" title = "Home" onClick={goToHome}>Home</button></li>
                    { (pageTitles[props.routePath] =='My Profile') && <li className="breadcrumb-item text-secondary">My Account</li>}
                    { !(pageTitles[props.routePath] =='My Profile') && !(pageTitles[props.routePath] =='Upload Prescription') && <li className="breadcrumb-item efsver"><button className='btn btn-link p-0 text-decoration-none' role="button" title = "My Account" onClick={goToMyAccount}>My Account</button></li>}
                    { !(pageTitles[props.routePath] =='My Profile') && <li className="breadcrumb-item text-secondary" aria-current="page">{pageTitles[props.routePath]}</li>}
                </ol>
            </nav>
        </React.Fragment>
    );
}

export default MyAccountBreadcrumb;