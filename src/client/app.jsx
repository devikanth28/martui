import React, { Component } from "react";
import Routes from '../routes';
import { withRouter } from "react-router";
import {initialize, sendPageView} from '../client/Analytics/Analytics'
import TokenGenerationHOC from "./commonComponents/TokenGenerationHOC";
import { connect } from "react-redux";
import { getDetailsForFCM } from "./helpers/CommonUtil";
import FcmService from "./services/FCMService";
import CONFIG from "./constants/ServerConfig";
import LocalDB from "./DataBase/LocalDB";
import { bindActionCreators } from "redux";
import { toggleUnReadNotifications } from "../redux/action/NotificationAction";
class App extends Component {
    constructor(props){
        super(props);
        const {history} = {...props};
        initialize(history.location.pathname);
        history.listen(location => {
            sendPageView(location.pathname);
        });
    }
    componentDidMount(){
        let firebaseScript = document.createElement("script") ;
        firebaseScript.setAttribute("defer", true);
        firebaseScript.src = "https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js";
        let firebaseScriptMsging = document.createElement("script") ;
        firebaseScriptMsging.setAttribute("defer", true);
        firebaseScriptMsging.src = "https://www.gstatic.com/firebasejs/7.6.1/firebase-messaging.js";
        firebaseScriptMsging.onload = () => this.fireBaseReg();
        document.getElementsByTagName('head')[0].append(firebaseScript);
        firebaseScript.onload = () => {
            document.getElementsByTagName('head')[0].append(firebaseScriptMsging);
        }
    }

    fireBaseReg = async () => {
        var firebaseConfig = {
            apiKey: "AIzaSyCL8gHWChMLpuR6hTK9JdSHx0MdrceTKOM",
            authDomain: "medplusmart-181906.firebaseapp.com",
            databaseURL: "https://medplusmart-181906.firebaseio.com",
            projectId: "medplusmart-181906",
            storageBucket: "medplusmart-181906.appspot.com",
            messagingSenderId: "588873455228",
            appId: "1:588873455228:web:a6dd0f46ba4309eca1dbf9"
        };
        const some = await firebase.initializeApp(firebaseConfig);
        const messaging = firebase.messaging();
        messaging.usePublicVapidKey('BDvphKfuQQ-R8RtLCzmY766KJJ2h25IOFcQh6maNgDWBhpFkhEVTgSDZQtmLuMVnYRGSWtdrAze4do0QVZcvhKM');
        this.registerViewToFCM()
    }

    registerViewToFCM = () => {
        if(firebase && firebase.messaging) {
            const messaging = firebase.messaging();
            Notification.requestPermission().then((permission) => {
                if(permission == 'granted'){
                    messaging.getToken().then((currentToken) => {
                        if(currentToken) {
                            const oldTokenId = LocalDB.getValue("fireBaseToken");
                            if(currentToken !== oldTokenId){
                                const details = getDetailsForFCM(this.props.userInfo, this.props.locality);
                                const sessionId = LocalDB.getValue("SESSIONID") ? LocalDB.getValue("SESSIONID") : null;
                                LocalDB.setValue("fireBaseToken", currentToken);
                                FcmService().saveToken({
                                    oldTokenId: oldTokenId, 'fcmTokenId': currentToken, 'customerId': details.customerId, 'mobileNo': details.mobileNo, 'city': details.city, 'state': details.state, 'country': details.country, 'tokenId': sessionId
                                })
                            }
                        } else {
                            console.log('No Instance ID token available. Request permission to generate one.');
                        }
                    }).catch((err) => {
                        console.log('An error occurred while retrieving token. ', err);
                    });
                    messaging.onMessage((payload) => {
                        if(payload.notification){
                            this.props.dispatch(this.props.toggleUnReadNotifications(true));
                            const notificationTitle = payload.notification.title;
                            const notificationOptions = {
                                body: payload.notification.body,
                                image: payload.notification.image
                            };
                            var notification = new Notification(notificationTitle, notificationOptions);
                            notification.onclick = function (event) {
                                event.preventDefault();
                                if (payload.data.notificationRedirectionUrl) {
                                    window.open(payload.data.notificationRedirectionUrl, '_blank');
                                }
                                else {
                                    window.open(CONFIG.REDIRECT_HOME_URL, '_blank');
                                }
                                notification.close();
                            }
                        }
                    })
                } else {
                    console.log('Unable to get permission to notify.');
                }
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                { this.props.isValidToken && <Routes />}
            </React.Fragment>
        );
    }
}

function mapStateToProps(state){
    return {
        isValidToken: state?.tokenValidateReducer?.isValidToken,
        userInfo: state?.userInfo?.userInfo,
        locality: state?.locality?.selectedLocality
    }
 }

 function mapDispatchToProps(dispatch) {
    return {
      dispatch,
      ...bindActionCreators({ toggleUnReadNotifications}, dispatch),
    }
  }


export default TokenGenerationHOC(withRouter(connect(mapStateToProps,mapDispatchToProps)(App)));