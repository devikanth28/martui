import React, { useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import Alert, { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from "../../../../../components/Common/Alert";
import Validate from "../../../../../helpers/Validate";
import MartAdminService from "../../../../services/MartAdminService";
import MetaConfigurationScreen from "./MetaConfigurationScreen";
import BreadCrumbAction from "../../../../../../redux/action/BreadCrumbAction";

const MetaConfigurationHome = (props) => {

  const screens = [
    { metaType: 'DEFAULT', 'title': 'Meta Keywords And Description', tabName: 'Default Meta Info',placeholder:'Search Page Name Here' },
    { metaType: 'GENERAL_CATEGORY', 'title': 'Keywords And Description For General Category', tabName: 'General Category',placeholder:'Eg: Baby Needs, Soaps,Skin Care etc..' },
    { metaType: 'GENERAL_BRANDS', 'title': 'Keywords And Description For General Brands', tabName: 'General Brands',placeholder:'Eg: Himalaya,Mamypoko,Pampers,Horlicks etc..' },
    { metaType: 'PHARMA_BRANDS', 'title': 'Keywords And Description For Pharmacy Manufacturers', tabName: 'Pharmacy Brands',placeholder:'Eg: Himedia Labs,Apple Biotech etc..' },
    { metaType: 'LAB_CATEGORY', 'title': 'Keywords And Description For Lab Category', tabName: 'Lab Category',placeholder:'Search Lab Category Here' },
    { metaType: 'LAB_DEPARTMENT', 'title': 'Keywords And Description For Lab Tests and Departments', tabName: 'Lab Departments',placeholder:'Search Lab Department Here' },
    { metaType: 'BLOG_CATEGORY', 'title': 'Blog Meta Keywords And Description', tabName: 'Healthy Life Category',placeholder:'Search Blog Category Here'},
    { metaType: 'BLOG_DETAIL', 'title': 'Blog Details Meta Keywords And Description', tabName: 'Healthy Life Detail Page', search: 'manual',placeholder:'Search Blog Name Here' },
    { metaType: 'LANDING_PAGE', 'title': 'Landing Page Meta Keywords And Description', tabName: 'Landing Page', search: 'manual',placeholder:'Search Page Name Here' }
  ];




  const [currentActiveTab, setCurrentActiveTab] = useState('DEFAULT');
  const [suggestions, setSuggestions] = useState(null);
  const validate = Validate();
  const [title, setTitle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [description, setDescription] = useState('');
  const [metaKey, setMetaKey] = useState('');
  const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
  const[suggestionsLoading,setSuggestionsLoading] = useState(false);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const[isLoading,setLoading] = useState(false);
  const [metaInput, setMetaInput] = useState('');
  const breadCrumbAction = BreadCrumbAction();

  useEffect(()=>{
    breadCrumbAction.pushBreadCrumbs({ name: 'Meta Information', url: props.location.pathname });
  },[])


  const handleClear = () => {
    clearInputValues();
    setMetaKey('');
    setMetaInput('');
  }



  const clearInputValues = () => {
    setTitle('');
    setDescription('');
    setKeywords('');
  }


  const getMetaTagDetails = async () => {
    try {
      const finalMetaKey = prepareMetaKey(metaKey);
      setSuggestionsLoading(true);
      const response = await MartAdminService().getMetaTagDetails({ metaType:  currentActiveTab, metaKey : finalMetaKey });
      if (validate.isNotEmpty(response) && response.statusCode == 'SUCCESS') {
        if (response.statusCode == 'SUCCESS') {
          setTitle(response?.dataObject?.Title);
          setDescription(response?.dataObject?.Description);
          setKeywords(response?.dataObject?.Keywords);
        }
        if (response.statusCode == 'FAILURE') {
          setAlertInfo({ message: response.message, });
        }
      }
      else {
        setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
        clearInputValues();
      }
      setSuggestionsLoading(false);
    }
    catch (err) {
      console.log(err);
      setSuggestions(null);
      setSuggestionsLoading(false);
      setAlertInfo({ message: err.message, type: ALERT_TYPE_ERROR })
    }
  }

  const prepareMetaKey = (metaKey)=> {
    if(validate.isNotEmpty(metaKey) && validate.isNotEmpty(suggestions) && validate.isNotEmpty(suggestions["SUGGESTIONS_KEYS"])){
      return suggestions["SUGGESTIONS_KEYS"][metaKey];
    }
    return metaKey;
  }

  const saveMetaDetail = async () => {
    try {
      const finalMetaKey =  prepareMetaKey(metaKey);
      if (validate.isEmpty(title) || validate.isEmpty(keywords) || validate.isEmpty(description)
        || validate.isEmpty(finalMetaKey) || validate.isEmpty(currentActiveTab)) {
        return;
      }
      setLoading(true);
      const response = await MartAdminService().saveMetaTagDetails({ metaKey : finalMetaKey, metaType: currentActiveTab, title, keywords, description });
      if (validate.isNotEmpty(response)) {
        if (response.statusCode == 'SUCCESS') {
          getMetaTagDetails();
          setAlertInfo({ message: response.message, type: ALERT_TYPE_SUCCESS });
        }
        else if (response.statusCode == 'FAILURE') {
          setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
        }
      }
      setLoading(false);
    }
    catch (err) {
      console.log(err);
      setLoading(false);
      setAlertInfo({ message: err.message, type: ALERT_TYPE_ERROR })
    }
  }


  useEffect(() => {
    if (validate.isNotEmpty(metaKey)) {
      getMetaTagDetails();
    }
    else{
      clearInputValues();
    }
  }, [metaKey])

  useEffect(() => {
    handleClear();
    if (validate.isNotEmpty(suggestions) && validate.isNotEmpty(suggestions[currentActiveTab]) || ['LANDING_PAGE', 'BLOG_DETAIL'].includes(currentActiveTab)) {
      return;
    }
    getMetaConfiguration();
  }, [currentActiveTab])

  const getMetaConfiguration = async (metaType) => {
    const type = metaType ? metaType : currentActiveTab;
    try {
      type!= 'RefreshMetaSuggestions' && setSuggestionsLoading(true);
      const response = await MartAdminService().getMetaConfiguration({ metaType: type });
      if (validate.isNotEmpty(response) && response.statusCode == 'SUCCESS' && validate.isNotEmpty(response?.dataObject?.[type])) {
        if (type == 'RefreshMetaSuggestions') {
          setAlertInfo({ message: response.dataObject[type], type: ALERT_TYPE_SUCCESS });
          setRefreshLoading(false);
        }
        else {
          setSuggestions(response.dataObject);
        }
      }
      else {
        setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
        type != 'RefreshMetaSuggestions' && setSuggestions(null);
        setRefreshLoading(false);
      }
      type!= 'RefreshMetaSuggestions' && setSuggestionsLoading(false);
    }
    catch (err) {
      console.log(err);
      setSuggestions(null);
      setRefreshLoading(false);
      type!= 'RefreshMetaSuggestions' && setSuggestionsLoading(false);
      setAlertInfo({ message: err.message, type: ALERT_TYPE_ERROR })
    }
  }

  return (
    <React.Fragment>
      <Alert className="toast-container b-m" alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo} />
      <section className="admin-screen">
        <div className="border-bottom d-flex header justify-content-between p-3">
          <h5 className="mb-0 font-weight-bold">Meta Information</h5>
          <div>
            <button className="btn-link btn-block btn" title="Refresh Redis" onClick={() => { getMetaConfiguration('RefreshMetaSuggestions'); setRefreshLoading(true); }}>
              {refreshLoading ? <span class="spinner-border spinner-border-sm align-text-top mx-5" role="status" aria-hidden="true"></span> : <>Refresh All suggestions</>}
            </button>
          </div>
        </div>
        <div className="align-items-start d-flex justify-content-evenly py-3">
          <div className="col-3">
            <Nav vertical className="nav-vertical-seperator">
              {screens.map((screen, index) => {
                return (
                  <React.Fragment key={index}>
                    <NavItem className={currentActiveTab === screen.metaType && 'tab-active'}>
                      <NavLink className="p-0" onClick={() => { if (currentActiveTab !== screen.metaType) setCurrentActiveTab(screen.metaType); }}>
                        {screen.tabName}
                      </NavLink>
                    </NavItem>
                  </React.Fragment>
                );
              })}
            </Nav>
          </div>
          <div className="col-9">
            <TabContent activeTab={currentActiveTab}>
              {screens.map((screen, index) => {
                return (
                  <TabPane tabId={screen.metaType || ''}>
                    <div className="row">
                      <div className="col-sm-12">
                        {screen.metaType == currentActiveTab && <MetaConfigurationScreen title={title} keywords={keywords} description={description} prepareMetaKey={prepareMetaKey}
                          setDescription={setDescription} setKeywords={setKeywords} setTitle={setTitle} metaInput={metaInput} setMetaInput={setMetaInput} suggestionsLoading={suggestionsLoading}
                          screen={screen} key={index} suggestions={suggestions} metaKey={metaKey} setMetaKey={setMetaKey} getMetaTagDetails={getMetaTagDetails} />}
                      </div>
                    </div>
                  </TabPane>
                );
              })}
            </TabContent>
            <div className="row d-flex align-items-center justify-content-end">
              <div>
                <button type="button" title={'Clear'} onClick={() => { handleClear() }} className="brand-secondary btn px-5 rounded-pill custom-btn-lg">Clear</button>
              </div>
              <div>
                <button type="button" title={'Save Details'} onClick={() => { saveMetaDetail(); }} className="btn btn-brand-gradient rounded-pill px-5 ml-3 mr-3 custom-btn-lg">
                {isLoading ? <span class="spinner-border spinner-border-sm align-text-top mx-5" role="status" aria-hidden="true"></span> : <>Save Details</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>);

}

export default MetaConfigurationHome;