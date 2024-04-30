import React from 'react';
import Loadable from 'react-loadable';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router';
import CheckoutRoute from './client/components/Authentication/CheckoutRoute';
import MyAccountRoute from './client/components/Authentication/MyAccountRoute';
import PageRedirection from './client/components/Common/PageRedirection';
import StaticRoute from "./client/components/Common/StaticRoute";
import GenaralChatContainer from "./client/components/Chat/Container/GenaralChatContainer";
import LabCatalogRoute from "./client/components/MedplusLabs/routes/LabCatalogRoute";
import LabCheckoutRoute from "./client/components/Authentication/LabCheckoutRoute";
import DoctorConsultationRoute from "./client/DoctorConsultation/routes/DoctorConsultationRoute";
import SubscriptionRoute from "./client/components/Subscription/routes/SubscriptionRoute";
import MartCatalogRoute from './client/MedplusMart/components/routes/MartCatalogRoute';
import LabHomePageRoute from "./client/components/Common/LabHomePageRoute";
import SubscriptionGatewayResponse from "./client/components/Subscription/components/SubscriptionGatewayResponse";
import { SIGNIN_OTP_VERIFY, REGISTRATION } from './client/components/Common/RoutingConstants';
import VideoResponse from "./client/DoctorConsultation/components/pageComponents/VideoResponse";
import ConsultationInitiation from "./client/DoctorConsultation/components/pageComponents/ConsultationInitiation";
import MartPromoRoute from './client/components/MartPromos/MartPromoRoute';
import { MEDPLUS_ADVANTAGE_HOME, MEDPLUS_ADVANTAGE_URL_PREFIX } from './client/components/Subscription/constants/SubscriptionConstants';
import { DIAGNOSTICS_HOME, DIAGNOSTICS_URL_PREFIX } from './client/components/MedplusLabs/constants/LabConstants';
import MartAdminRoute from './client/MedplusMart/components/routes/MartAdminRoute';
import KnowYourMedicineRoute from './client/MedplusMart/components/routes/KnowYourMedicineRoute.js';
import UnauthRoute from './client/components/Authentication/UnauthRoute.js';

const Loading = <div className="load-bar" style={{ top: '9px' }}>
    <div className="bar"></div>
</div>

const Home = Loadable({
    loader: () => import(/* webpackChunkName: "home" */ './client/Sample'),
    modules: ['home'],
    loading: () => Loading,
});

const ShoppingCart = Loadable({
    loader: () => import(/* webpackChunkName: "shoppingCart" */ './client/components/ShoppingCart/ShoppingCart'),
    modules: ['shoppingCart'],
    loading: () => Loading,
});

const DeliveryDetail = Loadable({
    loader: () => import(/* webpackChunkName: "shippingDetail" */ './client/components/Checkout/Delivery/DeliveryDetail'),
    modules: ['shippingDetail'],
    loading: () => Loading,
});

const Prescription = Loadable({
    loader: () => import(/* webpackChunkName: "prescription" */ './client/components/Checkout/Prescription/Prescription'),
    modules: ['prescription'],
    loading: () => Loading,
});

const Payment = Loadable({
    loader: () => import(/* webpackChunkName: "payment" */ './client/components/Checkout/Payments/Payment'),
    modules: ['payment'],
    loading: () => Loading,
});

const orderReview = Loadable({
    loader: () => import(/* webpackChunkName: "orderReview" */ './client/components/Checkout/OrderReview/OrderSummary'),
    modules: ['orderReview'],
    loading: () => Loading,
});

const thankyou = Loadable({
    loader: () => import(/* webpackChunkName: "thankyou" */ './client/components/Checkout/Thankyou/Thankyou'),
    modules: ['thankyou'],
    loading: () => Loading,
})

const WalletPayment = Loadable({
    loader: () => import(/* webpackChunkName: "walletPayment" */ './client/components/Wallet/WalletPayment'),
    modules: ['wallet'],
    loading: () => Loading,
});


const MyProfile = Loadable({
    loader: () => import(/* webpackChunkName: "MyProfile" */ './client/components/MyAccount/MyProfile/MyProfile'),
    modules: ['myProfile'],
    loading: () => Loading,
});

const myWishlist = Loadable({
    loader: () => import(/* webpackChunkName: "myWishlist" */ './client/components/MyAccount/WishList/WishList'),
    modules: ['myWishlist'],
    loading: () => Loading,
});

const healthRecords = Loadable({
    loader: () => import(/* webpackChunkName: "healthRecords" */ './client/components/MyAccount/HealtRecords/HealthRecords'),
    modules: ['healthRecords'],
    loading: () => Loading,
});

const HealthTrendsDashBoard = Loadable({
    loader: () => import(/* webpackChunkName: "healthTrends" */ './client/components/MyAccount/HealtRecords/HealthTrendsDashBoard'),
    modules: ['healthRecords'],
    loading: () => Loading,
})

const OrderHistoryHeader = Loadable({
    loader: () => import(/* webpackChunkName: "orderHistoryHeader" */ './client/components/MyAccount/PurchaseHistory/OrderHistoryHeader'),
    modules: ['purchaseHistory'],
    loading: () => Loading,
});

const OrderHistoryReOrder = Loadable({
    loader: () => import(/* webpackChunkName: "orderHistoryReOrder" */ './client/components/MyAccount/PurchaseHistory/OrderHistoryReOrder'),
    modules: ['purchaseHistory'],
    loading: () => Loading,
});

const OrderHistoryDetails = Loadable({
    loader: () => import(/* webpackChunkName: "orderHistoryDetails" */ './client/components/MyAccount/PurchaseHistory/OrderHistoryDetails'),
    modules: ['purchaseHistory'],
    loading: () => Loading,
});

const PurchaseHistory = Loadable({
    loader: () => import(/* webpackChunkName: "purchaseHistory" */ './client/components/MyAccount/PurchaseHistory/PurchaseHistory'),
    modules: ['purchaseHistory'],
    loading: () => Loading,
});

const LabOrders = Loadable({
    loader: () => import(/* webpackChunkName: "labOrders" */ './client/components/MyAccount/LabOrders/LabOrders'),
    modules: ['labOrders'],
    loading: () => Loading,
});

const LabOrderDetail = Loadable({
    loader: () => import(/* webpackChunkName: "labOrderDetail" */ './client/components/MyAccount/LabOrders/LabOrderDetail'),
    modules: ['labOrderDetail'],
    loading: () => Loading,
});

const refillHistory = Loadable({
    loader: () => import(/* webpackChunkName: "refillHistory" */ './client/components/MyAccount/RefillHistory/RefillHistory'),
    modules: ['refill'],
    loading: () => Loading,
});

const refillDeatils = Loadable({
    loader: () => import(/* webpackChunkName: "refillDetails" */ './client/components/MyAccount/RefillHistory/RefillDetails'),
    modules: ['refill'],
    loading: () => Loading,
});

const flexiCart = Loadable({
    loader: () => import(/* webpackChunkName: "flexiCart" */ './client/components/MyAccount/FlexiRewards/FlexiCart'),
    modules: ['flexiCart'],
    loading: () => Loading,
});

const flexiReview = Loadable({
    loader: () => import(/* webpackChunkName: "flexiReview" */ './client/components/MyAccount/FlexiRewards/FlexiReview'),
    modules: ['flexiReview'],
    loading: () => Loading,
});

const flexiThankYou = Loadable({
    loader: () => import(/* webpackChunkName: "flexiThankYou" */ './client/components/MyAccount/FlexiRewards/FlexiThankYou'),
    modules: ['flexiThankYou'],
    loading: () => Loading,
});

const medplusWallet = Loadable({
    loader: () => import(/* webpackChunkName: "wallet" */ './client/components/MyAccount/MyWallet/MedplusWallet'),
    modules: ['wallet'],
    loading: () => Loading,
});

const myComplaints = Loadable({
    loader: () => import(/* webpackChunkName: "myComplaints" */ './client/components/MyAccount/Complaints/MyComplaints'),
    modules: ['myComplaints'],
    loading: () => Loading,
});

const MyBookings = Loadable({
    loader: () => import(/* webpackChunkName: "myBookings" */ './client/components/MyAccount/MyBookings/MyBookingsHome'),
    modules: ['myBookings'],
    loading: () => Loading,
});

const FlexiRewards = Loadable({
    loader: () => import(/* webpackChunkName: "flexiRewards" */ './client/components/MyAccount/FlexiRewards/FlexiRewardsHome'),
    modules: ['flexiRewards'],
    loading: () => Loading,
});

const TermsAndConditions = Loadable({
    loader: () => import(/* webpackChunkName: "TermsAndConditions" */ './client/MedplusMart/components/MartCatalog/StaticComponents/TermsAndConditions'),
    modules: ['TermsAndConditions'],
    loading: () => Loading,
});

const ReturnsAndCancellations = Loadable({
    loader: () => import(/* webpackChunkName: "ReturnsAndCancellations" */ './client/MedplusMart/components/MartCatalog/StaticComponents/ReturnsAndCancellations'),
    modules: ['ReturnsAndCancellations'],
    loading: () => Loading,
});

const PrivacyPolicy = Loadable({
    loader: () => import(/* webpackChunkName: "PrivacyPolicy" */ './client/MedplusMart/components/MartCatalog/StaticComponents/PrivacyPolicy'),
    modules: ['PrivacyPolicy'],
    loading: () => Loading,
});

const coustomerFeedback = Loadable({
    loader: () => import(/* webpackChunkName: "coustomerFeedback" */ './client/components/StaticPages/CoustomerFeedback'),
    modules: ['coustomerFeedback'],
    loading: () => Loading,
});

const browseAllBrands = Loadable({
    loader: () => import(/* webpackChunkName: "browseAllBrands" */ './client/MedplusMart/components/MartCatalog/StaticComponents/BrowseAllBrands'),
    modules: ['browseAllBrands'],
    loading: () => Loading,
});

const AboutUs = Loadable({
    loader: () => import(/* webpackChunkName: "AboutUs" */ './client/MedplusMart/components/MartCatalog/StaticComponents/AboutUs'),
    modules: ['aboutUs'],
    loading: () => Loading,
});

const ContactUs = Loadable({
    loader: () => import(/* webpackChunkName: "ContactUs" */ './client/MedplusMart/components/MartCatalog/StaticComponents/ContactUs'),
    modules: ['ContactUs'],
    loading: () => Loading,
});

const pageNotFound = Loadable({
    loader: () => import(/* webpackChunkName: "pageNotFound" */ './client/components/StaticPages/PageNotFound'),
    modules: ['pageNotFound'],
    loading: () => Loading,
});

const siteMap = Loadable({
    loader: () => import(/* webpackChunkName: "siteMap" */ './client/MedplusMart/components/MartCatalog/StaticComponents/SiteMap'),
    modules: ['siteMap'],
    loading: () => Loading,
});

const UploadPrescription = Loadable({
    loader: () => import(/* webpackChunkName: "uploadPrescription" */ './client/components/UploadPresription/UploadPrescription'),
    modules: ['uploadPrescription'],
    loading: () => Loading,
});
const PrescriptionOrderThankYou = Loadable({
    loader: () => import(/* webpackChunkName: "prescriptionOrderThankYou" */ './client/components/UploadPresription/ThankYou'),
    modules: ['uploadPrescription'],
    loading: () => Loading,
});
const SignInForPrescriptionUPload = Loadable({
    loader: () => import(/* webpackChunkName: "SignInForPrescriptionUPload" */ './client/components/UploadPresription/SignInForUploadPrescription'),
    modules: ['uploadPrescription'],
    loading: () => Loading,
});

const LabShoppingCart = Loadable({
    loader: () => import(/* webpackChunkName: "labShoppingCart" */ './client/components/MedplusLabs/components/labCheckoutNew/ShoppingCart/LabShoppingCart'),
    modules: ['labShoppingCart'],
    loading: () => Loading,
});

const SampleCollection = Loadable({
    loader: () => import(/* webpackChunkName: "sampleCollection" */ './client/components/MedplusLabs/components/labCheckoutNew/SampleCollection/SampleCollection'),
    modules: ['sampleCollection'],
    loading: () => Loading,
});

const SlotSelection = Loadable({
    loader: () => import(/* webpackChunkName: "slotSelection" */ './client/components/MedplusLabs/components/labCheckoutNew/SlotSelection/SlotSelection'),
    modules: ['slotSelection'],
    loading: () => Loading,
});

const LabReviewCart = Loadable({
    loader: () => import(/* webpackChunkName: "labReviewCart" */ './client/components/MedplusLabs/components/labCheckoutNew/OrderReview/LabReviewCart'),
    modules: ['labReviewCart'],
    loading: () => Loading,
});

const LabPayment = Loadable({
    loader: () => import(/* webpackChunkName: "labPayment" */ './client/components/MedplusLabs/components/labCheckoutNew/LabPayment'),
    modules: ['labPayment'],
    loading: () => Loading,
});

const LabThankYou = Loadable({
    loader: () => import(/* webpackChunkName: "labThankYou" */ './client/components/MedplusLabs/components/labCheckoutNew/thankyou/LabThankYou'),
    modules: ['labThankYou'],
    loading: () => Loading,
});

const LabPaymentResponse = Loadable({
    loader: () => import(/* webpackChunkName: "labPaymentResponse" */ './client/components/Labs/LabCheckout/Payments/LabPaymentResponse'),
    modules: ['labPayment'],
    loading: () => Loading,
});

const DoctorPaymentResponse = Loadable({
    loader: () => import(/* webpackChunkName: "doctorPaymentResponse" */ './client/DoctorConsultation/components/pageComponents/Checkout/DoctorPaymentResponse'),
    modules: ['doctorPayment'],
    loading: () => Loading,
});

const SubscriptionHome = Loadable({
    loader: () => import(/* webpackChunkName: "SubscriptionHome" */ './client/components/Subscription/components/SubscriptionHome'),
    modules: ['SubscriptionHome'],
    loading: () => Loading,
});

const SubscriptionPlanDetail = Loadable({
    loader: () => import(/* webpackChunkName: "SubscriptionPlanDetail" */ './client/components/Subscription/components/SubscriptionPlanDetails'),
    modules: ['SubscriptionPlanDetail'],
    loading: () => Loading,
});
const SubscriptionLogin = Loadable({
    loader: () => import(/* webpackChunkName: "SubscriptionLogin" */ './client/components/Subscription/components/Login/SubscriptionLogin'),
    modules: ['SubscriptionLogin'],
    loading: () => Loading,
});
const SubscriptionLoginOtp = Loadable({
    loader: () => import(/* webpackChunkName: "SubscriptionLogin" */ './client/components/Subscription/components/Login/SubscriptionLoginOtp'),
    modules: ['SubscriptionLoginOtp'],
    loading: () => Loading,
});
const SubscriptionIntermediate = Loadable({
    loader: () => import(/* webpackChunkName: "SubscriptionLogin" */ './client/components/Subscription/components/Login/SubscriptionIntermediate'),
    modules: ['SubscriptionIntermediate'],
    loading: () => Loading,
})
const SubscriptionMembers = Loadable({
    loader: () => import(/* webpackChunkName: "SubscriptionMembers" */ './client/components/Subscription/components/MembersRegistration/SubscriptionMembers'),
    modules: ['Subscription'],
    loading: () => Loading,
})

const AddMembersToSubscription = Loadable({
    loader: () => import(/* webpackChunkName: "SubscriptionMembers" */ './client/components/Subscription/components/MembersRegistration/AddMembersToSubscription'),
    modules: ['Subscription'],
    loading: () => Loading,
})
const SubscriptionThankyou = Loadable({
    loader: () => import(/* webpackChunkName: "SubscriptionThankyou" */ './client/components/Subscription/components/SubscriptionThankyou'),
    modules: ['SubscriptionThankyou'],
    loading: () => Loading,
});

const SubscriptionMyBookings = Loadable({
    loader: () => import(/* webpackChunkName: "myBookings" */ './client/components/Subscription/components/MyBookings/MyBookingsHome'),
    modules: ['SubscriptionMyBookings'],
    loading: () => Loading,
});

const LabHomePage = Loadable({
    loader: () => import(/* webpackChunkName: "LabHomePage" */ './client/components/LabHomePage/LabHomePage'),
    modules: ['LabHomePage'],
    loading: () => Loading,
});
const LabCategoryPage = Loadable({
    loader: () => import(/* webpackChunkName: "LabCategoryPage" */ './client/components/LabHomePage/LabCategoryPage'),
    modules: ['LabCategoryPage'],
    loading: () => Loading,
});
const LabsProductDetailPage = Loadable({
    loader: () => import(/* webpackChunkName: "LabsProductDetailPage" */ './client/components/LabHomePage/LabsProductDetailPage'),
    modules: ['LabsProductDetailPage'],
    loading: () => Loading,
});
const LabsPathology = Loadable({
    loader: () => import(/* webpackChunkName: "LabsProductDetailPage" */ './client/components/LabHomePage/PathologyLandingPage'),
    modules: ['LabsProductDetailPage'],
    loading: () => Loading,
});
const LabsRadiology = Loadable({
    loader: () => import(/* webpackChunkName: "LabsProductDetailPage" */ './client/components/LabHomePage/RadiologyLandingPage'),
    modules: ['LabsProductDetailPage'],
    loading: () => Loading,
});
const LabsViewAll = Loadable({
    loader: () => import(/* webpackChunkName: "LabsProductDetailPage" */ './client/components/LabHomePage/ViewAll'),
    modules: ['LabsProductDetailPage'],
    loading: () => Loading,
});
const LabShoppingCartNew = Loadable({
    loader: () => import(/* webpackChunkName: "LabShoppingCartNew" */ './client/components/LabHomePage/LabShoppingCartNew'),
    modules: ['LabShoppingCartNew'],
    loading: () => Loading,
});
const LabReviewCartStatic = Loadable({
    loader: () => import(/* webpackChunkName: "LabReviewCart1" */ './client/components/LabHomePage/LabReviewCart'),
    modules: ['LabReviewCartStatic'],
    loading: () => Loading,
});

const LabThankYouStatic = Loadable({
    loader: () => import(/* webpackChunkName: "LabThankYouStatic" */ './client/components/LabHomePage/LabThankyouPageNew'),
    modules: ['LabThankYouStatic'],
    loading: () => Loading,
});

const LabSubscriptionHomePage = Loadable({
    loader: () => import(/* webpackChunkName: "LabSubscriptionHomePage" */ './client/components/LabSubscription/LabSubscriptionHomePage'),
    modules: ['LabSubscriptionHomePage'],
    loading: () => Loading,
});
const LabSubscriptionCompanySearch = Loadable({
    loader: () => import(/* webpackChunkName: "LabSubscriptionCompanySearch" */ './client/components/LabSubscription/LabSubscriptionCompanySearch'),
    modules: ['LabSubscriptionCompanySearch'],
    loading: () => Loading,
});
const LabSubscriptionCorporatePlan = Loadable({
    loader: () => import(/* webpackChunkName: "LabSubscriptionCorporatePlan" */ './client/components/LabSubscription/LabSubscriptionCorporatePlan'),
    modules: ['LabSubscriptionCorporatePlan'],
    loading: () => Loading,
});
const LabSubscriptionPlanDetail = Loadable({
    loader: () => import(/* webpackChunkName: "LabSubscriptionPlanDetail" */ './client/components/LabSubscription/LabSubscriptionPlanDetail'),
    modules: ['LabSubscriptionPlanDetail'],
    loading: () => Loading,
});
const SubscriptionUpgrade = Loadable({
    loader: () => import(/* webpackChunkName: "SubscriptionUpgrade" */ './client/components/LabSubscription/SubscriptionUpgrade'),
    modules: ['SubscriptionUpgrade'],
    loading: () => Loading,
});
const RenewPlan = Loadable({
    loader: () => import(/* webpackChunkName: "RenewPlan" */ './client/components/MyAccount/MyBookings/RenewPlan'),
    modules: ['RenewPlan'],
    loading: () => Loading,
});
const SubscriptionTransactionHistory = Loadable({
    loader: () => import(/* webpackChunkName: "SubscriptionTransactionHistory" */ './client/components/MyAccount/MyBookings/SubscriptionTransactionHistory'),
    modules: ['SubscriptionTransactionHistory'],
    loading: () => Loading,
});
const LabSubscriptionLogin = Loadable({
    loader: () => import(/* webpackChunkName: "SubscriptionUpgrade" */ './client/components/LabSubscription/SubscriptionLoginForm'),
    modules: ['SubscriptionLoginForm'],
    loading: () => Loading,
});
const LabSubscriptionLoginOtp = Loadable({
    loader: () => import(/* webpackChunkName: "SubscriptionUpgrade" */ './client/components/LabSubscription/SubscriptionLoginOtp'),
    modules: ['SubscriptionLoginOtp'],
    loading: () => Loading,
});

const LabBookings = Loadable({
    loader: () => import(/* webpackChunkName: "SubscriptionUpgrade" */ './client/components/LabSubscription/MyBookings'),
    modules: ['MyBookings'],
    loading: () => Loading,
});
const LabSubscriptionRegister = Loadable({
    loader: () => import(/* webpackChunkName: "SubscriptionUpgrade" */ './client/components/LabSubscription/LabSubscriptionRegister'),
    modules: ['LabSubscriptionRegister'],
    loading: () => Loading,
});
const SubscriptionCompanySearch = Loadable({
    loader: () => import(/* webpackChunkName: "SubscriptionCompanySearch" */ './client/components/Subscription/components/SubscriptionCompanySearch'),
    modules: ['SubscriptionCompanySearch'],
    loading: () => Loading,
});
const SubscriptionCorporatePlan = Loadable({
    loader: () => import(/* webpackChunkName: "SubscriptionCorporatePlan" */ './client/components/Subscription/components/SubscriptionCorporatePlan'),
    modules: ['SubscriptionCorporatePlan'],
    loading: () => Loading,
});
const LabSubscriptionCorporateRegister = Loadable({
    loader: () => import(/* webpackChunkName: "SubscriptionUpgrade" */ './client/components/LabSubscription/corporateRegister'),
    modules: ['LabSubscriptionRegister'],
    loading: () => Loading,
});

const SubscriptionPayment = Loadable({
    loader: () => import(/* webpackChunkName: "SubscriptionPayment" */ './client/components/Subscription/components/Payment'),
    modules: ['SubscriptionPayment'],
    loading: () => Loading,
});

const RetryPaymentIntermediate = Loadable({
    loader: () => import(/* webpackChunkName: "RetryPaymentIntermediate" */ './client/components/Subscription/components/RetryPaymentIntermediate'),
    modules: ['RetryPaymentIntermediate'],
    loading: () => Loading,
});


const testDetails = Loadable({
    loader: () => import(/* webpackChunkName: "testDetails" */ './client/components/MedplusLabs/components/labCatalog/testDetail/LabsProductDetailPage'),
    loading: () => Loading,
    modules: ['testDetails'],
});

const LabCategory = Loadable({
    loader: () => import(/* webpackChunkName: "testDetails" */ './client/components/MedplusLabs/components/labCatalog/LabCategoryPage'),
    loading: () => Loading,
    modules: ['LabCategory'],
});

const DoctorConsultationHomeOld = Loadable({
    loader: () => import(/* webpackChunkName: "DoctorConsultationHomeOld" */ './client/components/DoctorConsultation/DoctorConsultationHome'),
    loading: () => Loading,
    modules: ['DoctorConsultationHomeOld'],
});

const DoctorConsultationHome = Loadable({
    loader: () => import(/* webpackChunkName: "DoctorConsultationHome" */ './client/DoctorConsultation/components/pageComponents/DoctorConsultationHome'),
    loading: () => Loading,
    modules: ['DoctorConsultationHome'],
});

const DoctorCategeryPage = Loadable({
    loader: () => import(/* webpackChunkName: "DoctorCategeryPage" */ './client/components/DoctorConsultation/DoctorCategeryPage'),
    loading: () => Loading,
    modules: ['DoctorCategeryPage'],
});
const DoctorDetailPage = Loadable({
    loader: () => import(/* webpackChunkName: "DoctorDetailPage" */ './client/components/DoctorConsultation/DoctorDetailPage'),
    loading: () => Loading,
    modules: ['DoctorDetailPage'],
});
const DoctorSpecializationPage = Loadable({
    loader: () => import(/* webpackChunkName: "DoctorDetailPage" */ './client/components/DoctorConsultation/DoctorSpecialization'),
    loading: () => Loading,
    modules: ['DoctorSpecializationPage'],
});
const DoctorCategoryInfo = Loadable({
    loader: () => import(/* webpackChunkName: "DoctorCategoryInfo" */ './client/DoctorConsultation/components/moduleComponents/DoctorCategoryInfo'),
    loading: () => Loading,
    modules: ['DoctorCategoryInfo'],
});

const DoctorCheckout = Loadable({
    loader: () => import(/* webpackChunkName: "DoctorCheckout" */ './client/components/DoctorConsultation/DoctorConsultationCart'),
    loading: () => Loading,
    modules: ['DoctorCheckout'],
});

const DoctorConsultationCart = Loadable({
    loader: () => import(/* webpackChunkName: "DoctorConsultationCart" */ './client/DoctorConsultation/components/pageComponents/Checkout/DoctorConsultationCart'),
    loading: () => Loading,
    modules: ['DoctorConsultationCart'],
});

const ClinicSlotSelection = Loadable({
    loader: () => import(/* webpackChunkName: "ClinicSlotSelection" */ './client/DoctorConsultation/components/pageComponents/Checkout/ClinicSlotSelection'),
    loading: () => Loading,
    modules: ['ClinicSlotSelection'],
});

const DoctorSlotSelection = Loadable({
    loader: () => import(/* webpackChunkName: "DoctorSlotSelection" */ './client/components/DoctorConsultation/DoctorSlotSelection'),
    loading: () => Loading,
    modules: ['DoctorSlotSelection'],
});
const DoctorPayments = Loadable({
    loader: () => import(/* webpackChunkName: "DoctorPayments" */ './client/components/DoctorConsultation/DoctorPayments'),
    loading: () => Loading,
    modules: ['DoctorPayments'],
});
const DoctorThankYouPage = Loadable({
    loader: () => import(/* webpackChunkName: "DoctorThankYouPage" */ './client/components/DoctorConsultation/DoctorThankYouPage'),
    loading: () => Loading,
    modules: ['DoctorThankYouPage'],
});

const OnlineDoctors = Loadable({
    loader: () => import(/* webpackChunkName: "DoctorDetailPage" */ './client/components/DoctorConsultation/OnlineDoctors'),
    loading: () => Loading,
    modules: ['DoctorSpecializationPage'],
});

const OnlineOrWalkinDoctors = Loadable({
    loader: () => import(/* webpackChunkName: "OnlineOrWalkinDoctors" */ './client/DoctorConsultation/components/pageComponents/OnlineOrWalkinDoctors'),
    loading: () => Loading,
    modules: ['OnlineOrWalkinDoctors'],
});
const SymptomsViewAllPage = Loadable({
    loader: () => import(/* webpackChunkName: "SymptomsViewAllPage" */ './client/components/DoctorConsultation/SymptomsViewAllPage'),
    loading: () => Loading,
    modules: ['SymptomsViewAllPage'],
});
const LabHome = Loadable({
    loader: () => import(/* webpackChunkName: "LabHome" */ './client/components/MedplusLabs/components/Home/LabHome'),
    modules: ['LabHome'],
    loading: () => Loading,
});

const ViewAllTests = Loadable({
    loader: () => import(/* webpackChunkName: "ViewAllTests" */ './client/components/MedplusLabs/components/labCatalog/ViewAll'),
    loading: () => Loading,
    modules: ['ViewAllTests'],
})

const SignInPopUp = Loadable({
    loader: () => import(/* webpackChunkName: "SignInPopUp" */ './client/components/Common/signInModelBox/SignInPopUp'),
    loading: () => Loading,
    modules: ['SignInPopUp'],
})

const DoctorInfo = Loadable({
    loader: () => import(/* webpackChunkName: "DoctorInfo" */ './client/DoctorConsultation/components/pageComponents/DoctorInfo'),
    loading: () => Loading,
    modules: ['DoctorInfo'],
});

const DoctorConsultationPayment = Loadable({
    loader: () => import(/* webpackChunkName: "consultationPayment" */ './client/DoctorConsultation/components/pageComponents/Checkout/ReviewAndPayment'),
    loading: () => Loading,
    modules: ['consultationPayment'],
});

const DoctorThankYou = Loadable({
    loader: () => import(/* webpackChunkName: "DoctorThankYou" */ './client/DoctorConsultation/components/pageComponents/Checkout/DoctorThankYou'),
    modules: ['DoctorThankYou'],
    loading: () => Loading,
});
const DoctorCategoryViewAll = Loadable({
    loader: () => import(/* webpackChunkName: "DoctorCategoryViewAll" */ './client/DoctorConsultation/components/moduleComponents/DoctorCategoryViewAll'),
    modules: ['DoctorCategoryViewAll'],
    loading: () => Loading,
});
const Advertisement = Loadable({
    loader: () => import(/* webpackChunkName: "Advertisement" */ './client/components/StaticPages/Advertisement'),
    modules: [''],
    loading: () => Loading,
});
const MartFaq = Loadable({
    loader: () => import(/* webpackChunkName: "MartFaq" */ './client/MedplusMart/components/MartCatalog/StaticComponents/Faq'),
    modules: ["MartFaq"],
    loading: () => Loading,
});
const MartCustomerPromotion = Loadable({
    loader: () => import(/* webpackChunkName: "ConfigureCustomerPromotion" */ './client/MedplusMart/components/MartCatalog/StaticComponents/AdminScreen/ConfigureCustomerPromotion'),
    modules: [],
    loading: () => Loading,
});
const ConfigureRedisKey = Loadable({
    loader: () => import(/* webpackChunkName: "ConfigureRedisKey" */ './client/MedplusMart/components/MartAdminServices/AdminPages/redis/ConfigureRedis.js'),
    modules: [],
    loading: () => Loading,
});
const LocalityInfo = Loadable({
    loader: () => import(/* webpackChunkName: "LocalityInfo" */ './client/MedplusMart/components/MartAdminServices/AdminPages/common//LocalityInfo'),
    modules: [],
    loading: () => Loading,
});
const EmergencyMessageConfiguration = Loadable({
    loader: () => import(/* webpackChunkName: "EmergencyMessageConfiguration" */ './client/MedplusMart/components/MartAdminServices/AdminPages/common/EmergencyMessageConfiguration.js'),
    modules: [],
    loading: () => Loading,
});

const EnableReactCheckoutConfiguration = Loadable({
    loader: () => import(/* webpackChunkName: "EnableReactCheckoutConfiguration" */ './client/MedplusMart/components/MartCatalog/StaticComponents/AdminScreen/EnableReactCheckoutConfiguration.js'),
    modules: [],
    loading: () => Loading,
});
const EnableNewOrderHistory = Loadable({
    loader: () => import(/* webpackChunkName: "EnableNewOrderHistory" */ './client/MedplusMart/components/MartCatalog/StaticComponents/AdminScreen/EnableNewOrderHistory.js'),
    modules: [],
    loading: () => Loading,
});
const PaymentConfiguration = Loadable({
    loader: () => import(/* webpackChunkName: "PaymentConfiguration" */ './client/MedplusMart/components/MartCatalog/StaticComponents/AdminScreen/PaymentConfiguration.js'),
    modules: [],
    loading: () => Loading,
});
const configurePaymentPromotions = Loadable({
    loader: () => import(/* webpackChunkName: "configurePaymentPromotions" */ './client/MedplusMart/components/MartCatalog/StaticComponents/AdminScreen/configurePaymentPromotions.js'),
    modules: [],
    loading: () => Loading,
});
const PaybackTransHistory = Loadable({
    loader: () => import(/* webpackChunkName: "PaybackTransHistory" */ './client/components/MyAccount/FlexiRewards/PaybackTransHistory'),
    modules: ['PaybackTransHistory'],
    loading: () => Loading,
});
const PayBackPoints = Loadable({
    loader: () => import(/* webpackChunkName: "PayBackPoints" */ './client/components/PayBackPoints/PayBackPoints'),
    modules: ['PayBackPoints'],
    loading: () => Loading,
});

const WalletRechargeResponse = Loadable({
    loader: () => import(/* webpackChunkName: "walletrecharge" */ './client/components/Wallet/WalletRechargeResponse'),
    modules: ['WalletRecharge'],
    loading: () => Loading,
});

const WhatsApp = Loadable({
    loader: () => import(/* webpackChunkName : "WhatsApp"*/ './client/components/MartPromos/WhatsApp'),
    modules: ['WhatsApp'],
    loading: () => Loading
});

// ReactPages

const HomePage = Loadable({
    loader: () => import(/* webpackChunkName: "MartCatalogStaticPage" */ './client/components/MartCatalogStaticPages/HomePage/Homepage'),
    modules: ['HomePage'],
    loading: () => Loading,
});


const CategoryPage = Loadable({
    loader: () => import(/* webpackChunkName: "MartCatalogStaticPage" */ './client/components/MartCatalogStaticPages/Categorypage/CategoryPageMain'),
    modules: ['CategoryPage'],
    loading: () => Loading,
});

const PromotionsStaticPage = Loadable({
    loader: () => import(/* webpackChunkName: "Promotions" */ './client/components/MartCatalogStaticPages/Categorypage/Promotions.js'),
    modules: ['PromotionsStaticPage'],
    loading: () => Loading,
});

const SearchAllStaticPage = Loadable({
    loader: () => import(/* webpackChunkName: "SearchAllStaticPage" */ './client/components/MartCatalogStaticPages/Categorypage/SearchAll.js'),
    modules: ['SearchAllStaticPage'],
    loading: () => Loading,
});
const ProductDetailPage = Loadable({
    loader: () => import(/* webpackChunkName: "MartCatalogStaticPage" */ './client/components/MartCatalogStaticPages/ProductDetailPage/ProductDetailMain'),
    modules: ['ProductDetailPage'],
    loading: () => Loading,
});

const SafeAndSecure = Loadable({
    loader: () => import(/* webpackChunkName: "SafeAndSecure" */ './client/MedplusMart/components/MartCatalog/StaticComponents/SafeAndSecure'),
    modules: ['SafeAndSecure'],
    loading: () => Loading,
});

const FilterMain = Loadable({
    loader: () => import(/* webpackChunkName: "FilterMain" */ './client/components/MartCatalogStaticPages/Filters/FilterMain'),
    modules: ['FilterMain'],
    loading: () => Loading,
});

const CustomFeedbackForm = Loadable({
    loader: () => import(/* webpackChunkName: "CustomFeedbackForm" */ './client/components/MartCatalogStaticPages/CustomerFeedback/CustomerFeedbackForm'),
    modules: [],
    loading: () => Loading,
});
const ProductDetail = Loadable({
    loader: () => import(/* webpackChunkName: "ProductDetail" */ './client/MedplusMart/components/MartCatalog/ProductDetail/ProductDetail'),
    modules: ['ProductDetail'],
    loading: () => Loading,
});

const KymProductDetail = Loadable({
    loader: () => import(/* webpackChunkName: "ProductDetail" */ './client/KnowYourMedicine/components/KymProductDetails.js'),
    modules: ['ProductDetail'],
    loading: () => Loading,
});

const MartCategoryDetail = Loadable({
    loader: () => import(/* webpackChunkName: "MartCategoryDetail" */ './client/MedplusMart/components/MartCatalog/ProductCategory/CategoryDetail/CategoryDetail'),
    modules: ['MartCategoryDetail'],
    loading: () => Loading,
});

const MartHome = Loadable({
    loader: () => import(/* webpackChunkName: "MartHome" */ './client/MedplusMart/components/MartCatalog/MartHome/MartHome'),
    modules: ['MartHome'],
    loading: () => Loading,
});


const MartCategoryHome = Loadable({
    loader: () => import(/* webpackChunkName: "MartCategoryHome" */ './client/MedplusMart/components/MartCatalog/ProductCategory/CategoryHome/CategoryHome'),
    modules: ['MartCategoryHome'],
    loading: () => Loading,
});

const PharmacyHome = Loadable({
    loader: () => import(/* webpackChunkName: "PharmacyHome" */ './client/MedplusMart/components/MartCatalog/PharmacyCatalog/PharmaHome/PharmaHome'),
    modules: ['PharmaHome'],
    loading: () => Loading,
});

const PharmaManufacturerProducts = Loadable({
    loader: () => import(/* webpackChunkName: "PharmaManufacturerProducts" */ './client/MedplusMart/components/MartCatalog/PharmacyCatalog/PharmaManufacturer/PharmaManufacturerProducts'),
    modules: ['PharmaHome'],
    loading: () => Loading,
});

const PharmaHome = Loadable({
    loader: () => import(/* webpackChunkName: "PharmaHomeStatic" */ './client/components/StaticPages/PharmaHome'),
    modules: ['PharmaHome'],
    loading: () => Loading,
});

const PharmaCategory = Loadable({
    loader: () => import(/* webpackChunkName: "PharmaCategoryStatic" */ './client/components/StaticPages/PharmaCategory'),
    modules: ['PharmaCategory'],
    loading: () => Loading,
});

const BulkOrder = Loadable({
    loader: () => import(/* webpackChunkName: "BulkOrder" */ './client/MedplusMart/components/MartCatalog/StaticComponents/BulkOrder'),
    modules: [],
    loading: () => Loading,
});
const MartAdminHome = Loadable({
    loader: () => import(/* webpackChunkName: "MartAdminHome" */ './client/MedplusMart/components/MartAdminServices/AdminHome/MartAdminHome'),
    modules: ["MartAdminHome"],
    loading: () => Loading,
});
const CommunityDelivary = Loadable({
    loader: () => import(/* webpackChunkName: "CommunityDelivary" */ './client/MedplusMart/components/MartCatalog/StaticComponents/CommunityDelivary'),
    modules: ["CommunityDelivary"],
    loading: () => Loading,
});
const GeneralProductPage = Loadable({
    loader: () => import(/* webpackChunkName: "GeneralProductPage" */ './client/components/MartCatalogStaticPages/FooterStaticPages/GeneralProductPage'),
    modules: [],
    loading: () => Loading,
});
const StoreLocatarStaticPage = Loadable({
    loader: () => import(/* webpackChunkName: "StoreLocatar" */ './client/components/MartCatalogStaticPages/FooterStaticPages/StoreLocatar'),
    modules: [],
    loading: () => Loading,
});
const TopSearch = Loadable({
    loader: () => import(/* webpackChunkName: "TopSearches" */ './client/components/MartCatalogStaticPages/FooterStaticPages/TopSearchs'),
    modules: [],
    loading: () => Loading,
});
const AlphabetWiseProducts = Loadable({
    loader: () => import(/* webpackChunkName: "AplhabetWiseProducts" */ './client/components/MartCatalogStaticPages/FooterStaticPages/AlphabetWiseProducts'),
    modules: [],
    loading: () => Loading,
});
const AlphabetsWiseProducts = Loadable({
    loader: () => import(/* webpackChunkName: "AplhabetsWiseProducts" */ './client/MedplusMart/components/MartCatalog/StaticComponents/AlphabetWiseProducts'),
    modules: [],
    loading: () => Loading,
});

const BlogPostList = Loadable({
    loader: () => import(/* webpackChunkName: "BlogPostList" */ './client/components/Blog/BlogPostList'),
    modules: [],
    loading: () => Loading,
})
const BlogPostDetail = Loadable({
    loader: () => import(/* webpackChunkName: "BlogPostDetail" */ './client/components/Blog/BlogPostDetail'),
    modules: [],
    loading: () => Loading,
})
const PharmacyCategoryDetail = Loadable({
    loader: () => import(/* webpackChunkName: "PharmacyCategoryDetail" */ './client/MedplusMart/components/MartCatalog/PharmacyCatalog/PharmaCategoryDetail/PharmacyCategoryDetail'),
    modules: [],
    loading: () => Loading,
});

const ProductSearchAllResult = Loadable({
    loader: () => import(/* webpackChunkName: "ProductSearchAllResult" */ './client/MedplusMart/components/MartCatalog/ProductSearchResult/ProductSearchAllResult'),
    modules: [],
    loading: () => Loading,
});

const RequestProduct = Loadable({
    loader: () => import(/* webpackChunkName: "RequestProduct" */ './client/MedplusMart/components/MartCatalog/ProductSearchResult/RequestProduct'),
    modules: [],
    loading: () => Loading,
});

const CustomerFeedBack = Loadable({
    loader: () => import(/* webpackChunkName: "CustomerFeedBack" */ './client/MedplusMart/components/Common/CustomerFeedBack'),
    modules: [],
    loading: () => Loading,
});

const Cardiac = Loadable({
    loader: () => import(/* webpackChunkName : "Cardiac"*/ './client/components/MartPromos/Cardiac.js'),
    modules: ['Cardiac'],
    loading: () => Loading
})
const MriBrainPlan = Loadable({
    loader: () => import(/* webpackChunkName : "MriBrainPlain"*/ './client/components/MartPromos/MriBrainPlain.js'),
    modules: ['MriBrainPlain'],
    loading: () => Loading
})
const MriCervicalSpine = Loadable({
    loader: () => import(/* webpackChunkName : "MriCervicalSpine"*/ './client/components/MartPromos/MriCervicalSpine.js'),
    modules: ['MriCervicalSpine'],
    loading: () => Loading
})
const MriLumbarSpine = Loadable({
    loader: () => import(/* webpackChunkName : "MriLumbarSpine"*/ './client/components/MartPromos/MriLumbarSpine.js'),
    modules: ['MriLumbarSpine'],
    loading: () => Loading
})
const Mammography = Loadable({
    loader: () => import(/* webpackChunkName : "Mammography"*/ './client/components/MartPromos/Mammography.js'),
    modules: ['Mammography'],
    loading: () => Loading
})
const CtBrainPlain = Loadable({
    loader: () => import(/* webpackChunkName : "CtBrainPlain"*/ './client/components/MartPromos/CtBrainPlain.js'),
    modules: ['CtBrainPlain'],
    loading: () => Loading
})
const CtHrct = Loadable({
    loader: () => import(/* webpackChunkName : "CtHrct"*/ './client/components/MartPromos/CtHrct.js'),
    modules: ['CtHrct'],
    loading: () => Loading
})
const CtWholeAbdomen = Loadable({
    loader: () => import(/* webpackChunkName : "CtHrct"*/ './client/components/MartPromos/CtWholeAbdomen.js'),
    modules: ['CtWholeAbdomen'],
    loading: () => Loading
})
const BmdRegions = Loadable({
    loader: () => import(/* webpackChunkName : "BmdRegions"*/ './client/components/MartPromos/BmdRegions.js'),
    modules: ['BmdRegions'],
    loading: () => Loading
})

const MarketingPromo = Loadable({
    loader: () => import(/* webpackChunkName : "MarketingPromo"*/ './client/components/MartPromos/MarketingPromo.js'),
    modules: ['MarketingPromo'],
    loading: () => Loading
})

const PrintReportPage = Loadable({
    loader: () => import(/* webpackChunkName: "PrintReportPage" */ './client/components/MedplusLabs/components/Common/PrintReportPage.js'),
    loading: () => Loading,
    modules: ['PrintReportPage'],
});

const MartCategory = Loadable({
    loader: () => import(/* webpackChunkName: "MartCategory" */ './client/MedplusMart/components/Common/MartCategory'),
    loading: () => Loading,
    modules: ['MartCategory'],
});

const StoreLocator = Loadable({
    loader: () => import(/* webpackChunkName: "StoreLocatar" */ './client/MedplusMart/components/MartCatalog/MartHome/StoreLocator'),
    modules: ['StoreLocator'],
    loading: () => Loading,
});

const Promotions = Loadable({
    loader: () => import(/* webpackChunkName: "Promotions" */ './client/MedplusMart/components/MartCatalog/MartHome/Promotions'),
    modules: ['Promotions'],
    loading: () => Loading,
});
const LiveTracking = Loadable({
    loader: () => import(/* webpackChunkName: "LiveTracking"*/  './client/DoctorConsultation/components/moduleComponents/LiveTracking.js'),
    modules: ['LiveTracking'],
    loading: () => Loading,
});

const WalletRechargeCheckoutResponse = Loadable({
    loader: () => import(/* webpackChunkName: "WalletRechargeCheckoutResponse" */ './client/components/Wallet/WalletRechargeCheckoutResponse'),
    modules: ['WalletRechargeCheckoutResponse'],
    loading: () => Loading,
});

const OfferTermsandConditions = Loadable({
    loader: () => import(/* webpackChunkName: "OfferTermsandConditions" */ './client/MedplusMart/components/MartCatalog/StaticComponents/OfferTermsandConditions'),
    modules: [],
    loading: () => Loading,
})

const WalletTermsandConditions = Loadable({
    loader: () => import(/* webpackChunkName: "WalletTermsandConditions" */ './client/MedplusMart/components/MartCatalog/StaticComponents/WalletTermsandConditions'),
    modules: [],
    loading: () => Loading,
})

const UploadFile = Loadable({
    loader: () => import(/* webpackChunkName: "UploadFile" */ './client/MedplusMart/components/MartCatalog/StaticComponents/AdminScreen/UploadFile'),
    modules: [],
    loading: () => Loading,
});
const UnSubscribeFromRefill = Loadable({
    loader: () => import(/* webpackChunkName: "UnSubscribeFromRefill" */ './client/MedplusMart/components/MartAdminServices/AdminPages/common/UnSubscribeFromRefill'),
    modules: [],
    loading: () => Loading,
});

const ConfigureBulkOrderProducts = Loadable({
    loader: () => import(/* webpackChunkName: "ConfigureBulkOrderProducts" */ './client/MedplusMart/components/MartAdminServices/AdminPages/order/ConfigureBulkOrderProducts.js'),
    modules: [],
    loading: () => Loading,
});
const ProductDiscountDetail = Loadable({
    loader: () => import(/* webpackChunkName: "ProductDiscountDetail" */ './client/MedplusMart/components/MartAdminServices/AdminPages/common/ProductDiscountDetail.js'),
    modules: [],
    loading: () => Loading,
});
const FooterForLabsAndDoctors = Loadable({
    loader: () => import(/* webpackChunkName: "FooterForLabsAndDoctors" */ './client/MedplusMart/components/MartAdminServices/AdminPages/footer/FooterForLabsAndDoctors.js'),
    modules: [],
    loading: () => Loading,
});
const GetTokenDetails = Loadable({
    loader: () => import(/* webpackChunkName: "GetTokenDetails" */ './client/MedplusMart/components/MartCatalog/StaticComponents/AdminScreen/GetTokenDetails.js'),
    modules: [],
    loading: () => Loading,
});
const GetCustomerDetails = Loadable({
    loader: () => import(/* webpackChunkName: "GetCustomerDetails" */ './client/MedplusMart/components/MartCatalog/StaticComponents/AdminScreen/GetCustomerDetails.js'),
    modules: [],
    loading: () => Loading,
});
const HolidaysEtaConfiguration = Loadable({
    loader: () => import(/* webpackChunkName: "HolidayEtaConfiguration" */ './client/MedplusMart/components/MartAdminServices/AdminPages/common/HolidaysEtaConfiguration.js'),
    modules: [],
    loading: () => Loading,
});
const MetaInformation = Loadable({
    loader: () => import(/* webpackChunkName: "MetaInformation" */ './client/MedplusMart/components/MartAdminServices/AdminPages/MetaConfiguration/MetaConfigurationHome'),
    modules: [],
    loading: () => Loading,
})

const AdminUserConfiguration = Loadable({
    loader: () => import(/* webpackChunkName: "AdminUserConfiguration" */ './client/MedplusMart/components/MartAdminServices/AdminPages/common/AdminUserConfiguration.js'),
    modules: [],
    loading: () => Loading,
})

const ReIndexCustomers = Loadable({
    loader: () => import(/* webpackChunkName: "ReIndexCustomers" */ './client/MedplusMart/components/MartCatalog/StaticComponents/AdminScreen/ReIndexCustomers.js'),
    modules: [],
    loading: () => Loading,
})

const OrderCancellationReasonConfiguration = Loadable({
    loader: () => import(/* webpackChunkName: "OrderCancellationReasonConfiguration" */ './client/MedplusMart/components/MartAdminServices/AdminPages/order/OrderCancellationReasonConfiguration.js'),
    modules: [],
    loading: () => Loading,
})

const MartVersionConfiguration = Loadable({
    loader: () => import(/* webpackChunkName: "MartVersionConfiguration" */ './client/MedplusMart/components/MartAdminServices/AdminPages/common/MartVersionConfiguration.js'),
    modules: [],
    loading: () => Loading,
})

const ConfigurePrescriptionAndConsultation = Loadable({
    loader: () => import(/* webpackChunkName: "ConfigurePrescriptionAndConsultation" */ './client/MedplusMart/components/MartAdminServices/AdminPages/redis/ConfigurePrescriptionAndConsultation.js'),
    modules: [],
    loading: () => Loading,
})

const PushCustomerInfo = Loadable({
    loader: () => import(/* webpackChunkName: "PushCustomerInfo" */ './client/MedplusMart/components/MartAdminServices/AdminPages/customers/pushCustomerInfoInQueue.js'),
    modules: [],
    loading: () => Loading,
})

const ProductStockInfo = Loadable({
    loader: () => import(/* webpackChunkName: "ProductStockInfo" */ './client/MedplusMart/components/MartAdminServices/AdminPages/common/ProductStockInfo.js'),
    modules: [],
    loading: () => Loading,
})

const DownloadHealthTrendsPdf = Loadable({
    loader: () => import(/* webpackChunkName: "DownloadHealthTrendsPdf" */ './client/commonComponents/DownloadHealthTrendsPdf.js'),
    modules: [],
    loading: () => Loading
})

const EnablePrescriptionUpload = Loadable({
    loader: () => import(/* webpackChunkName: "EnablePrescriptionUpload" */ './client/MedplusMart/components/MartAdminServices/AdminPages/redis/EnablePrescriptionUpload'),
    modules: [],
    loading: () => Loading,
})

const ConfigureUpSellProductsHeading = Loadable({
    loader: () => import(/* webpackChunkName: "ConfigureUpsellProducts" */ './client/MedplusMart/components/MartAdminServices/AdminPages/common/ConfigureUpsellProductsHeading'),
    modules: [],
    loading: () => Loading,
});

const MainNavigationForCatalog = Loadable({
    loader: () => import(/* webpackChunkName: "MainNavigationForCatalog" */ './client/MedplusMart/components/MartAdminServices/AdminPages/common/MainNavigationForCatalog'),
    modules: [],
    loading: () => Loading,
});

const KnowYourMedicine = Loadable({
    loader: () => import(/* webpackChunkName: "KnowYourMedicine" */ './client/KnowYourMedicine/components/KnowYourMedicine.js'),
    modules: [],
    loading: () => Loading,
})

const PaymentLink= Loadable({
    loader: () => import(/*webpackChunkName: "UnauthPayment"*/ './client/components/UnauthPayments/components/PaymentLink.js'),
    loading: ()=> Loading,
    modules: [],
});

const UaPaymentFailed= Loadable({
    loader: () => import(/*webpackChunkName: "UnauthPayment"*/ './client/components/UnauthPayments/components/UaPaymentFailed.js'),
    loading: ()=> Loading,
    modules: [],
});

const PaymentHomePage = Loadable({
    loader: () => import(/* webpackChunkName: "PaymentHome" */ './client/components/static/PaymentHome'),
    modules: [],
    loading: () => Loading,  
})

export default () => (
    <Switch>
        {/* MartCatalog Dynamic Routes Start */}
        <MartCatalogRoute exact path="/" component={MartHome} routePath={"martHome"} isDownload currentTab={"general"} breadCrumbNotRequired />
        <MartCatalogRoute exact path="/home" component={MartHome} routePath={"martHome"} currentTab={"general"} breadCrumbNotRequired />
        <MartCatalogRoute exact path="/pharmacy" component={MartHome} routePath={"martHome"} catalog={'Pharmacy'} currentTab={"general"} breadCrumbNotRequired />
        <MartCatalogRoute exact path="/product/:productNameId" component={ProductDetail} routePath={"product"} currentTab={"general"} />
        <MartCatalogRoute exact path="/product/:currentCategoryName_Id/:productNameId" component={ProductDetail} routePath={"product"} currentTab={"general"} />
        <MartCatalogRoute exact path="/product/:parentCategoryName_Id/:currentCategoryName_Id/:productNameId" component={ProductDetail} routePath={"product"} currentTab={"general"} />
        <MartCatalogRoute exact path="/product/:topCategoryName_Id/:parentCategoryName_Id/:currentCategoryName_Id/:productNameId" component={ProductDetail} routePath={"product"} currentTab={"general"} />
        <MartCatalogRoute exact path="/categories/:categoryNameId" component={MartCategory} routePath={"categoriesHome"} currentTab={"general"} />
        <MartCatalogRoute exact path="/pharmaHome" component={PharmacyHome} routePath={"pharmaHome"} currentTab={"pharmacy"} catalog={'Pharmacy'} />
        <MartCatalogRoute exact path="/manufacturer/:manufacturer" component={PharmaManufacturerProducts} routePath={"manufacturer"} currentTab={"pharmacy"} />
        <MartCatalogRoute exact path="/compositionProducts/:compositionName/:compositionId" component={PharmaManufacturerProducts} routePath={"compositionProducts"} currentTab={"pharmacy"} />
        <MartCatalogRoute exact path="/categories/:parentCategoryName_Id/:currentCategoryName_Id" component={MartCategoryDetail} routePath={"categoriesSecondLevel"} currentTab={"general"} />
        <MartCatalogRoute exact path="/categories/:topCategoryName_Id/:parentCategoryName_Id/:currentCategoryName_Id" component={MartCategoryDetail} routePath={"categoriesThirdLevel"} currentTab={"general"} />
        <MartCatalogRoute exact path="/requestProduct" component={RequestProduct} routePath={"requestProduct"} />
        <MartCatalogRoute exact path="/brand/:brandName" component={MartCategoryDetail} routePath={"brand"} currentTab={"general"} />
        <MartCatalogRoute exact path="/promo/:currentCategoryName_Id" component={MartCategoryDetail} routePath={"promo"} currentTab={"general"} />
        <MartCatalogRoute exact path="/drugsInfo/:pCat?/:pCatName?/:catName?" component={PharmacyCategoryDetail} routePath={"drugsInfo"} catalog={'Pharmacy'} currentTab={"pharmacy"} />
        <MartCatalogRoute exact path="/searchAll/:searchString" component={ProductSearchAllResult} routePath={"searchAll"} breadCrumbNotRequired />


        {/* Know Your Medicine Dynamic Routes start*/}
        <KnowYourMedicineRoute exact path="/kym" component={KnowYourMedicine} routePath={"kym"} hideHeader={true} breadCrumbNotRequired isKymHomeSearch/>
        <KnowYourMedicineRoute exact path = "/kym/composition/:compositionName/:compositionId" component={PharmaManufacturerProducts} routePath={"compositionProducts"} catalog={'kym'} isKym/>
        <KnowYourMedicineRoute exact path="/kym/product/:compositionNameId/:productNameId" component={KymProductDetail} routePath={"kymProduct"} catalog={'kym'} isKym />
        <KnowYourMedicineRoute exact path="/kym/product/:productNameId" component={KymProductDetail} routePath={"kymProduct"} catalog={'kym'} isKym />
        {/* Know Your Medicine Dynamic Routes end */}

        <MartCatalogRoute exact path="/customerFeedback" component={CustomerFeedBack} routePath={"customerFeedback"} />
        <MartCatalogRoute exact path="/offertermsandconditions" component={OfferTermsandConditions} />
        <MartCatalogRoute exact path="/walletTermsandConditions" component={WalletTermsandConditions} />
        <MartCatalogRoute exact path="/storelocator/:storeType?" component={StoreLocator} routePath={"storeLocator"} />
        <Route exact path="/storeLocatorForMedPlusIndia/:storeType?" component={StoreLocator} />

        <MartCatalogRoute exact path="/termsandconditions" component={TermsAndConditions} routePath={"termsandconditions"} />
        <MartCatalogRoute exact path="/returnsandcancellations" component={ReturnsAndCancellations} routePath={"returnsandcancellations"} />
        <MartCatalogRoute exact path="/privacypolicy" component={PrivacyPolicy} routePath={"privacypolicy"} />
        <MartCatalogRoute exact path="/aboutUs" component={AboutUs} routePath={"aboutUs"} />
        <MartCatalogRoute exact path="/contactUs" component={ContactUs} routePath={"contactUs"} />
        {/* <MartCatalogRoute exact path = "/pageNotFound" component={pageNotFound} /> */}
        <MartCatalogRoute exact path="/view-sitemap" component={siteMap} />
        <MartCatalogRoute exact path="/safeAndSecure" component={SafeAndSecure} routePath={"safeAndSecure"} />
        <MartCatalogRoute exact path="/promotions" component={Promotions} routePath={"promotions"} />
        <MartCatalogRoute exact path="/faq" component={MartFaq} routePath={"faq"} />
        <MartCatalogRoute exact path="/community-delivery" component={CommunityDelivary} routePath={"community-delivery"} />
        <MartCatalogRoute exact path="/healthy-life" component={BlogPostList} routePath={"healthy-life"} catalog={'blog'} currentTab={'blog'} />
        <MartCatalogRoute exact path="/healthy-life/info/:postId/:postName" component={BlogPostDetail} routePath={"blogPostDetail"} catalog={'blog'} currentTab={'blog'} />
        <MartCatalogRoute exact path="/healthy-life/:categoryId/:categoryName" component={BlogPostList} routePath={"blogPostCategories"} catalog={'blog'} currentTab={'blog'} />
        <MartCatalogRoute exact path="/healthy-life/info/:postId/:categoryName/:postName" component={BlogPostDetail} routePath={"blogPostCategoryDetail"} catalog={'blog'} currentTab={'blog'} />
        <MartCatalogRoute exact path="/alphabetWiseProducts/:pageRequest" component={AlphabetsWiseProducts} routePath={"alphabetWiseProducts"} catalog={'Pharmacy'} currentTab={"pharmacy"} />
        <MartCatalogRoute exact path="/brands" component={browseAllBrands} routePath={"browseAllBrands"} />
        <MartCatalogRoute exact path="/bulkOrder" component={BulkOrder} routePath={"bulkOrder"} />
        {/* MartCatalog Dynamic Routes End */}


        {/* Admin screen Routes starts */}
        <MartAdminRoute exact path="/martAdminServices" component={MartAdminHome} routePath={"martAdminServices"} catalog={'admin'} />
        <MartAdminRoute exact path="/uploadFile" routePath={"uploadFile"} component={UploadFile} catalog={'admin'} />
        <MartAdminRoute exact path="/configureMetaInformation" component={MetaInformation} routePath={"metaInformation"} catalog={'admin'} />
        <MartAdminRoute exact path="/unSubscribeFromRefill" routePath={"unSubscribeFromRefill"} component={UnSubscribeFromRefill} catalog={'admin'} />
        <MartAdminRoute exact path="/enablePrescriptionUpload" component={EnablePrescriptionUpload} routePath={"enablePrescriptionUpload"} catalog={'admin'} />
        <MartAdminRoute exact path="/configureUpsellProductsHeading" component={ConfigureUpSellProductsHeading} routePath={"configureUpsellProductsHeading"} catalog={'admin'} />
        <MartAdminRoute exact path="/configureBulkOrderProducts" component={ConfigureBulkOrderProducts} catalog={'admin'} />
        <MartAdminRoute exact path="/productDiscountDetail" component={ProductDiscountDetail} catalog={'admin'} />
        <MartAdminRoute exact path="/footerForLabsAndDoctors" component={FooterForLabsAndDoctors} catalog={'admin'} />
        <MartAdminRoute exact path="/getTokenDetails" component={GetTokenDetails} routePath={"getTokenDetails"} catalog={'admin'} />
        <MartAdminRoute exact path="/getCustomerDetails" component={GetCustomerDetails} routePath={"getCustomerDetails"} catalog={'admin'} />
        <MartAdminRoute exact path="/holidaysEtaConfiguration" component={HolidaysEtaConfiguration} catalog={'admin'} />
        <MartAdminRoute exact path="/adminUserConfiguration" component={AdminUserConfiguration} routePath={"adminUserConfiguration"} catalog={'admin'} />
        <MartAdminRoute exact path="/reindexCustomers" component={ReIndexCustomers} routePath={"reindexCustomers"} catalog={'admin'} />
		<MartAdminRoute exact path="/martVersions" component={MartVersionConfiguration} routePath={"martVersions"} catalog={'admin'} />
        <MartAdminRoute exact path="/configureEPrescription" component={ConfigurePrescriptionAndConsultation} routePath={"configurePrescriptionAndConsultation"} catalog={'admin'} />
        <MartAdminRoute exact path="/pushCustomerDetailsInQueue" component={PushCustomerInfo} routePath={"pushCustomerDetailsInQueue"} catalog={'admin'} />
        <MartAdminRoute exact path="/getStockDetails" component={ProductStockInfo} routePath={"getStockDetails"} catalog={'admin'} />
        <MartAdminRoute exact path="/martCustomerPromotion" component={MartCustomerPromotion} routePath={"MartCustomerPromotion"} catalog={'admin'} />
        <MartAdminRoute exact path="/configureRedisKey" component={ConfigureRedisKey} routePath={"ConfigureRedisKey"} catalog={'admin'} />
        <MartAdminRoute exact path="/localityInfo" component={LocalityInfo} routePath={"localityInfo"} catalog={'admin'} />
        <MartAdminRoute exact path="/emergencyMessageConfiguration" component={EmergencyMessageConfiguration} routePath={"emergencyMessageConfiguration"} catalog={'admin'} />
        <MartAdminRoute exact path="/generateMainNavigationForCatalog" component={MainNavigationForCatalog} routePath={"generateMainNavigationForCatalog"} catalog={'admin'} />
        <MartAdminRoute exact path="/enableReactCheckoutConfiguration" component={EnableReactCheckoutConfiguration} routePath={"enableReactCheckoutConfiguration"} catalog={'admin'} />
        <MartAdminRoute exact path="/enableNewOrderHistory" component={EnableNewOrderHistory} routePath={"enableNewOrderHistory"} catalog={'admin'} />
        <MartAdminRoute exact path="/paymentConfiguration" component={PaymentConfiguration} routePath={"paymentConfiguration"} catalog={'admin'} />
        <MartAdminRoute exact path="/configurePaymentPromotions" component={configurePaymentPromotions} routePath={"configurePaymentPromotions"} catalog={'admin'} />
        {/* Admin screen Routes ends */}



        <LabCatalogRoute exact path="/signInPopUp" component={SignInPopUp} routePath={"signInPopUp"} />
        <LabCatalogRoute exact path="/signin-otp-verify" component={SignInPopUp} routePath={SIGNIN_OTP_VERIFY} />
        <CheckoutRoute exact path="/shoppingCart" component={ShoppingCart} routePath={"shoppingCart"} />
        <CheckoutRoute exact path="/prescription" component={Prescription} routePath={"prescription"} />
        <CheckoutRoute exact path="/delivery" component={DeliveryDetail} routePath={"delivery"} />
        <CheckoutRoute exact path="/orderReview" component={orderReview} routePath={"orderReview"} />
        <CheckoutRoute exact path="/payment/:retryOrderId?" component={Payment} routePath={"payment"} />
        <CheckoutRoute exact path="/thankyou" component={thankyou} routePath={"thankyou"} />
        <CheckoutRoute exact path="/walletPayment/:retryOrderId?" component={WalletPayment} routePath={"walletPayment"} />
        <StaticRoute exact path="/refillReorder/:refillOrderId" component={RetryPaymentIntermediate} routePath={"refillReorder"} />
        <StaticRoute exact path="/cfpReorder/:cfpId" component={RetryPaymentIntermediate} routePath={"cfpReorder"} />
        <Route exact path="/walletRechargeResponse/:fromPage?/:status?/:message?" component={WalletRechargeResponse} />
        <Route exact path="/retryPaymentWalletRechargeResponse/:retryOrderId?/:fromPage?/:status?/:message?" component={WalletRechargeResponse} />

        <Route exact path="/processWalletResponse" component={WalletRechargeCheckoutResponse} />
        <Route exact path="/paymentHome" component={PaymentHomePage}/>

        {/* flexi, payback checkout start */}
        <CheckoutRoute exact path="/flexiCart" component={flexiCart} routePath={"flexiCart"} />
        <CheckoutRoute exact path="/flexiDelivery" component={DeliveryDetail} routePath={"flexiDelivery"} />
        <CheckoutRoute exact path="/flexiReview" component={flexiReview} routePath={"flexiReview"} />
        <CheckoutRoute exact path="/redeemThankyou" component={flexiThankYou} routePath={"thankyou"} />
        <CheckoutRoute exact path="/payback/cart" component={flexiCart} routePath={"payback/cart"} isPayback />
        <CheckoutRoute exact path="/payback/store" component={DeliveryDetail} routePath={"payback/store"} isPayback />
        <CheckoutRoute exact path="/payback/review" component={flexiReview} routePath={"payback/review"} isPayback />
        <CheckoutRoute exact path="/payback/payment/:cartId?" component={Payment} routePath={"payback/payment"} isPayback />
        <CheckoutRoute exact path="/payback/thankyou" component={flexiThankYou} routePath={"payback/thankyou"} isPayback />
        {/* <Route exact path="/gatewayResponse" component={LabPaymentResponse} routePath={"gatewayResponse"} isMart={true} /> */}
        <Route exact path='/gatewayResponse' routePath={"gatewayResponse"} component={(props) => {
            return <LabPaymentResponse {...props} isMart={true}/>
        }} />
        {/* flexi, payback checkout end*/}
        <MyAccountRoute exact path="/myProfile" component={MyProfile} routePath={"myAccount"} />
        <MyAccountRoute exact path="/prescriptionUpload" component={UploadPrescription} routePath={"prescriptionUpload"} />
        <MyAccountRoute exact path="/prescriptionOrderThankYou" component={PrescriptionOrderThankYou} routePath={"prescriptionOrderThankYou"} />
        <StaticRoute exact path="/newUserPrescriptionUpload" component={SignInForPrescriptionUPload} routePath={"newUserPrescriptionUpload"} />
        <MyAccountRoute exact path="/viewPrescription" component={healthRecords} routePath={"viewPrescription"} />
        <MyAccountRoute exact key="ordersHistory" path="/ordersHistory" component={OrderHistoryHeader} routePath={"purchaseHistory"} />
        <MyAccountRoute exact key="orderDetails" path="/orderDetails/:orderId" component={OrderHistoryDetails} routePath={"purchaseHistory"} />
        <MyAccountRoute exact key="invoiceDetails" path="/invoiceDetails/:invoiceId/:storeId" component={OrderHistoryDetails} routePath={"purchaseHistory"} />
        <MyAccountRoute exact key="reOrder" path="/reOrder/:reOrderId" component={OrderHistoryReOrder} routePath={"purchaseHistory"} />
        <MyAccountRoute exact key="labOrders" path="/labOrders" component={LabOrders} routePath={"labOrders"} />
        <MyAccountRoute exact key="labOrderDetail" path="/labOrderDetail/:orderId" component={LabOrderDetail} routePath={"labOrderDetail"} />
        <MyAccountRoute exact path="/healthTrends" component={healthRecords} routePath={"healthTrends"} />
        <MyAccountRoute exact path="/healthTrendsDashBoard" component={HealthTrendsDashBoard} routePath={"healthTrendsDashBoard"} />
        <MyAccountRoute exact path="/myRefills" component={refillHistory} routePath={"myRefills"} />
        <MyAccountRoute exact path="/refillInfo/:refillId" component={refillDeatils} routePath={"refillDetails"} />
        <MyAccountRoute exact path="/myWishlist" component={myWishlist} routePath={"myWishlist"} />
        <MyAccountRoute exact path="/myComplaints" component={myComplaints} routePath={"myComplaints"} />
        {/* <MyAccountRoute exact path="/myBookings" component={MyBookings} routePath={"myBookings"} /> */}
        {/* flexi, payback catalog start */}
        <MyAccountRoute exact path="/flexiRewards" component={FlexiRewards} routePath={"flexiRewards"} />
        <MyAccountRoute exact path="/payback/pointHistory" component={PaybackTransHistory} routePath={"paybackPointsHistory"} isPayback={true} />
        <MyAccountRoute exact path="/mdx/pointHistory" component={PaybackTransHistory} routePath={"mdxPointsHistory"} isMdxPoints={true} />
        <MartCatalogRoute exact path="/paybackspecialsale" routePath={"paybackPoints"} component={PayBackPoints} isPayback={true} />
        <MyAccountRoute exact path="/flexiRewardsFaq" component={FlexiRewards} routePath={"flexiRewards"} />
        <MyAccountRoute exact path="/redeemRewards" component={FlexiRewards} routePath={"redeemRewards"} />
        {/* flexi, payback catalog end */}
        <MyAccountRoute exact path="/myWallet" component={medplusWallet} routePath={"myWallet"} />
        <MyAccountRoute exact path="/myWalletTransactions" component={medplusWallet} routePath={"myWallet"} />
        <MyAccountRoute exact path="/myBookings" component={SubscriptionMyBookings} routePath={"myBookings"} />
        <MyAccountRoute exact path="/doctorconsultation/bookings" component={SubscriptionMyBookings} routePath={"doctorconsultationbookings"} />
        <Route exact path="/reactRedirection" component={PageRedirection} />
        <Route exact path="/chatbot" component={GenaralChatContainer} />

        {/* subscription routes starts */}
        <SubscriptionRoute exact path={`${MEDPLUS_ADVANTAGE_HOME}`} component={SubscriptionHome} routePath={`${MEDPLUS_ADVANTAGE_HOME}`} />
        <SubscriptionRoute exact path={`${MEDPLUS_ADVANTAGE_URL_PREFIX}/plans`} component={SubscriptionHome} routePath={`${/*  */MEDPLUS_ADVANTAGE_HOME}`} />
        <SubscriptionRoute exact path={`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscriptionPlan/:planDetailParams`} component={SubscriptionPlanDetail} routePath={"subscriptionPlanDetail"} />
        <SubscriptionRoute exact path={`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/login`} component={SubscriptionLogin} routePath={"subscriptionLogin"} />
        <SubscriptionRoute exact path={`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/loginOtp`} component={SubscriptionLoginOtp} routePath={"subscriptionLoginOtp"} />
        <SubscriptionRoute exact path={`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/emailOtpLogin`} component={SubscriptionLogin} routePath={"subscriptionCorporateLogin"} isCorporateEmail isSecure isSubscription />
        <SubscriptionRoute exact path={`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/emailOtpVerify`} component={SubscriptionLoginOtp} routePath={"subscriptionCorporateLoginOtp"} isCorporateEmail isSecure isSubscription />
        <SubscriptionRoute exact path={`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/loginIntermediate`} component={SubscriptionIntermediate} routePath={"SubscriptionIntermediate"} />

        <SubscriptionRoute exact path={`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscriptionMembers`} component={SubscriptionMembers} routePath={'MemberRegistration'} isSecure isSubscription />
        <SubscriptionRoute exact path={`${MEDPLUS_ADVANTAGE_URL_PREFIX}/companyList`} component={SubscriptionCompanySearch} routePath={"companyList"} isSecure isSubscription />
        <SubscriptionRoute exact path={`${MEDPLUS_ADVANTAGE_URL_PREFIX}/corporateMemberPlans`} component={SubscriptionCorporatePlan} routePath={"corporateMemberPlans"} isSecure />
        <SubscriptionRoute exact path={`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/thankyou`} component={SubscriptionThankyou} routePath={"subscriptionThankyou"} />
        <SubscriptionRoute exact path={`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/addNewMembers`} component={AddMembersToSubscription} routePath={'subscriptionMembers'} />
        <SubscriptionRoute exact path={`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/payment/:orderId?`} component={SubscriptionPayment} routePath={'subscriptionPayment'} isSecure isSubscription />
        <Route exact path={`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscriptionRetryPayment/:orderId`} component={RetryPaymentIntermediate} />
        <Route exact path='/subscriptionPaymentResponse' component={(props) => {
            return <SubscriptionGatewayResponse history={props.history} location={props.location} />
        }} />

        {/* subscription routes ends */}


        {/* static pages routes starts */}
        <Route exact path="/pageNotFound" component={pageNotFound} />

        {/* static pages routes ends */}


        <Route exact path="/consultationresponse" component={(props) => {
            return <VideoResponse {...props} />
        }} />
        <Route exact path="/consultationrequest/:orderId?" component={(props) => {
            return <ConsultationInitiation {...props} />
        }} />

        <Route exact path="/initiateconsultation/:orderId?" component={RetryPaymentIntermediate} />


        {/* unauthPaymentRotes starts here */}
        <UnauthRoute exact path="/paymentLink/:referenceId" component={PaymentLink}/>
        <UnauthRoute exact path={`${DIAGNOSTICS_URL_PREFIX}/lab-ua-thank-you`} component={LabThankYou} routePath={"lab-ua-thank-you"} />
        <UnauthRoute exact path={`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/uathankyou`} component={SubscriptionThankyou} routePath={"subscriptionThankyou"} />
        <UnauthRoute exact path="/ua-thankyou" component={thankyou} routePath={"uaThankyou"} />
        <UnauthRoute exact path="/doctorconsultation/ua-thankyou" component={DoctorThankYou} routePath={"DoctorConsultationUaThankYou"} />
        <UnauthRoute exact path="/ua-payment-failed" component={UaPaymentFailed} routePath={"uaPaymentFailed"} />
        {/* unauthPaymentRotes ends here */}



        {/* lab home page routes ends */}
        {/* lab subscript starts */}
        <LabHomePageRoute path="/labSubscription" component={LabSubscriptionHomePage} />
        <LabHomePageRoute path="/subscriptionCompanySearch" component={LabSubscriptionCompanySearch} />
        <LabHomePageRoute path="/subscriptionCompanyPlan" component={LabSubscriptionCorporatePlan} />
        <LabHomePageRoute path="/subscriptionPlanDetails" component={LabSubscriptionPlanDetail} />
        <LabHomePageRoute path="/LabsubscriptionUpgrade" component={SubscriptionUpgrade} />
        <LabHomePageRoute path="/labsubscriptionLogin" showCorporate={false} component={LabSubscriptionLogin} />
        <LabHomePageRoute path="/labsubscriptionLoginOtp" details={{ 'number': '+91 9701817263', 'type': 'number' }} component={LabSubscriptionLoginOtp} />
        <LabHomePageRoute path="/labcorporatelogin" showCorporate={true} component={LabSubscriptionLogin} />
        <LabHomePageRoute path="/LabSubscriptionRegister" component={LabSubscriptionRegister} />
        <LabHomePageRoute path="/LabSubscriptionCorporateRegister" component={LabSubscriptionCorporateRegister} />
        <LabHomePageRoute exact path="/LabBookings" component={LabBookings} routePath={"LabBookings"} />

        {/* <MyAccountRoute exact path="/myBookings" component={MyBookings} routePath={"myBookings"} /> */}

        {/* Dynamic Lab Home pages routes Started */}
        <LabCatalogRoute exact path={`/${DIAGNOSTICS_HOME}`} routePath={"LabHome"} component={LabHome} />
        <LabCatalogRoute exact path={`${DIAGNOSTICS_URL_PREFIX}/view-all-offers/:page/:marketingSection/:test?`} routePath={"viewAllOffers"} component={ViewAllTests} />
        <LabCatalogRoute exact path={`${DIAGNOSTICS_URL_PREFIX}/testdetails/:testNameId`} routePath={"testDetails"} component={testDetails} headerText={"Test Details"} />
        <LabCatalogRoute exact path={`${DIAGNOSTICS_URL_PREFIX}/testdetails/:categoryNameId/:testNameId`} routePath={"testNcategoryDetails"} component={testDetails} headerText={"Test Details"} />
        <LabCatalogRoute exact path={`${DIAGNOSTICS_URL_PREFIX}/sub-category/:categoryNameId`} routePath={"subCategory"} component={LabCategory} />
        <LabCatalogRoute exact path={`${DIAGNOSTICS_URL_PREFIX}/department/:categoryNameId`} routePath={"subCategory"} component={LabCategory} />
        <LabCatalogRoute exact path={`${DIAGNOSTICS_URL_PREFIX}/category/view-all-tests/:categoryNameId`} routePath={"viewAllTests"} component={ViewAllTests} />
        <LabCatalogRoute exact path={`${DIAGNOSTICS_URL_PREFIX}/department/viewAllTests/:categoryName/:categoryId`} routePath={"viewAllTests"} component={ViewAllTests} />
        <LabCatalogRoute exact path={`${DIAGNOSTICS_URL_PREFIX}/search-all-tests/:searchText`} routePath={"searchAllTests"} component={ViewAllTests} />
        <LabCatalogRoute exact path={`${DIAGNOSTICS_URL_PREFIX}/tnc`} routePath={"diagnosticsTnc"} component={OfferTermsandConditions} />
        {/* Dynamic Lab Home pages routes end */}

        {/* Lab checkout routes starts */}
        <LabCheckoutRoute exact path={`${DIAGNOSTICS_URL_PREFIX}/lab-shopping-cart`} component={LabShoppingCart} routePath={"lab-shopping-cart"} />
        <LabCheckoutRoute exact path={`${DIAGNOSTICS_URL_PREFIX}/sample-collection`} component={SampleCollection} routePath={"sample-collection"} />
        <LabCheckoutRoute exact path={`${DIAGNOSTICS_URL_PREFIX}/schedule-slot`} component={SlotSelection} routePath={"schedule-slot"} />
        <LabCheckoutRoute exact path={`${DIAGNOSTICS_URL_PREFIX}/lab-review-cart`} component={LabReviewCart} routePath={"lab-review-cart"} />
        <LabCheckoutRoute exact path={`${DIAGNOSTICS_URL_PREFIX}/lab-payment/:orderId?`} component={LabPayment} routePath={"lab-payment"} />
        <Route exact path="/labPaymentResponse" component={LabPaymentResponse} routePath={"labPaymentResponse"} />
        <Route exact path={`${DIAGNOSTICS_URL_PREFIX}/labOrderRetryPayment/:orderId`} component={RetryPaymentIntermediate} />
        <LabCheckoutRoute exact path={`${DIAGNOSTICS_URL_PREFIX}/lab-thank-you`} component={LabThankYou} routePath={"lab-thank-you"} />
        {/* <LabCheckoutRoute exact path="/reattemptPayment/:retryOrderId" component={Payment} routePath={"retryPayment"}/> */}
        {/* Lab checkout routes end */}

        {/* doctor static routes start */}
        <LabHomePageRoute path="/doctorHome" component={DoctorConsultationHomeOld} />
        <LabHomePageRoute path="/doctorCategory" component={DoctorCategeryPage} />
        <LabHomePageRoute path="/doctorDetail" component={DoctorDetailPage} />
        <LabHomePageRoute path="/doctorSpecialization" component={DoctorSpecializationPage} />
        <LabHomePageRoute path="/doctorCheckout" component={DoctorCheckout} />
        <LabHomePageRoute path="/doctorSlotSelection" component={DoctorSlotSelection} />
        <LabHomePageRoute path="/doctorsOnline" component={OnlineDoctors} />
        <LabHomePageRoute path="/symptomsViewAllPage" component={SymptomsViewAllPage} />
        <LabHomePageRoute path="/doctorPayments" component={DoctorPayments} />
        <LabHomePageRoute path="/doctorThankYouPage" component={DoctorThankYouPage} />
        {/* doctor static routes end */}

        {/* advertisement popover route start */}
        <Route exact path="/advertisement" component={Advertisement} />
        {/* advertisement popover route end */}

        {/* Doctor Consultation Dynamic routes start */}
        <DoctorConsultationRoute exact path="/doctorconsultation" component={DoctorConsultationHome} routePath={"doctorconsultation"} />
        <DoctorConsultationRoute exact path="/doctorconsultation/doctor/:doctorId/:visitType?" component={DoctorInfo} routePath={"doctor-detail"} />
        <DoctorConsultationRoute exact path="/doctorconsultation/categorynamedoctor/:doctorId/:searchString/:visitType?" component={DoctorInfo} routePath={"doctor-detail"} />
        <DoctorConsultationRoute exact path="/doctorconsultation/categorydoctor/:doctorId/:searchString/:categoryType/:visitType?" component={DoctorInfo} routePath={"doctor-detail"} />
        <DoctorConsultationRoute exact path="/doctorconsultation/doctorfromviewall/:doctorId/:isFromViewAll/:visitType?" component={DoctorInfo} routePath={"doctor-detail"} />
        <DoctorConsultationRoute exact path="/doctorconsultation/doctors/online_consultation" isOnline={true} routePath={"online-consultation"} component={OnlineOrWalkinDoctors} />
        <DoctorConsultationRoute exact path="/doctorconsultation/doctors/walk_in" routePath={"walkin-consultation"} component={OnlineOrWalkinDoctors} />
        <LabCheckoutRoute exact path="/doctorconsultation/schedule-consultation" component={DoctorConsultationCart} routePath={"schedule-consultation"} isDoctorPage={true} />
        <LabCheckoutRoute exact path="/doctorconsultation/schedule-slot" component={ClinicSlotSelection} routePath={"schedule-slot"} isDoctorPage={true} />
        <LabCheckoutRoute exact path="/doctorconsultation/payments/:orderId?" component={DoctorConsultationPayment} routePath={"consultation-payment"} isDoctorPage={true} />
        <Route exact path="/doctorConsultationPaymentResponse" component={DoctorPaymentResponse} routePath={"doctorPaymentResponse"} />
        <Route exact path="/retryDoctorConsultationPayment/:orderId" component={RetryPaymentIntermediate} />
        <DoctorConsultationRoute exact path="/doctorconsultation/doctors/viewall/:visitType" routePath={"view-all-doctors"} component={DoctorCategoryInfo} />
        <DoctorConsultationRoute exact path="/doctorconsultation/doctors/:searchString/:visitType?" routePath={"doctor-category-info"} component={DoctorCategoryInfo} />
        <DoctorConsultationRoute exact path="/doctorconsultation/categorydoctors/:searchString/:categoryType/:visitType?" routePath={"doctor-category-info"} component={DoctorCategoryInfo} />
        <DoctorConsultationRoute exact path="/doctorconsultation/allCategories/:categoryType/:consultationType?" routePath={"doctor-category-viewall"} component={DoctorCategoryViewAll} />
        {/* Doctor Consultation Dynamic routes end */}

        {/* Doctor CheckOut Routes starts */}
        <LabCheckoutRoute exact path="/doctorconsultation/thankyou" component={DoctorThankYou} routePath={"DoctorConsultationThankYou"} isDoctorPage={true} />
        {/* {Doctor CheckOut Routes End} */}
        <MartPromoRoute exact path="/whatsapp" component={WhatsApp} routePath={"WhatsApp"} />
        <MartPromoRoute exact path="/cardiac-ct" component={Cardiac} routePath={"cardiac"} />
        <MartPromoRoute exact path="/mribrainplain" component={MriBrainPlan} routePath={"mribrainplan"} />
        <MartPromoRoute exact path="/mricervicalspine" component={MriCervicalSpine} routePath={"mricervicalspine"} />
        <MartPromoRoute exact path="/mrilumbarspine" component={MriLumbarSpine} routePath={"mrilumbarspine"} />
        <MartPromoRoute exact path="/mammography-both-breasts" component={Mammography} routePath={"mammography"} />
        <MartPromoRoute exact path="/ct-brainPlain" component={CtBrainPlain} routePath={"ctbrainplain"} />
        <MartPromoRoute exact path="/ct-hrctForChest" component={CtHrct} routePath={"ct-hrct"} />
        <MartPromoRoute exact path="/ct-wholeAbdomen" component={CtWholeAbdomen} routePath={"ct-wholeabdomen"} />
        <MartPromoRoute exact path="/bmd-regions" component={BmdRegions} routePath={"bmd-regions"} />
        <MartPromoRoute exact path="/mp/:id" component={MarketingPromo} routepath={"marketing-promo"} />
        <Route exact path="/plr/:id" routePath={"plr"} component={PrintReportPage} hideHeader={true} />

        {/* React Page routes */}
        <LabCatalogRoute exact path="/PharmaHome" component={PharmaHome} />
        <LabCatalogRoute exact path="/PharmaCategory" component={PharmaCategory} />
        <LabCatalogRoute exact path="/homePage" component={HomePage} />
        <LabCatalogRoute exact path="/category" component={CategoryPage} />
        <LabCatalogRoute exact path="/productDetailPage" component={ProductDetailPage} />
        <LabCatalogRoute exact path="/filter" component={FilterMain} />
        <LabCatalogRoute exact path="/customerFeedback" component={CustomFeedbackForm} />
        <LabCatalogRoute exact path="/communityDelivary" component={CommunityDelivary} />
        <LabCatalogRoute exact path="/storeLocatorStaticPage" component={StoreLocatarStaticPage} />
        <LabCatalogRoute exact path="/generalProduct" component={GeneralProductPage} />
        <LabCatalogRoute exact path="/topsearch" component={TopSearch} />
        <LabCatalogRoute exact path="/alphabetwiseProducts" component={AlphabetWiseProducts} />
        <LabCatalogRoute exact path="/promotionsStaticPage" component={PromotionsStaticPage} />
        <LabCatalogRoute exact path="/searchAllStaticPage" component={SearchAllStaticPage} />

        <Route exact path="/retryPayment/:orderId" component={RetryPaymentIntermediate} />
        <Route exact path="/payOnline/:orderId" component={RetryPaymentIntermediate} />
        <Route exact path="/downloadHealthTrendsPdf/:patientHash" component={DownloadHealthTrendsPdf} />

        <Route exact path="/livetracking" component={LiveTracking} />

    </Switch>
);
