import React from "react";
import PurchaseHistoryIcon from '../../../images/common/purchasehistory_color_icon_44px.svg'
import FrequentlyOrderIcon from '../../../images/common/Frequently_ordered_44px.svg'
import MyHealthRecordsIcon from '../../../images/common/healthrecords_color_icon_44px.svg'
import RefillIcon from '../../../images/common/refill-icn-44.svg';
import MyAccountGhost from "./HomePagePlaceholders/MyAccountGhost";
const MyAccount = (props) => {
    return (
        <React.Fragment>
            <div className="mb-3">
                <div className="mb-3">
                    <h5 className="mb-0">My Profile</h5>
                </div>
                <section className="p-4 shadow-none">
                    <div className="row  My-account">
                        <div className="col"><div className="card">
                            <div className="card-body p-3"><div className="d-flex justify-content-between">
                                <div className="align align-items-center d-flex" role="button">
                                    <span className="mr-3"><img src={PurchaseHistoryIcon} role="img" alt="My Purchases" /></span><div>
                                        <h6 className="font-14">My Purchases</h6>
                                        <p className="text-secondary mb-0 small">View all the purchases</p>
                                    </div>
                                </div>
                                <div className="my-auto"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g id="rightchevron_black_icon_24px" transform="translate(-906.838 786) rotate(-90)"><rect id="Rectangle_4721" data-name="Rectangle 4721" width="24" height="24" transform="translate(762 906.838)" fill="none"></rect><path id="Path_23400" data-name="Path 23400" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)" fill="#080808"></path></g></svg></div>
                            </div>
                            </div>
                        </div></div>
                        <div className="col"><div className="card">
                            <div className="card-body p-3"><div className="d-flex justify-content-between">
                                <div className="align align-items-center d-flex" role="button">
                                    <span className="mr-3"><img src={FrequentlyOrderIcon} role="img" alt="My Purchases" /></span><div>
                                        <h6 className="font-14">Frequently Ordered List</h6>
                                        <p className="text-secondary mb-0 small">Re-Order from saved products</p>
                                    </div>
                                </div>
                                <div className="my-auto"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g id="rightchevron_black_icon_24px" transform="translate(-906.838 786) rotate(-90)"><rect id="Rectangle_4721" data-name="Rectangle 4721" width="24" height="24" transform="translate(762 906.838)" fill="none"></rect><path id="Path_23400" data-name="Path 23400" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)" fill="#080808"></path></g></svg></div>
                            </div>
                            </div>
                        </div></div>
                        <div className="col"><div className="card">
                            <div className="card-body p-3"><div className="d-flex justify-content-between">
                                <div className="align align-items-center d-flex" role="button">
                                    <span className="mr-3"><img src={MyHealthRecordsIcon} role="img" alt="My Purchases" /></span><div>
                                        <h6 className="font-14">My Health Records</h6>
                                        <p className="text-secondary mb-0 small">View all the health records</p>
                                    </div>
                                </div>
                                <div className="my-auto"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g id="rightchevron_black_icon_24px" transform="translate(-906.838 786) rotate(-90)"><rect id="Rectangle_4721" data-name="Rectangle 4721" width="24" height="24" transform="translate(762 906.838)" fill="none"></rect><path id="Path_23400" data-name="Path 23400" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)" fill="#080808"></path></g></svg></div>
                            </div>
                            </div>
                        </div></div>
                        <div className="col"><div className="card">
                            <div className="card-body p-3"><div className="d-flex justify-content-between">
                                <div className="align align-items-center d-flex" role="button">
                                    <span className="mr-3"><img src={RefillIcon} alt="My Purchases" role="img" /></span><div>
                                        <h6 className="font-14">My Refills</h6>
                                        <p className="text-secondary mb-0 small">See all the refills status</p>
                                    </div>
                                </div>
                                <div className="my-auto"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g id="rightchevron_black_icon_24px" transform="translate(-906.838 786) rotate(-90)"><rect id="Rectangle_4721" data-name="Rectangle 4721" width="24" height="24" transform="translate(762 906.838)" fill="none"></rect><path id="Path_23400" data-name="Path 23400" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)" fill="#080808"></path></g></svg></div>
                            </div>
                            </div>
                        </div></div>
                    </div>
                </section>
            </div>
            <MyAccountGhost />
        </React.Fragment>
    )
}
export default MyAccount