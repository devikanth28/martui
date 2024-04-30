import TagManager from 'react-gtm-module';
import { VISIT_TYPE_WALK_IN } from '../DoctorConsultation/constants/DoctorConsultationConstants';
import Validate from '../helpers/Validate';
import { isClientSide } from '../lib/react-drager/helpers';
import { SEP, WEB } from './AnalyticsConstant';

const GTM_ID = process.env.GTM_ID;
const ECOMMERCE_IMPRESSION_EVENT = 'EComm Product Impression';
const ECOMMERCE_CLICK_EVENT = "EComm Product Click";
const ECOMMERCE_MODIFY_CART = "Modify Cart";
const ECOMMERCE_CHECKOUT_EVENT = "EComm Checkout Steps";
const ECOMMERCE_PURCHASE_EVENT = 'Ecommerce Transaction';
const SUBSCRIPTIONPLAN ='Subscription Plan Selected'
const SUBSCRIPTIONBUYNOW = 'Subscription Buy Now'
const SUBSCRIPTIONPAYNOW = 'Subscription Pay Now'
const DOCTOR_VISIT_TYPE = 'Doctor Visit Type'
const DOCTOR_CATALOG = 'Doctor Catalog'
const DIAGONOSTICS_CATALOG = 'Diagnostic Catalog'
const DOCTOR_SEARCH = 'Doctor Search'
const Diagnostic_SEARCH = 'Diagnostic Search'
const Diagnostic_member = 'Diagnostic Member'
const DIAGNOSTIC_VIEWALL = 'Diagnostic ViewAll'
const DIAGNOSTICS_PRESCRIPTION_EVENT = 'Diagnostic Prescription'
const DIAGNOSTICS_ADD_TO_CART = 'Diagnostic AddToCart'
const SUBSCRIPTIONCATEGORY = 'Subscription_web'
const DOCTOR_BOOK_APPOINTMENT_EVENT ='Doctor Book Appointment'
const DOCTORSCATEGORY = 'Doctors_web'
const DIAGNOSTICSCATEGORY = 'Diagnostics_web'

const CAMPAIGNMODEL = 'CampaignModal_web'
const CAMPAIGNMODAL_CALLME = 'CampaignModal CallMe'
const CAMPAIGNMODAL_KNOWMORE = 'CampaignModal KnowMore'
const CAMPAIGNMODAL_CHANGENUMBER = 'CampaignModal ChangeNumber'
const CAMPAIGNMODAL_VERIFYOTP = 'CampaignModal VerifyOTP'
const CAMPAIGNMODAL_SUBMIT = 'CampaignModal UserDetailsSubmit'
const CAMPAIGNMODAL_BACk = 'CampaignModal UserDetailsBack'
const CAMPAIGNMODAL_RESENDOTP = 'CampaignModal ResendOTP'

//Payback Event Details
const MEDPLUSPAYBACK = 'MedPlusPayback_web'
const PAYBACKADDTOCART = 'Payback AddToCart'
const PAYBACKVIEWSHOPPINGCART ='Payback ViewShoppingCart'
const PAYBACKREMOVEPRODUCT = 'Payback RemoveProduct'
const PAYBACKCARTBACKEVENT = 'Payback CartBackButton'
const PAYBACKCARTPROCEEDEVENT = 'Payback CartProceedEvent'
const PAYBACKDELIVERYPROCEEDEVENT = 'Payback DeliveryProceedEvent'
const PAYBACKDELIVERYBACKEVENT = 'Payback DeliveryBackEvent'
const PAYBACKEDITORUPDATEEVENT ='Payback EditorUpdateEvent'
const PAYBACKREVIEWBACKEVENT  = 'Payback ReviewBackEvent'
const PAYBACKREVIEWPROCEEDEVENT = 'Payback ReviewProceedEvent'
const PAYBACKPAYMENTSBACKEVENT = 'Payback PaymentBackEvent'
const PAYBACKPAYMENTADDMORE = 'Payback PaymentAddMoreEvent'
const PAYBACKSELECTEDPAYMENT = 'Payback SelectedPaymentEvent'
const PAYBACKCONTINUESHOPPING = 'Payback ContinueShoppingEvent'
const PAYBACKPOINTSHISTORY = 'Payback PointsHistoryEvent'

//login and Register events 

const SendOTP = 'Login SendOTP'
const ResendOTPValidation = 'Login ResendOTP'
const ChangeNumberLogin = 'Login ChangeNumber'
const VerifyOTPLogin = 'Login VerifyOTP'
const RegistrationLoginEvent = 'New Registered User'
const LoginCategory = 'Login and Register Category_web'
const SkipRegister = 'Skip Registration'
// WhatsApp  Promo

const WhatsAppPromo='WhatsApp Promo';
const WhatsAppCategory='WhatsApp Promo_web';
const CardiacCTTest="CallForBookSlot";
const CardiacCTTestCategory="CardicCTTestCategory_web";
const DiagnosticCenters="DiagnosticCenters";
const DiagnosticCenter="DiagnosticCenter_web";
const CardiacToDiagnostic="CardiacCtToDiagnostic";
const CardiacCategory="CardiacCategory_web"

//Catalog Pages 

const TopBanners = 'HomePage Top Banners'
const SideLeftBanners = 'HomePage Side Left Banners'
const UploadPrescription = 'UploadPrescription'
const NeedHelp = 'NeedHelpInOrdering'
const ShopByCategorySection = 'ShopByCategorySection'
const PromotionTopBanners = 'Promotion Top Banners'
const MyAccountCards = 'MyAccountCards'
const AddProductsToCart = 'AddProductsToCart'
const PharmacySeperators = 'PharmacySeperators'
const ShopByGeneralCategory = 'ShopByGeneralCategory'
const PopularBrands = 'PopularBrands'
const ShareProduct = 'ShareProduct'
const GetNotifiedProduct = 'GetNotifiedProduct'
const StoreInfoNearMe = 'StoreInfoNearMe'
const CatalogCategory = 'CatalogCategory_web'



// Ecomm Ga4 Events
const GA4_ECOMMERCE_VIEW_ITEMS = 'view_item_list';
const GA4_ECOMMERCE_SELECT_ITEM = "select_item";
const GA4_ECOMMERCE_ADD_CART = "add_to_cart";
const GA4_ECOMMERCE_REMOVE_FROM_CART ="remove_from_cart";
const GA4_ECOMMERCE_PURCHASE_EVENT = 'purchase';
const GA4_ECOMMERCE_VIEW_ITEM='view_item';
const GA4_ECOMMERCE_BEGIN_CHECKOUT='begin_checkout';
const GA4_ECOMMERCE_ADD_SHIPMENT_INFO='add_shipping_info';
const GA4_ECOMMERCE_ADD_PAYMENT_INFO='add_payment_info';



export const initialize = (url) => {
	if(isClientSide()) {		
		try {
			Promise.resolve(TagManager.initialize({
				gtmId: GTM_ID
			})).then(sendPageView(url));
		} catch (err) {
			console.log(err);
		}
	}
    
}

export const sendPageView = (url) => {
    try{
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        let pageViewDataLayer = {
            "event" : "Page View",
            "Custom Page Path" : url
        }
        TagManager.dataLayer({
            dataLayer: {
                ...pageViewDataLayer
            }
        });
    }catch(err){
        
    }
}

export const checkoutStepsToAnalytics = (products, stepNumber) => {
    try{
        let productList = products.map(each => {
            return {                                            // Provide product details in an productFieldObject.
                    'item_id': each.productId,                       // Product ID (string).
                    'item_name': each.productName,                   // Product name (string).
                    'quantity': each.packSizeQty                
                };
            });
        let checkOut = {}
        let eventName;
        if(stepNumber === 1){
            eventName=GA4_ECOMMERCE_BEGIN_CHECKOUT;
        }else if(stepNumber === 2){
            checkOut['shipping_tier']= "Ground";
            eventName=GA4_ECOMMERCE_ADD_SHIPMENT_INFO;
        }else {
           return;
        }
        
        if(products.length){
            checkOut["items"] = [...productList]
        }
        TagManager.dataLayer({
            dataLayer: {
                "event" : eventName,
                "ecommerce" : {
                   ...checkOut
                }
            }
        });
    }catch(err){
        console.log(err);
    }
}

export const modifyCart = (product, qtyForAnalytics, type, place='') => {
    place = getPlace(place)
    if(!product)
        return
    try{
        let productId = product.productId;
        let productObj = {
            'item_id': productId,                    // Product ID (string).
            'item_name': product.productName,                // Product name (string).
            'quantity': qtyForAnalytics
        }
        if(product.brand){
            productObj["item_brand"] = product.brand;
        }
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        let ecommerceObj = {
            'items': [productObj]
        }
        TagManager.dataLayer({
            dataLayer :  {
                'event': type === "add" ? GA4_ECOMMERCE_ADD_CART : GA4_ECOMMERCE_REMOVE_FROM_CART,
                'ecommerce': ecommerceObj
            }
        })
    }catch(err){
        console.log(err); 
    }
}

export const SubscriptionPlan = (planDetails,planStyle) =>{
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer : {
                'event': SUBSCRIPTIONPLAN,
                'subscriptionPlanName' : planDetails.name,
                'subscriptionPlanValue' :planDetails.name,
                'subscriptionPlanType':planStyle,
                'Subscription Action':'Plan Click',
                'Subscription Category':SUBSCRIPTIONCATEGORY
            }
        })
    } catch(err) {
        console.log(err)
    }
}
export const SubscriptionBuyNow = (planDetails) =>{
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer : {
                'event': SUBSCRIPTIONBUYNOW,
                'subscriptionPlanValue' : planDetails.name,
                'subscriptionPlanName' : planDetails.displayName,
                'Subscription Action':'Plan Select',
                'Subscription Category':SUBSCRIPTIONCATEGORY,
                'subscriptionPlanType':planDetails.type.type,
            }
        })
    } catch(err) {
        console.log(err)
    }
}

export const subscriptionPayNowEvent = (payment) =>{
    try {
    
        let paymentMode;
        switch (payment) {
            case 'CC': paymentMode = 'Credit Card'; break;
            case 'DC': paymentMode = 'Debit Card'; break;
            case 'NB': paymentMode = 'Net Banking'; break;
            case 'PPI': paymentMode = 'Paytm'; break;
            default: paymentMode = paymentmode;
        }

    window['google_tag_manager'][GTM_ID].dataLayer.reset();
            TagManager.dataLayer({
                dataLayer:{
                    'event' : SUBSCRIPTIONPAYNOW,
                    'Subscription Category' : SUBSCRIPTIONCATEGORY,
                    'Subscription Action' : 'Purchase Plan',
                    'subscriptionPaymentValue' : paymentMode,
                    'subscriptionPaymentLabel' : paymentMode,
                }
            })
        }catch(err) {
            console.log(err)
        }
}

export const sendDoctorsVisitType = (visitType) =>{
    try{
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event' : DOCTOR_VISIT_TYPE,
                'Doctor Category' : DOCTORSCATEGORY,
                'Doctor Action' : 'Doctor Visit Click',
                'doctorVisitTypeLabel' : visitType,
                'doctorVisitTypeValue' : visitType
            }
        })    
    }catch(err){
        console.log(err)
    }
}

export const DoctorsCatalog = (SectionTitle,CategoryName,CategoryID) =>{
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event': DOCTOR_CATALOG,
                'Doctor Category': DOCTORSCATEGORY,
                'Doctor Action': 'Doctors Catalog Click',
                'doctorCatalogLabel' : SectionTitle,
                'doctorCatalogValue':CategoryName,
                'DoctorCatalogID':CategoryID,
            }
        })
    } catch(err){
        console.log(err)
    }
}

export const sendDoctorsBookAppointment = (doctorName, consultationType) =>{
    try{
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event' : DOCTOR_BOOK_APPOINTMENT_EVENT,
                'Doctor Category' : DOCTORSCATEGORY,
                'Doctor Action' : 'Book Doctor Appointment',
                'doctorAppointmentValue' : doctorName,
                'doctorAppointmentLabel' : doctorName,
                'doctorConsultationType' : consultationType ==VISIT_TYPE_WALK_IN ? 'Offline' : 'Online',
            }
        })    
    }catch(err){
        console.log(err)
    }
}

export const sendDoctorsSearchData = (searchText, selectedSearch) =>{
    try{
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event' : DOCTOR_SEARCH,
                'Doctor Category' : DOCTORSCATEGORY,
                'Doctor Action' : 'Search Doctors',
                'doctorSearchLabel' : searchText,
                'doctorSearchValue' : selectedSearch,
            }
        })    
    }catch(err){
        console.log(err)
    }
}
export const sendDiagnosticsSearchData = (searchText, selectedSearch) =>{
    try{
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event' : Diagnostic_SEARCH,
                'Diagnostic Category' : DIAGNOSTICSCATEGORY,
                'Diagnostic Action' : 'Search Diagnostics',
                'diagnosticSearchLabel' : searchText,
                'diagnosticSearchValue' : selectedSearch,
            }
        })    
    }catch(err){
        console.log(err)
    }
}

export const sendPrescriptionEvent = () =>{
    try{
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event' : DIAGNOSTICS_PRESCRIPTION_EVENT,
                'Diagnostic Category' : DIAGNOSTICSCATEGORY,
                'Diagnostic Action' : 'Upload Prescription',
            }
        })    
    }catch(err){
        console.log(err)
    }
}

export const DiagnosticsCatalog =(sectionTitle,TestName) =>{
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event':DIAGONOSTICS_CATALOG,
                'Diagnostic Category':DIAGNOSTICSCATEGORY,
                'Diagnostic Action':'Diagnostics Catalog Click',
                'diagnosticCatalogLabel' :sectionTitle,
                'diagnosticCatalogValue':TestName,
            }
        })
    }catch(err){
        console.log(err)
    }
}

export const sendMemberEvent = (testname) => {
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer: {
                'event': Diagnostic_member,
                'Diagnostic Category': DIAGNOSTICSCATEGORY,
                'Diagnostic Action' : 'Member Price Clicked',
                'diagnosticTestNameLabel':testname,
                'diagnosticTestNameValue':testname
            }
        })

    } catch (err) {
        console.log(err)
    }
}

export const sendAddToCartEvent = (testName) =>{
    try{
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event' : DIAGNOSTICS_ADD_TO_CART,
                'Diagnostic Category' : DIAGNOSTICSCATEGORY,
                'Diagnostic Action' : 'Add to Cart',
                'diagnosticAddTestToCartLabel' : testName,
                'diagnosticAddTestToCartValue' : testName,
            }
        })    
    }catch(err){
        console.log(err)
    }   
}

export const SendViewAllEvent = (title) =>{
    try{
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event' : DIAGNOSTIC_VIEWALL,
                'Diagnostic Category' : DIAGNOSTICSCATEGORY,
                'Diagnostic Action' : 'View All',
                'diagnosticViewAllLabel' : title,
                'diagnosticViewAllValue' : title,
            }
        })    
    }catch(err){
        console.log(err)
    }
}



const getPlace = (place) => {
    try {
        place = place ? (WEB+SEP) + place.toUpperCase() : ''
    } catch (error) {
        
    }
    return place
}

export const measureTransaction = (productList , orderId, amount) => {
     try{
         if(!productList || !orderId || !amount){
             return;
         }
         let transactionItemList = productList.map((product)=>{
             return {
                 'item_id': product.productId,
                 'item_name':product.productName,
                 'price': product.mrp,
                 'quantity': product.packSizeQty
             }
         });
         window['google_tag_manager'][GTM_ID].dataLayer.reset();
         TagManager.dataLayer({
            dataLayer : {
                'event':GA4_ECOMMERCE_PURCHASE_EVENT,
                'ecommerce': {
                    'transaction_id' : orderId,
                    'value' : amount,
                    'currency' : "INR",
                    'items' : transactionItemList
                }
            }
        });
     }catch(err){
         console.log(err);
     }
 }

 export const sendRetryPaymentEvent = (isSuccessEvt) => {
    try{
        if(window.google_tag_manager && window.google_tag_manager[GTM_ID]){
            window.google_tag_manager[GTM_ID].dataLayer.reset();
        }
        dataLayer.push({
            "event" : "RetryPayment",
            "Retry Action" : isSuccessEvt ? "Retry Payment Success" : "Show Retry Payment Review",
            "Retry Label" : isSuccessEvt ? "Retry Payment Success" : "Retry Payment Initiation"
        });
    } catch(err) {
        console.log(err)
    }
}

//Campaign Model Popover Events Start

export const SendCallMe  =() => {
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event' : CAMPAIGNMODAL_CALLME,
                'CampaignModal Category' : CAMPAIGNMODEL,
                'Campaign Action' : 'Call Me',
                'campaignModalCallMeLabel' : 'Call Me'
            }
        })  
    }catch(err) {   
        console.log(err)
    }
}

export const KnowMoreEvent = () => {
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event': CAMPAIGNMODAL_KNOWMORE,
                'CampaignModal Category':CAMPAIGNMODEL,
                'Campaign Action': 'Know More',
                'campaignModalKnowMoreLabel' : 'Know More'
            }
        })
    } 
    catch(err) {
        console.log(err)
    }
}

export const FormDetailsSubmit = () => {
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event': CAMPAIGNMODAL_SUBMIT,
                'CampaignModal Category' : CAMPAIGNMODEL,
                'Campaign Action': 'UserDetails Submitted',
                'campaignUserDetailsSubmitLabel':'UserDetails Submitted'
            }
        })
    } catch(err) {
        console.log(err)
    }
}

export const FormDetailsBack = () =>{
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event': CAMPAIGNMODAL_BACk,
                'CampaignModal Category' : CAMPAIGNMODEL,
                'Campaign Action' : 'UserDetails Back',
                'campaignUserDetailsBackLabel' : 'UserDetails not Submitted'
            }
        })
    }catch(err) {
        console.log(err)
    }
}

export const ChangeNumber = (fromPage) =>{
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        if(fromPage == 'Campaign Modal') {
            TagManager.dataLayer({
                dataLayer:{
                    'event':CAMPAIGNMODAL_CHANGENUMBER,
                    'CampaignModal Category': CAMPAIGNMODEL,
                    'Campaign Action' : 'Change Number',
                    'campaignChangeNumberLabel' : 'Change Number',
                }
            })
        } else if(fromPage == 'SignIn') {
            TagManager.dataLayer({
                dataLayer:{
                    'event':ChangeNumberLogin,
                    'Login Category': LoginCategory,
                    'Login Action' : 'Change Number',
                    'LoginChangeNumberLabel' : 'Change Number',
                    'LoginChangeNumberValue':'Change Number'
                }
            })
        }
    }catch(err) {
        console.log(err)
    }
}
export const ResendOTP = () => {
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event':CAMPAIGNMODAL_RESENDOTP,
                'CampaignModal Category':CAMPAIGNMODEL,
                'Campaign Action' : 'Resend OTP',
                'campaignResendOTPLabel': 'Resend OTP'
            }
        })
    } catch(err) {
        console.log(err)
    }
}
export const Verifyotp =(Status) => {
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event' : CAMPAIGNMODAL_VERIFYOTP,
                'CampaignModal Category' : CAMPAIGNMODEL,
                'Campaign Action': 'Verify OTP',
                'campaignStatus' : Status,
                'campaignVerifyOTPLabel' : 'Verify OTP'
            }
        })
    } catch(err) {
        console.log(err)
    }
}

//Campaign Model popover Events End

//Payback Model Events Start

export const PaybackProductAddtoCart =(Product,Action) => {
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event' : PAYBACKADDTOCART,
                'Payback Category': MEDPLUSPAYBACK,
                'Payback ProductName' : Product,
                'Payback Action': Action,
                'Payback ProductValue' : Action
            }
        })
    } catch(err) {
        console.log(err)
    }
}

export const PaybackViewShoppingCart = (Action) => {
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event' : PAYBACKVIEWSHOPPINGCART,
                'Payback Category': MEDPLUSPAYBACK,
                'Payback Action': 'Shopping Cart Event',
                'Payback ViewShoppingCartLabel' : 'Payback Shopping Cart',
                'Payback ViewShoppingCartValue' : Action
            }
        })
    } catch(err) {
        console.log(err)
    }
}

export const PaybackRemoveProduct =(ProductName) => {
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event' : PAYBACKREMOVEPRODUCT,
                'Payback Category': MEDPLUSPAYBACK,
                'Payback ProductRemovedValue' : ProductName,
                'Payback Action': 'Remove',
                'Payback RemoveProductLabel' : 'Remove Payback Product'
            }
        })
    } catch(err) {
        console.log(err)
    }
}

export const PaybackCartProceedEvent = () => {
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event': PAYBACKCARTPROCEEDEVENT,
                'Payback Category' : MEDPLUSPAYBACK,
                'Payback Action': 'Proceed to Delivery Details',
                'Payback CartProceedLabel':'PayBack Cart Proceed Action'
            }
        })
    } catch(err) {
        console.log(err)
    }
}

export const PaybackCartBackEvent = () =>{
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event': PAYBACKCARTBACKEVENT,
                'Payback Category' : MEDPLUSPAYBACK,
                'Payback Action' : 'Moved to Payback Catalog',
                'Payback CartBackLabel' : 'Payback Shopping Cart Back Button'
            }
        })
    }catch(err) {
        console.log(err)
    }
}

export const PaybackDeliveryProceedEvent = () => {
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event': PAYBACKDELIVERYPROCEEDEVENT,
                'Payback Category' : MEDPLUSPAYBACK,
                'Payback Action': 'Proceed to Review Details',
                'Payback DeliveryProceedLabel':'Payback Delivery Proceed Action'
            }
        })
    } catch(err) {
        console.log(err)
    }
}

export const PaybackDeliveryBackEvent = () =>{
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event': PAYBACKDELIVERYBACKEVENT,
                'Payback Category' : MEDPLUSPAYBACK,
                'Payback Action' : 'Payback Delivery  Back Button',
                'Payback DeliveryBackLabel' : 'Moved to Payback Cart Details'
            }
        })
    }catch(err) {
        console.log(err)
    }
}


export const PaybackEditUpdateEvent  = () => {
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event': PAYBACKEDITORUPDATEEVENT,
                'Payback Category' : MEDPLUSPAYBACK,
                'Payback Action' : 'Payback EditorUpdate Button',
                'Payback ReviewUpdateLabel' : 'Payback EditorUpdate',   
                'Payback ReviewUpdateValue' : 'Moved to Payback Cart'

            }
        })
    }catch(err) {
        console.log(err)
    }
}

export const PaybackReviewBackEvent  = () => {
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event': PAYBACKREVIEWBACKEVENT,
                'Payback Category' : MEDPLUSPAYBACK,
                'Payback Action' : 'Payback Review Back Button',
                'Payback ReviewBackLabel' : 'Moved to Payback Delivery Details'
            }
        })
    }catch(err) {
        console.log(err)
    }
}

export const PaybackReviewProceedEvent  = () => {
    try { 
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event': PAYBACKREVIEWPROCEEDEVENT,
                'Payback Category' : MEDPLUSPAYBACK,
                'Payback Action' : 'Payback Review Proceed Button',
                'Payback ReviewProceedLabel' : 'Moved to Payback Payments Details'
            }
        })
    }catch(err) {
        console.log(err)
    }
}

export const PaybackPaymentBackEvent  = () => {
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event': PAYBACKPAYMENTSBACKEVENT,
                'Payback Category' : MEDPLUSPAYBACK,
                'Payback Action' : 'Payback Review Proceed Button',
                'Payback PaymentBackLabel' : 'Moved to Payback Review Details'
            }
        })
    }catch(err) {
        console.log(err)
    }
}

export const PaybackPaymentAddMoreEvent  = () => {
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event': PAYBACKPAYMENTADDMORE,
                'Payback Category' : MEDPLUSPAYBACK,
                'Payback Action' : 'Payback Review Proceed Button',
                'Payback PaymentAddmore' : 'Moved to Payback Catalog Details'
            }
        })
    }catch(err) {
        console.log(err)
    }
}

export const PaybackSelectedPaymentEvent = (payment) =>{
    try {
        let paymentMode;
        switch (payment) {
            case 'CC': paymentMode = 'Credit Card'; break;
            case 'DC': paymentMode = 'Debit Card'; break;
            case 'NB': paymentMode = 'Net Banking'; break;
            case 'PPI':paymentMode = 'Paytm'; break;
            case 'UPI':paymentMode = 'UPI';break;
            case 'PPE':paymentMode = 'PhonePe';break;
            case 'MK' :paymentMode ='MobiKwik';break;
            case 'MW' :paymentMode = 'MedPlus Wallet';break;
            case 'JM' :paymentMode = 'Jio Money';break;
            case 'AMZPAY':paymentMode = 'Amazon Pay';break;
            case 'EBS': paymentMode ='Ebs';break;
            default: paymentMode = paymentmode;
        }

    window['google_tag_manager'][GTM_ID].dataLayer.reset();
            TagManager.dataLayer({
                dataLayer:{
                    'event' : PAYBACKSELECTEDPAYMENT,
                    'Payback Category' : MEDPLUSPAYBACK,
                    'Payback Action' : 'Payment',
                    'PaybackPaymentValue' : paymentMode,
                    'PaybackPaymentLabel' : paymentMode,
                }
            })
        }catch(err) {
            console.log(err)
        }
}

export const PaybackContinueShoppingEvent = () => {
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event': PAYBACKCONTINUESHOPPING,
                'Payback Category' : MEDPLUSPAYBACK,
                'Payback Action' : 'Payback Continue Shopping in Thank you Page',
                'Payback ContinueShopping' : 'Moved to MedPlus Home Page '
            }
        })
    }catch(err) {
        console.log(err)
    }
}

export const PaybackPointsHistoryEvent = () => { 
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event': PAYBACKPOINTSHISTORY,
                'Payback Category' : MEDPLUSPAYBACK,
                'Payback Action' : 'Payback Points History in Thank you Page',
                'Payback PointsHistory' : 'Moved to MedPlus Payback Points History'
            }
        })
    } catch(err) {
        console.log(err)
    }
}


//login and register events 

export const SendOTPEvent = (status) =>{
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event': SendOTP,
                'Login Category' : LoginCategory,
                'Login Action' : 'Send OTP Triggered',
                'Login Label' : 'Send OTP Status',
                'Login Value'  : status
            }
        })
    } catch(err) {
        console.log(err)
    }
}

export const SkipRegistrationEvent =() => {
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event': SkipRegister,
                'Login Category' : LoginCategory,
                'Login Action' : 'User Skipped Registration',
                'SkipAction Label' : 'User Registration Skip'
            }
        })
    } catch(err) {
        console.log(err)
    }
}

export const ResendOTPLogin = (status) => {
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event':ResendOTPValidation,
                'Login Category': LoginCategory,
                'Login Action' : 'Resend OTP',
                'SigninResendOTPLabel': 'Resend OTP SignIn',
                'SigninResendOTPValue': status
            }
        })
    } catch(err) {
        console.log(err)
    }
}


export const VerifyotpLogin =(Status) => {
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event' : VerifyOTPLogin,
                'Login Category' : LoginCategory,
                'Login Action': 'Verify OTP',
                'LoginStatus' : Status,
                'LoginVerifyOTPLabel' : 'Verify OTP'
            }
        })
    } catch(err) {
        console.log(err)
    }
}

export const RegistrationLogin = (status) => {
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event' : RegistrationLoginEvent,
                'Login Category' : LoginCategory,
                'Login Action': 'New Registered User',
                'RegistrationStatus' : status,
                'RegistrationStatusLabel' : 'New Registered User'
            }
        })
    } catch(err) {
        console.log(err)
    }
}

export const ContactUsOnWhatsApp=() =>{
    try{
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event':WhatsAppPromo,
                'WhatsApp Category':WhatsAppCategory,
                'WhatsApp Action':'Contact us on our WhatsApp number +916281412345',
                'WhatsApp Label':'WhatsAppPromo',
                'WhatsApp Value':'Contact us on our WhatsApp number +916281412345'
            }
        })
    }
    catch(err) {
        console.log(err)
    }
}

export const CardiacCtToDiagnostic=(fromPage)=>{
    try{
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event':CardiacToDiagnostic,
                'CardiacCt Category':CardiacCategory,
                'CardiacCt Action':'MedPlus Diagnostic',
                'CardiacCt Label': fromPage +" "+'Go To MedPlus Diagnostic HomePage',
                'CardiacCt Value':'MedPlus Diagnostic'
            }
        })
    }
    catch(err) {
        console.log(err)
    }
}

export const CallForBookSlot=(fromPage)=>{
    try{
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event':CardiacCTTest,
                "Cardiac Category":CardiacCTTestCategory,
                'Cardiac Action':'To book a slot call +91 6300532067',
                'Cardiac Label': fromPage+' Cardiac-CT Machine',
                'Cardiac Value':'To book a slot, call +91 6300532067'
            }
        })
    }
    catch(err){
        console.log(err);
    }
}
export const DiagnosticStoreLocation=(storeLocation,fromPage)=>{
    try{
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event':DiagnosticCenters,
                'Location Category':DiagnosticCenter,
                'Location Action':storeLocation+" MedPlus Diagnostic Center",
                'Location Label':fromPage+" "+storeLocation+" MedPlus Diagnostic Center",
                'Location Value':storeLocation+" MedPlus Diagnostic Center"
            }
        })
    }
    catch(err){
        console.log(err)
    }
}


export const bannerSelection =(from , selectedBanner) => {
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event' : from == 'HomePage' ? TopBanners : PromotionTopBanners,
                'Banner Category': CatalogCategory,
                'Banner Action': selectedBanner.alternativeValue + " from " + from +' '+ 'Triggered',
                'Banner Label': 'Banner Triggered',
                'Banner Value' : selectedBanner.alternativeValue
            }
        })
    }
    catch(err) {
        console.log(err)    
    }
}

export const getHelp =(needhelp) => {
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer: {
                'event' : needhelp == 'uploadPresciption' ? UploadPrescription : NeedHelp,
                'GetHelp Category' : CatalogCategory,
                'GetHelp Action': needhelp == 'uploadPresciption' ?'Get a call back by uploading Prescription': 'Get a call back',
                'GetHelp Label': needhelp == 'uploadPresciption' ? 'Get a call back by uploading Prescription':'Get a call back',
                'GetHelp Value': needhelp == 'uploadPresciption' ? 'Get a call back by uploading Prescription': 'Get a call back'
            }
        })
    }
    catch(err){
        console.log(err)
    }
}

export const shopByCategory =(selectedCategory) => {
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer:{
                'event' : ShopByCategorySection,
                'ShopBy Category' : CatalogCategory,
                'ShopBy Action' : 'selected Category',
                'ShopBy Label' : 'ShopBy Category Section',
                'ShopBy Value': selectedCategory
            }
        })
    } 
    catch(err) {
        console.log(err)
    }
}

export const myAccountCards = (selectedCard) =>{
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer : {
                'event' : MyAccountCards,
                'MyAccountCards category':CatalogCategory,
                'MyAccountCards Action':'Redirecting to MyAccount pages from HomePage',
                'MyAccountCards Label':selectedCard,
                'MyAccountCards Value':selectedCard 
            }
        })
    }
    catch(err) {
        console.log(err)
    }
}

export const addProducttoCart =(product) => {
    try {
        let productObj = {
            'item_id': product.productId,                    // Product ID (string).
            'item_name': product.productName,                // Product name (string).
            'quantity': 1
        }
        if(product.brand){
            productObj["item_brand"] = product.brand;
        }

        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        let ecommerceObj = {
            'items': [productObj]
        }
        TagManager.dataLayer({
            dataLayer : {
                'event':GA4_ECOMMERCE_ADD_CART,
                'ecommerce': ecommerceObj
            }
        })
    }
    catch(err) {
        console.log(err)
    }
}

export const pharmacySeperators = (from, selectedBanner) => {
    let frompage = 'Home Page'
    if(Validate().isNotEmpty(from) && from.includes('categories')) {
        frompage = 'Category Page'
    }
    if(Validate().isNotEmpty(from) && from.includes('promotions')) {
        frompage = 'Promotions Page'
    }
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer : {
                'event':PharmacySeperators,
                'PharmacySeperators category': CatalogCategory,
                'PharmacySeperators Action' : 'Pharmacy Seperators from ' + frompage + ' triggered',
                'PharmacySeperators Label': selectedBanner,
                'PharmacySeperators Value' : selectedBanner
            }
        })
    } catch(err) {
        console.log(err)
    }
}

export const shopByGeneralCategory =(selectedCategory) => {
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer : {
                'event':ShopByGeneralCategory,
                'ShopByGeneralCategory category': CatalogCategory,
                'ShopByGeneralCategory Action' : 'Redirecting to a category detail page',
                'ShopByGeneralCategory Label': selectedCategory,
                'ShopByGeneralCategory Value' : selectedCategory
            }
        })
    } catch(err) {
        console.log(err)
    }
}

export const popularBrands =(selectedCategory) => {
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer : {
                'event':PopularBrands,
                'PopularBrands category': CatalogCategory,
                'PopularBrands Action' : 'Redirecting to Brand Detail Page',
                'PopularBrands Label': selectedCategory,
                'PopularBrands Value' : selectedCategory
            }
        })
    } catch(err) {
        console.log(err)
    }
}

export const shareProduct  = (sharedProduct) => {
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer : {
                'event' : ShareProduct,
                'ShareProduct category' : CatalogCategory,
                'ShareProduct Action' : 'Share this Product On Social Media',
                'ShareProduct Label' : sharedProduct,
                'ShareProduct Value' : sharedProduct
            }
        })
    }
    catch(err) {
        console.log(err)
    }
}

export const getNotified = (productName) => {
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer :  {
                'event' : GetNotifiedProduct,
                'GetNotified category': CatalogCategory,
                'GetNotified Action': 'Get Notified Popover',
                'GetNotified Label' : productName,
                'GetNotified Value' : productName
            }
        })
    }
    catch(err) {
        console.log(err)
    }
}

export const storeInfo = (selectedProduct) => {
    try {
        window['google_tag_manager'][GTM_ID].dataLayer.reset();
        TagManager.dataLayer({
            dataLayer : {
                'event' : StoreInfoNearMe,
                'StoreInfo category' : CatalogCategory,
                'StoreInfo Action': 'Redirecting to Store Info for this product',
                'StoreInfo Label' : 'Near By Stores to PickUp',
                'StoreInfo Value' : selectedProduct  
            }
        })
    }
    catch(err) {
        console.log(err)
    }
}

