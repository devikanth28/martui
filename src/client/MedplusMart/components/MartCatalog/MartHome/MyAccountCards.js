import React, { useEffect, useState } from "react";
import PurchaseHistoryIcon from '../../../../images/common/purchasehistory_color_icon_44px.svg'
import FrequentlyOrderIcon from '../../../../images/common/Frequently_ordered_44px.svg'
import MyHealthRecordsIcon from '../../../../images/common/healthrecords_color_icon_44px.svg'
import RefillIcon from '../../../../images/common/refill-icn-44.svg';
import MyAccountGhostImage from "../MartHome/MyAccountGhostImage";
import CustomerAccountCard from '../../Common/CustomerAccountCard';
import DoctorConsultationService from "../../../../DoctorConsultation/services/DoctorConsultationService";
import Validate from "../../../../helpers/Validate";
import MyAccountService from "../../../../services/MyAccountService";
import { useDispatch, useSelector } from "react-redux";
import TrackOrderIcon from '../../../../images/common/trackOrder_44px.svg'
import RetryPaymentIcon from '../../../../images/common/retry-payment_44px.svg'
import { SAVE_DISPLAY_ORDER_ID_FOR_TRACKING, SAVE_ORDER_ID_FOR_TRACKING, SAVE_ORDER_INFO_FOR_TRACKING } from "../../../../../redux/reducer/TrackOrderReducer";

const MyAccountCards = (props) => {
    const [isCardsLoading, setIsCardsLoading] = useState(true);
    const [upcomingDoctorConsultationBookingId, setUpcomingDoctorConsulatationBookingId] = useState();
    const [retryPaymentOrderId, setRetryPaymentOrderId] = useState([]);
    const [trackOrderInfo, setTrackOrderInfo] = useState([]);
    const [doctorImage, setDoctorImage] = useState("");
    const doctorconsultationService = DoctorConsultationService();
    const myAccountService = MyAccountService();
    const validate = Validate();
    const [orderId, setOrderId] = useState();
    let myAccountCardData = [];
    const dispatch = useDispatch();

    useEffect(() => {
        getUpcomingConsultations();
        getLatestOrderInfoForCustomer();
        getRetryPaymentInfoForCustomer();
    }, []);

    const getUpcomingConsultations = () => {
        setIsCardsLoading(true);
        doctorconsultationService.getUpComingConsultations().then((data) => {
            if (validate.isNotEmpty(data.statusCode) && data.statusCode === 'SUCCESS' && validate.isNotEmpty(data?.dataObject?.doctorConsultations) && data.dataObject.doctorConsultations.length > 0) {
                setUpcomingDoctorConsulatationBookingId(data.dataObject.doctorConsultations[0].displayOrderId);
                setDoctorImage(data.dataObject.doctorConsultations[0]?.doctorServiceInfo?.profile);
            }
            setIsCardsLoading(false);
        }).catch((err)=>{
            setIsCardsLoading(false);
            console.log(err);
        })
    }

    const getLatestOrderInfoForCustomer = () => {
        setIsCardsLoading(true);
        myAccountService.getLatestOrderForCustomer().then((data) => {
            if (data?.statusCode === 'SUCCESS' && validate.isNotEmpty(data?.dataObject?.orderId)) {
                setOrderId(data?.dataObject?.displayOrderId);
                dispatch({
                    type: SAVE_DISPLAY_ORDER_ID_FOR_TRACKING,
                    data: data?.dataObject?.displayOrderId
                });
                dispatch({
                    type: SAVE_ORDER_ID_FOR_TRACKING,
                    data: data?.dataObject?.orderId
                });
                if (validate.isNotEmpty(data?.dataObject?.orderId)) {
                    myAccountService.getOrderTrackInfo(data.dataObject.orderId).then(data => {
                        if(data?.statusCode === "SUCCESS" && validate.isNotEmpty(data?.dataObject)) {
                            setTrackOrderInfo(data.dataObject);
                            dispatch({
                                type: SAVE_ORDER_INFO_FOR_TRACKING,
                                data: data.dataObject
                            });
                        }
                    })
                }
            }
            setIsCardsLoading(false);
        }).catch((err)=>{
            setIsCardsLoading(false);
            console.log(err);
        })
    }

    const getRetryPaymentInfoForCustomer = () =>{
        setIsCardsLoading(true);
        myAccountService.getRetryPaymentInfoForCustomer().then((data) => {
            if (data.statusCode === 'SUCCESS' && validate.isNotEmpty(data.dataObject)) {
                setRetryPaymentOrderId(data.dataObject);
            }
            setIsCardsLoading(false);
        }).catch((err)=>{
            setIsCardsLoading(false);
            console.log(err);
        })
    }

    const myPurchases = {
        title: "My Purchases",
        description: "View all the purchases",
        imagePath: PurchaseHistoryIcon,
        redirectTo: "/ordersHistory",
    };
    const frequentlyOrderedList = {
        title: "Frequently Ordered List",
        description: "Re-Order from saved products",
        imagePath: FrequentlyOrderIcon,
        redirectTo: "/myWishList",
    };
    const upcomingConsultation = {
        title: "Upcoming Consultation",
        description: "BID:" + upcomingDoctorConsultationBookingId,
        imagePath: doctorImage,
        redirectTo: "/doctorconsultation/bookings",
    };
    const myHealthRecords = {
        title: "My Health Records",
        description: "View all the health records",
        imagePath: MyHealthRecordsIcon,
        redirectTo: "/viewPrescription",
    };
    const trackOrderData = {
        title: "Track Order",
        description: "Order ID:" + orderId,
        imagePath: TrackOrderIcon,
        redirectTo: "/orderDetails/" + useSelector(state => state?.trackOrder?.orderId ? state.trackOrder.orderId : ""),
    };
    const myRefills = {
        title: "My Refills",
        description: "See all the refills status",
        imagePath: RefillIcon,
        redirectTo: "/myRefills",
    };
    const retryPayementData = {
        title: "Your last order was unsuccessful",
        description: "Retry Payment",
        imagePath: RetryPaymentIcon,
        redirectTo: "/retryPayment/" + retryPaymentOrderId,
    };

    const cardPositionFunction = () => {
        myAccountCardData = [myPurchases, frequentlyOrderedList];
        if (validate.isEmpty(retryPaymentOrderId) && validate.isEmpty(trackOrderInfo)) {
            if (validate.isEmpty(upcomingDoctorConsultationBookingId)) {
                myAccountCardData = [...myAccountCardData, myHealthRecords, myRefills];
            } else {
                myAccountCardData = [...myAccountCardData, myHealthRecords, upcomingConsultation];
            }
        } else if (validate.isNotEmpty(retryPaymentOrderId)) {
            if (validate.isNotEmpty(upcomingDoctorConsultationBookingId)) {
                myAccountCardData = [...myAccountCardData, upcomingConsultation, retryPayementData];
            } else {
                myAccountCardData = [...myAccountCardData, myHealthRecords, retryPayementData];
            }
        } else if (validate.isNotEmpty(trackOrderInfo)) {
            if (validate.isNotEmpty(upcomingDoctorConsultationBookingId)) {
                myAccountCardData = [...myAccountCardData, upcomingConsultation, trackOrderData];
            } else {
                myAccountCardData = [...myAccountCardData, myHealthRecords, trackOrderData];
            }
        }
        return myAccountCardData;
    }

    return (
        <React.Fragment>
            <div className="mb-2">
                <h5>My Account</h5>
            </div>
            {!isCardsLoading && <section className="p-4 section-seperator">
                <div className="d-flex my-account-section-cards">
                    {cardPositionFunction().map((each) => {
                        return (
                            <CustomerAccountCard history={props.history} title={each.title} description={each.description} imagePath={each.imagePath} redirectTo={each.redirectTo} />
                        )
                    })}
                </div>
            </section>}
            {isCardsLoading && <MyAccountGhostImage />}
        </React.Fragment>
    )
}
export default MyAccountCards