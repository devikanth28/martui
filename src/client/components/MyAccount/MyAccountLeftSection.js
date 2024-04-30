import React, { useState, useEffect } from 'react';
import MyProfileIcn from "../../images/common/myprofile-icn-36-cssbg.svg";
import { useSelector } from 'react-redux';
import HealthRecordsIcn from "../../images/common/healthrecords-icn-36-cssbg.svg";
import PurchaseHistoryIcn from "../../images/common/purchasehistory-icn-cssbg.svg";
import MyWishlistIcn from "../../images/common/mywishlist-icn-36-cssbg.svg";
import MyComplaintsIcn from "../../images/common/my-complaints-icn-36-cssbg.svg";
import MyBookingsIcn from "../../images/common/mybookings-icn-36-cssbg.svg";
import FlexiRewardsIcn from "../../images/common/flexirewards-icn-36-cssbg.svg";
import PaybackIcn from '../../images/common/PaybackPointsIcon-36-cssbg.svg'
import MedplusWalletIcn from "../../images/common/medpluswallet-icn-36-cssbg.svg";
import RefillHistoryIcn from "../../images/common/refillhistory-icn-cssbg.svg";
import LabOrderIcn from "../../images/common/lab-orders-icn-cssbg.svg";
import FrequentlyOrderedIcn from "../../images/common/frequently-ordered-list-36px.svg";
import MDxPointsIcn from '../../images/common/MDxPointsWallet_36px.svg';
import Image from "../../components/Common/Image";
import LocalDB from '../../DataBase/LocalDB';
import Validate from '../../helpers/Validate';
 

const MyAccountLeftSection = (props) => {
    const locality = useSelector(state => state.locality);
    let selectedLocality = {};
    if(Validate().isNotEmpty(locality)) {
        selectedLocality = locality.selectedLocality;
    }
    let showMyWallet = selectedLocality && (selectedLocality.showMyWallet=='Y' || selectedLocality.showMyWallet=='y');

    const redirectTo = (path)=> {
        window.scrollTo(0, 0);
        props.history.push('/'+ path);
    }
    return (
        <React.Fragment>
            <section className="user-profile-tabs">
                <ul className="list-group list-group-flush rounded">
                    <li className={`list-group-item ${props.routePath == "myAccount" ? "active" : "" }`} onClick={()=>redirectTo('myProfile')}>
                    <Image src={MyProfileIcn}  alt="My Profile" title="My Account" ></Image>
                        <p>My Account</p>
                    </li>
                    <li className={`list-group-item ${props.routePath == "purchaseHistory" ? "active" : "" }`} onClick={()=>{LocalDB.setObject("loadOrders", {"loadNormalOrder" : true, "loadCanceledOrder" : true}); redirectTo('ordersHistory')}}>
                        <Image src={PurchaseHistoryIcn} alt="Purchase History" title="Purchase History"/>
                        <p>Purchase History</p>
                    </li>
                    <li className={`list-group-item gtm-lab-orders-tracker ${(props.routePath == "labOrders" || props.routePath == "labOrderDetail") ? "active" : "" }`} onClick={()=>{redirectTo('labOrders')}}>
                        <Image src={LabOrderIcn} alt="Lab Orders" title="Lab Orders"/>
                        <p>My Lab Orders</p>
                    </li>
                    <li className={`list-group-item ${props.routePath == "myRefills" || props.routePath =="refillDetails" ? "active" : "" }`} onClick={()=>redirectTo('myRefills')}>
                        <Image src={RefillHistoryIcn} alt="Refill History" title="Refill History"/>
                        <p>Refill History</p>
                    </li>
                    <li className={`list-group-item ${props.routePath == "viewPrescription" || props.routePath == "healthTrends" ? "active" : "" }`} onClick={()=>redirectTo('viewPrescription')}>
                        <Image src={HealthRecordsIcn} alt="Health Records" title="Health Records"/>
                        <p>Health Records</p>
                    </li>
                    <li className={`list-group-item ${props.routePath == "myWishlist" ? "active" : "" }`} onClick={()=>redirectTo('myWishList')}>
                        <Image src={FrequentlyOrderedIcn} alt="Frequently Ordered List" title="Frequently Ordered List"/>
                        <p>Frequently Ordered List</p>
                    </li>
                    <li className={`list-group-item ${props.routePath == "myBookings" || props.routePath == "doctorconsultationbookings" ? "active" : "" }`} onClick={()=>redirectTo('myBookings')}>
                        <Image src={MyBookingsIcn} alt="MyBookings" title="MyBookings"/>
                        <p>My Bookings</p>
                    </li>
                    <li className={`list-group-item ${props.routePath == "flexiRewards" ? "active" : "" }`} onClick={()=>redirectTo('flexiRewards')}>
                        <Image src={FlexiRewardsIcn} alt="FlexiRewards" title="FlexiRewards"/>
                        <p>FlexiRewards</p>
                    </li>
                    <li className={`list-group-item ${props.routePath == "mdxPointsHistory" ? "active" : "" }`} onClick={()=>redirectTo('mdx/pointHistory')}>
                        <Image src={MDxPointsIcn} alt="MDx Points Wallet History" title="MDx Points Wallet History"/>
                        <p>MDx Points Wallet History</p>
                    </li>
                    <li className={`list-group-item ${props.routePath == "paybackPointsHistory" ? "active" : "" }`} onClick={()=>redirectTo('payback/pointHistory')}>
                        <Image src={PaybackIcn} alt="MedPlus Payback Points History" title="MedPlus Payback Points History"/>
                        <p>MedPlus Payback Points History</p>
                    </li>
                    {showMyWallet &&
                    <li className={`list-group-item ${props.routePath == "myWallet" ? "active" : "" }`} onClick={()=>redirectTo('myWallet')}>
                        <Image src={MedplusWalletIcn} alt="My Wallet" title="My Wallet"/>
                        <p>My Wallet</p>
                    </li>}
                    <li className={`list-group-item ${props.routePath == "myComplaints" ? "active" : "" }`} onClick={()=>redirectTo('myComplaints')}>
	                    <Image src={MyComplaintsIcn} alt="My Complaints" title="My Complaints"/>
	                    <p>My Complaints</p>
	                </li>
                </ul>
            </section>
        </React.Fragment>
    )
}

export default MyAccountLeftSection;
