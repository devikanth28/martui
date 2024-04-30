import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import CircleIcon from '../../images/common/info-circle-icn.png';
import { Modal, ModalHeader, ModalBody ,ModalFooter} from 'reactstrap';
import LocalitySearch from './LocalitySearch';
import { useEffect } from 'react';
import LocalityService from '../../services/LocalityService';
import Validate from '../../helpers/Validate';
import UserInfoAction from '../../../redux/action/UserInfoAction';

const ChangeLocality = (props)=> {

    const modal = props.modal;
    const validate = Validate();
    const userInfoAction = UserInfoAction();
    var userInfo = userInfoAction.getUserInfo();
    const localityService = LocalityService()
    const [searchType, setSearchType] = useState(props.selectedLocality.configType=='C'?'SelectCommunity':'SelectLocality');
    const [recentlySearchLocalities, setRecentSearchLocalities] = useState([]);

    useEffect(() => {
        if(modal && validate.isNotEmpty(userInfo) && validate.isNotEmpty(userInfo.userLoginId)){
            getRecentLocations();
        }
    }, [modal])

    const  getRecentLocations =()=> {
        localityService.getRecentlySearchLocality().then((response) => {
            if(response != null && "SUCCESS" == response.statusCode) {
                if(validate.isNotEmpty(response.dataObject)) {
                    setRecentSearchLocalities(response.dataObject);
                }
            } else if("FAILURE" == response.statusCode) {
                console.log("Error: "+ response.message);
            }
        }).catch((e) => {
            console.log(e);
        });
    }

    const closeLocalityModal = () => {
        props.toggle();
    }

    const setSelectedSearchType = (previous) =>{
        if(previous != searchType){
            setSearchType(previous);
        }
    }

    return (
        <React.Fragment>
            <Modal isOpen={modal} toggle={closeLocalityModal} id="address-change" modalClassName="slide address-change" tabIndex="-1" role="dialog" aria-labelledby="address-change" aria-hidden="false">
                {/* modalClassName="slide address-change" contentClassName="modal-content" */}
                <ModalHeader className="p-3" tag='div'>
                    <div className="d-flex mb-2">
                        <h3 className="font-weight-light mt-n2" id="address-changeLabel">
                            <small>Enter your</small><br/>
                            <span className="font-weight-normal">Delivery locality or Pincode</span>
                            <br/>
                            <small> to start shopping</small>
                        </h3>
                        <button type="button" className="close icons clear-icn" data-dismiss="modal" aria-label="Close" onClick={closeLocalityModal}>
                            <span aria-hidden="true"></span>
                        </button>
                    </div>
                    <div className="d-none mb-2">
                        <div className="custom-control custom-radio custom-control-inline mr-5">
                            <input type="radio" id="SelectLocality" name="AddressSelection" className="custom-control-input" checked={searchType === "SelectLocality"} onChange={() => setSelectedSearchType("SelectLocality")}/>
                            <label className="custom-control-label" htmlFor="SelectLocality">Select Locality</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="SelectCommunity" name="AddressSelection" className="custom-control-input"  checked={searchType === "SelectCommunity"} onChange={() => setSelectedSearchType("SelectCommunity")}/>
                            <label className="custom-control-label" htmlFor="SelectCommunity">Select Community</label>
                        </div>
                    </div>
                    {searchType === 'SelectLocality' && <LocalitySearch recentlySearchLocalities={recentlySearchLocalities} isLabPage = {props.isLabPage} closeLocalityModal={closeLocalityModal} isFromShoppingCart={props.isFromShoppingCart}/>} 
                   
                </ModalHeader>
                <ModalBody className="pt-0">
                   {/* <address className="active">
                        <p className="title mt-n1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><g transform="translate(-180.716 -143.312)"><rect width="24" height="24" transform="translate(180.716 143.312)" fill="none"/><g transform="translate(182.28 145.188)"><g transform="translate(4.764)"><path d="M192.306,145.186a5.377,5.377,0,1,0,5.377,5.377A5.382,5.382,0,0,0,192.306,145.186Zm0,9.528a4.152,4.152,0,1,1,4.151-4.152A4.156,4.156,0,0,1,192.306,154.714Z" transform="translate(-186.929 -145.186)" fill="#343a40"/></g><g transform="translate(0 10.818)"><path d="M188.533,155.748a5.739,5.739,0,0,0-4.492,2.1,7.923,7.923,0,0,0-1.764,4.985,2.378,2.378,0,0,0,2.375,2.375h15.53a2.378,2.378,0,0,0,2.375-2.375,7.938,7.938,0,0,0-1.787-5.009,5.916,5.916,0,0,0-6.487-1.755h0a6.212,6.212,0,0,1-3.754,0A6.366,6.366,0,0,0,188.533,155.748Zm11.65,8.237h-15.53a1.166,1.166,0,0,1-1.151-1.15A6.7,6.7,0,0,1,185,158.6a4.5,4.5,0,0,1,3.557-1.635,4.61,4.61,0,0,1,1.607.269,7.408,7.408,0,0,0,4.507,0,4.694,4.694,0,0,1,5.16,1.391,6.7,6.7,0,0,1,1.5,4.232A1.154,1.154,0,0,1,200.184,163.985Z" transform="translate(-182.278 -155.747)" fill="#343a40"/></g></g></g></svg>
                            sampath kumar 
                            <small>
                                MedPlus Id: 111941
                            </small>
                        </p>
                        <p className="title">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g transform="translate(-48.807 -143.086)"><rect width="24" height="24" transform="translate(48.807 143.086)" fill="none"/><g transform="translate(53.785 145.081)"><path d="M61.016,148.6a3.4,3.4,0,1,0,3.405,3.4A3.4,3.4,0,0,0,61.016,148.6Zm0,5.513a2.108,2.108,0,1,1,2.108-2.108A2.111,2.111,0,0,1,61.016,154.116Z" transform="translate(-53.808 -145.095)" fill="#343a40"/><path d="M66.262,147.159a7,7,0,0,0-5.134-2.073h-.2a7.018,7.018,0,0,0-5.177,2.073,7.152,7.152,0,0,0-1.132,8.253,88.446,88.446,0,0,0,6.369,9.622,86.524,86.524,0,0,0,6.406-9.622A7.152,7.152,0,0,0,66.262,147.159Zm-.016,7.65a74.245,74.245,0,0,1-5.254,8.05,76.1,76.1,0,0,1-5.225-8.05,5.853,5.853,0,0,1,.924-6.755,5.6,5.6,0,0,1,4.238-1.671h.2a5.621,5.621,0,0,1,4.194,1.671A5.853,5.853,0,0,1,66.246,154.809Z" transform="translate(-53.798 -145.086)" fill="#343a40"/></g></g></svg>
                            Address:
                            <small>
                                Sy No.80 to 84, Near Ratnadeep Supermarket, Patrika Nagar, Madhapur, Hyderabad, Telangana 500081
                            </small>
                        </p>
                        <p className="title">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g transform="translate(-180.178 -178.33)"><rect width="24" height="24" transform="translate(180.178 178.33)" fill="none"/><g transform="translate(182.178 182.718)"><path d="M199.735,182.719H184.624a2.448,2.448,0,0,0-2.446,2.446v10.328a2.447,2.447,0,0,0,2.446,2.445h15.107a2.446,2.446,0,0,0,2.445-2.445V185.169A2.445,2.445,0,0,0,199.735,182.719Zm1.328,12.773a1.33,1.33,0,0,1-1.328,1.328H184.624a1.329,1.329,0,0,1-1.328-1.328V185.169a1.328,1.328,0,0,1,1.328-1.328h15.107a1.329,1.329,0,0,1,1.328,1.328v10.324Z" transform="translate(-182.178 -182.719)" fill="#343a40"/><path d="M194.791,190.2l4.89-4.386a.559.559,0,1,0-.749-.831l-6.744,6.053-1.316-1.175s-.009-.009-.009-.013a.749.749,0,0,0-.091-.078l-5.354-4.791a.559.559,0,1,0-.744.835l4.948,4.423-4.928,4.613a.562.562,0,0,0-.025.791.572.572,0,0,0,.41.178.562.562,0,0,0,.381-.149l5-4.68,1.357,1.213a.561.561,0,0,0,.373.141.555.555,0,0,0,.372-.145l1.395-1.25,4.973,4.725a.559.559,0,0,0,.77-.811Z" transform="translate(-182.178 -182.719)" fill="#343a40"/></g></g></svg>
                            Email Address:
                            <small>
                                sam@medplusindia.com
                            </small>
                        </p>
                        <p className="title">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g transform="translate(-180.438 -213.832)"><rect width="24" height="24" transform="translate(180.438 213.832)" fill="none"/><g transform="translate(182.199 215.78)"><g transform="translate(0 1.429)"><path d="M185.394,217.171a2.043,2.043,0,0,0-.705.124,3.87,3.87,0,0,0-.728.361l-.369.26a3.029,3.029,0,0,0-.264.236,3.822,3.822,0,0,0-.979,1.742c-.771,2.889,1.118,7.237,4.7,10.82,3,3,6.621,4.87,9.442,4.87a5.349,5.349,0,0,0,1.377-.171,3.8,3.8,0,0,0,1.738-.975,2.837,2.837,0,0,0,.265-.3l.262-.374a3.9,3.9,0,0,0,.334-.689,2.167,2.167,0,0,0-.821-2.518l-2.625-1.833a2.261,2.261,0,0,0-3.063.546l-.509.731-.126-.089a24.713,24.713,0,0,1-5.47-5.468l-.089-.127.732-.51a2.2,2.2,0,0,0,.545-3.063l-1.832-2.624A2.229,2.229,0,0,0,185.394,217.171Zm11.1,17.253c-2.524,0-5.828-1.735-8.623-4.53-3.246-3.247-5.057-7.237-4.4-9.7a2.668,2.668,0,0,1,.678-1.22,1.807,1.807,0,0,1,.135-.126l.318-.225a2.535,2.535,0,0,1,.493-.24,1.03,1.03,0,0,1,1.162.4l1.831,2.622a1.042,1.042,0,0,1-.257,1.449l-1.193.833a.576.576,0,0,0-.16.783,24.809,24.809,0,0,0,6.813,6.815.585.585,0,0,0,.785-.16l.833-1.195a1.071,1.071,0,0,1,1.447-.257l2.624,1.833a1.006,1.006,0,0,1,.4,1.163l-.007.017a2.439,2.439,0,0,1-.206.435l-.223.321a1.537,1.537,0,0,1-.156.173,2.649,2.649,0,0,1-1.219.677A4.167,4.167,0,0,1,196.492,234.424Z" transform="translate(-182.178 -217.171)" fill="#343a40"/></g><g transform="translate(9.963)"><path d="M192.615,215.757a.58.58,0,0,0-.034,1.158,9.141,9.141,0,0,1,8.548,8.546.589.589,0,0,0,.621.543.579.579,0,0,0,.537-.615,10.284,10.284,0,0,0-3-6.636h0a10.28,10.28,0,0,0-6.634-3Z" transform="translate(-192.036 -215.757)" fill="#343a40"/></g><g transform="translate(8.736 3.129)"><path d="M191.427,218.853a.611.611,0,0,0-.6.544.58.58,0,0,0,.145.419.572.572,0,0,0,.4.2h0a6.708,6.708,0,0,1,6.274,6.275.589.589,0,0,0,.621.541h0a.578.578,0,0,0,.536-.613,7.869,7.869,0,0,0-7.362-7.36Z" transform="translate(-190.822 -218.853)" fill="#343a40"/></g></g></g></svg>
                            Mobile Number:
                            <small>
                                +91 849 805 6464
                            </small>
                            </p>
                </address>*/}
                </ModalBody>
                {searchType === 'SelectLocality' ?
                <ModalFooter className="general-note">
                    <img src={CircleIcon} alt="Note" title='' />
                    <ul>
                        <li>Selection of service locality / pincode is required to place an order. Our Default locality is Balanagar, Hyderabad.</li>
                    </ul>
                </ModalFooter> :
                <ModalFooter className="general-note">
                    <img src={CircleIcon} alt="Note" title='' />
                    <ul>
                        <li>Note: To know more about how community delivery works <Link className="text-info" to="/community-delivery">Click Here</Link></li>
                    </ul>
                </ModalFooter>
                }
            </Modal>
        </React.Fragment>
    )
}

export default ChangeLocality
