import React, {useState} from 'react';
import Tabs from './Tabs';
import SliderOffer from './SliderOffer';
import threewaystoorder from '../../images/common/three-ways-to-order.png';
const PharmaHome = () => {
   
    return (
        <React.Fragment>            
            <section className="waysOfOrder bg-none shadow-none">
                <div className="imgTitle">
                    <img className="img-fluid" src={threewaystoorder} title="Three ways to order your medicine" alt="Three ways to order your medicine" />
                </div>
                <div  className="container d-flex justify-content-between">

                    <div className="bg-white rounded helpBlock ">
                        <div className="text-center ico-buy-online"></div>
                        <h3 className="help-heading">Buy Online</h3>                       
                        <ol className="helpList">
                            <li>Search and select the medicines you want</li>
                            <li>Upload your prescription at check out</li>
                            <li>Choose home delivery or store pick up</li>
                        </ol>
                    </div>
                    <div className="bg-white rounded helpBlock">
                        <div className="text-center ico-click-and-pick"></div>
                        <h3 className="help-heading">Click and Pick</h3>
                        <ol className="helpList">
                            <li>Search and select the Medicines you want</li>
                            <li>Select the MedPlus store where you wish to pick up the order</li>
                            <li>Show the prescription at the store and collect your medicine</li>
                        </ol>
                    </div>
                    <div className="bg-white rounded helpBlock">
                        <div className="text-center ico-call-back"></div>
                        <h3 className="help-heading">Receive a Call Back</h3>
                        <ol className="helpList">
                            <li>Our customer Representative will call you and confirm the order</li>
                            <li className="nostyle">
                                <a href="/prescriptionUpload" className="btn btn-block  btn-brand"  title="Upload your prescription">Upload your Prescription</a>
                            </li>
                        </ol>
                    </div>
                </div>
            </section>
            <SliderOffer />
            <Tabs />
        </React.Fragment>
    )
}
export default PharmaHome;