import React from 'react';
import KnowYourMedicineImg from '../../images/Know your Medicine.png';
import Medplus_logo from "../../images/common/medplus_logo.svg";
import ProductSearch from '../../components/Common/ProductSearch';
import LabsFrequentlyAskedQuestions from '../../components/MedplusLabs/components/Home/LabsFrequentlyAskedQuestions';
import FAQIcon from "../../images/common/FAQs-amico.svg";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function KnowYourMedicine(props) {
    return (
        <>
            <Helmet>
                <title>{'Know Your Medicine'}</title>
            </Helmet>
            <div className='know-your-medicine know-your-medicine-home kym-1024 position-relative'>
                <div className='home-banner' />
                <div className='home-banner-content'>
                    <Link to={"/"} role="link" className="navbar-brand" title="MedPlus Mart">
                        <img src={Medplus_logo} alt="Medplus logo" height="32" style={{ marginBottom: "3rem" }} />
                    </Link>
                    <div className='title-gradient'>
                        <div className=''>
                            <img src={KnowYourMedicineImg} alt="Know your Medicine banner" aria-role="Know your Medicine banner" />
                            <h4 className='text-secondary '>Harness the benefits of understanding your medications</h4>
                        </div>
                        <div className='kym-global-search mb-5 mt-3 px-0 w-50' style={{ "box-shadow": "0px 32px 20px -20px #2699FB26" }}>
                            <ProductSearch history={props.history} isKym={true} isPageBody={true}></ProductSearch>
                        </div>
                    </div>
                </div>
            </div>
            <LabsFrequentlyAskedQuestions sectionMarginClass={"m-4 mb-n3"} page={"KYM"} icon={FAQIcon} />
        </>
    );
}

export default KnowYourMedicine;