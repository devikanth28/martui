import React, { useEffect, useState } from "react";
import { CATEGORY_LIST_TYPE_SYMPTOMS, CATEGORY_LIST_TYPE_SPECIALIZATIONS } from "../../constants/DoctorConsultationConstants";
import DoctorCategorySlider from "../common/DoctorCategorySlider";
import DoctorSplitBanner from "../moduleComponents/DoctorSplitBanner";
import DoctorSlider from "../moduleComponents/DoctorSlider";
import UpcomingDoctorConsultations from "../moduleComponents/UpcomingDoctorConsultations";
import DoctorPracticesWeOffer from "../common/DoctorPracticesWeOffer";
import LabsFrequentlyAskedQuestions from "../../../components/MedplusLabs/components/Home/LabsFrequentlyAskedQuestions";
import DoctorConsultationService from "../../services/DoctorConsultationService";
import Validate from "../../../helpers/Validate";
import LabsCatalogBanner from "../../../components/MedplusLabs/components/Common/LabsCatalogBanner";
import CategoryContentGhostImage from "../../../components/Common/CategoryContentGhostImage";
import useStaticContent from "../../../components/Common/CustomHooks/useStaticContent";
import MetaTitle from "../../../commonComponents/MetaTitle";
import { useChatModal } from "../../../components/Chat/Common/useChatModal";
import ChatModal from "../../../components/Chat/Common/ChatModal";
import DoctorsNoSympotoms from "./DoctorsNoSympotoms";

const DoctorConsultationHome = (props) => {

  const doctorConsultationService = DoctorConsultationService();
  const validate = Validate();
  const [isSpecializationAvailable, setSpecializationAvailable] = useState(true);
  const [isConsultedDoctorsAvailable, setConsultedDoctorsAvailable] = useState(true);
  const [isSymptomsAvailable, setSymptomsAvailable] = useState(true);
  const [isConsultationsAvailable, setConsultationsAvailable] = useState(true);
  const [isBannersLoading, setBannersLoading] = useState(true);
  const [topBanners, setTopBanners] = useState([]);
  const [separatorBanners, setSeparatorBanners] = useState([]);
  const [isContentLoading, content] = useStaticContent({itemId:"DOCTOR_CONSULTATION_HOME", contentType : "ALL"});
  //char related variables
  const [startChat,chatHeaderDetails,toggleChat] = useChatModal();
  useEffect(() => {
    getBanners();
  }, []);

  const getBanners = () => {
    setBannersLoading(true);
    let obj = { REQUEST_OBJ: JSON.stringify({ 'catalogId': "CATALOG_DOC1", 'requestFor': "BANNER_DOCTORS_WEB", 'pageName': "DOCTORHOME" }) };
    doctorConsultationService.getBannerDetails(obj).then((response) => {
      if (validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.dataObject) && validate.isNotEmpty(response.dataObject.bannerPromotion) && validate.isNotEmpty(response.dataObject.bannerPromotion.bannerPromoDetails)) {
        setTopBanners(validate.isNotEmpty(response.dataObject.bannerPromotion.bannerPromoDetails['TOP']) ? response.dataObject.bannerPromotion.bannerPromoDetails['TOP'] : []);
        setSeparatorBanners(validate.isNotEmpty(response.dataObject.bannerPromotion.bannerPromoDetails['SEPARATOR']) ? response.dataObject.bannerPromotion.bannerPromoDetails['SEPARATOR'] : []);
      } else {
        setTopBanners([]);
        setSeparatorBanners([]);
      }
      setBannersLoading(false);
    }).catch(function (error) {
      console.log(error);
      setBannersLoading(false);
    });
  }

  return (
    <React.Fragment>
      <ChatModal chatHeaderDetails={chatHeaderDetails} isModelOpen={startChat} toggleChat={toggleChat} eventType={"DOCTOR_ORDER_CHAT"} ></ChatModal>
      <MetaTitle metaKey={`DOCTOR_CONSULTATION`}/>
      <DoctorSplitBanner isBannersLoading={isBannersLoading} banners={topBanners} history={props.history} />   
      <div className="my-32">
        {(isSpecializationAvailable || isConsultedDoctorsAvailable) || (isSymptomsAvailable || isConsultationsAvailable) ?
          <div className="row my-32">
            <div className={(isConsultedDoctorsAvailable || isConsultationsAvailable) ? "col-8" : "col"}>
              {isSpecializationAvailable ? <div>
                <DoctorCategorySlider isHomePage={true} showFullWidth={!isConsultedDoctorsAvailable} categoryListType={CATEGORY_LIST_TYPE_SPECIALIZATIONS} setAvailable={setSpecializationAvailable} history={props.history} showViewAll={false}/>
              </div> : <React.Fragment></React.Fragment>}

              {isSymptomsAvailable ? <div className={isSpecializationAvailable ? "my-32":""}>
                <DoctorCategorySlider isHomePage={true} showFullWidth={!isConsultationsAvailable} categoryListType={CATEGORY_LIST_TYPE_SYMPTOMS} setAvailable={setSymptomsAvailable} history={props.history} showViewAll={false} />
                </div> : <React.Fragment></React.Fragment>}

                {(isConsultedDoctorsAvailable || isConsultationsAvailable) && (!isSpecializationAvailable && !isSymptomsAvailable ) && 
                  <React.Fragment>
                    <DoctorsNoSympotoms isHomePage={true}/> 
                  </React.Fragment>
                }
            </div>

            <div className={(isConsultationsAvailable || isConsultedDoctorsAvailable) ? "col-4" : ''}>
              {isConsultedDoctorsAvailable ? <div>
                <DoctorSlider isHomePage={true} sectionTitle="Previously Consulted Doctors" setAvailable={setConsultedDoctorsAvailable} history={props.history} />
              </div> : <React.Fragment></React.Fragment>}

              {isConsultationsAvailable ? <div className={isConsultedDoctorsAvailable ? "mt-4":""}> <UpcomingDoctorConsultations toggleChat={toggleChat} isSlider={true} sectionTitle="Upcoming Consultation" setAvailable={setConsultationsAvailable} history={props.history} /> </div> : <React.Fragment></React.Fragment>}
            </div>



            {/* {isSpecializationAvailable ?
              <div className={(isConsultedDoctorsAvailable || isConsultationsAvailable) ? "col-8" : "col-12"}>
                <div className="h-100">
                  <DoctorCategorySlider isHomePage={true} showFullWidth={!isConsultedDoctorsAvailable} categoryListType={CATEGORY_LIST_TYPE_SPECIALIZATIONS} setAvailable={setSpecializationAvailable} history={props.history} />
                </div>
              </div>
            : null} */}

            {/* {isSymptomsAvailable ?
              <div className={(isConsultedDoctorsAvailable || isConsultationsAvailable) ? "col-8" : "col-12"}>
                <DoctorCategorySlider isHomePage={true} showFullWidth={!isConsultationsAvailable} categoryListType={CATEGORY_LIST_TYPE_SYMPTOMS} setAvailable={setSymptomsAvailable} history={props.history} />
              </div>
              : null}

            {isConsultedDoctorsAvailable ?
              <div className="col-4">
                <DoctorSlider isHomePage={true} sectionTitle="Previously Consulted Doctors" setAvailable={setConsultedDoctorsAvailable} history={props.history} />
              </div>
            : null}

            {isConsultationsAvailable ?
              <div className="col-4">
                <UpcomingDoctorConsultations isSlider={true} sectionTitle="Upcoming Consultation" setAvailable={setConsultationsAvailable} history={props.history} />
              </div>
              : null} */}
          </div>
        : <React.Fragment></React.Fragment>}
        <LabsCatalogBanner isBannersLoading={isBannersLoading} bannerData={separatorBanners.filter(bannerData => bannerData.sequenceNo == 1)[0]} history={props.history} screenLocation={"SEPARATOR"} />
        {/* {isSymptomsAvailable || isConsultationsAvailable ?
          <div className="row my-32">
            {isSymptomsAvailable ?
              <div className={isConsultationsAvailable ? "col-8" : "col-12"}>
                <DoctorCategorySlider isHomePage={true} showFullWidth={!isConsultationsAvailable} categoryListType={CATEGORY_LIST_TYPE_SYMPTOMS} setAvailable={setSymptomsAvailable} history={props.history} />
              </div>
            : null}
            {isConsultationsAvailable ?
              <div className="col-4">
                <UpcomingDoctorConsultations toggleChat={toggleChat} isSlider={true} sectionTitle="Upcoming Consultation" setAvailable={setConsultationsAvailable} history={props.history} />
              </div>
              : null}
          </div>
        : null} */}
      </div>
      <LabsCatalogBanner isBannersLoading={isBannersLoading} bannerData={separatorBanners.filter(bannerData => bannerData.sequenceNo == 2)[0]} history={props.history} screenLocation={"SEPARATOR"} />
      <LabsFrequentlyAskedQuestions page = {"DOCTOR_CONSULTATION_HOME"} />
      { !isContentLoading && validate.isNotEmpty(content) && validate.isNotEmpty(content.DESC) && <section className="p-5" dangerouslySetInnerHTML={{ __html: content.DESC }} /> }
      <DoctorPracticesWeOffer isFromDoctorDetail={false} />
      { isContentLoading && <CategoryContentGhostImage /> }
    </React.Fragment>
  )
}
export default DoctorConsultationHome;