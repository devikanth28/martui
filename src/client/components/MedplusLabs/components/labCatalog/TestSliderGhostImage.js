import React from "react"
import { useSelector } from "react-redux";
import Validate from "../../../../helpers/Validate";

const TestSliderGhostImage = (props) => {
    const validate = Validate();
    const isSubscribed = useSelector(state => {
        if (validate.isNotEmpty(state.labCatalog) && validate.isNotEmpty(state.labCatalog.isSubscribed) && validate.isNotEmpty(state.userInfo) && validate.isNotEmpty(state.userInfo.userInfo)) {
            return state.labCatalog.isSubscribed;
        }
    })

    return (
        <React.Fragment>
            { ((props.isTitlesLoading == undefined) || props.isTitlesLoading) && <div  className="ph-row ph-item p-0 m-0 mb-2 bg-transparent d-flex align-items-center justify-content-between">
                <div className="ph-col-2 m-0" style={{"height":"1rem"}}></div>
                <div className="ph-col-1 m-0 rounded-pill" style={{"height":"2rem"}}></div>
            </div>}

            
            { ((props.isSectionLoading == undefined) || props.isSectionLoading) &&  <section className="shadow-none">
            <div className="home-page-slider-container d-flex justify-content-around px-4">
                {[1, 2, 3, 4, 5].map(() => {
                    return (
                        <React.Fragment>
                            <div className="test-card-ghostimage my-3">
                                <div className="test-card card mx-2">
                                    <div className="card-body p-2">
                                        <div className="d-flex justify-content-between">
                                            <div className="m-0 mb-4 p-0 ph-item ph-row w-100">
                                                <div className="ph-col-8 m-0" style={{"height":"1rem"}}></div>
                                            </div>
                                            <div className="ph-picture rounded-circle" style={{"height":"20px","width":"20px"}}></div>
                                        </div>
                                       {isSubscribed?
                                        <React.Fragment>
                                        <div className="d-flex justify-content-between">
                                            <div className="w-50">
                                                <div className="m-0 mb-3 p-0 ph-item ph-row">
                                                    <div className="ph-col-6 m-0"></div>
                                                </div>
                                                <div className="ph-row ph-item p-0 m-0">
                                                    <div className="ph-col-6 m-0"></div>
                                                </div>
                                            </div>
                                            <div className="p-0 ph-item ph-row w-50">
                                                <div className="m-0 ph-col-12 rounded-pill" style={{"height":"2.7rem"}}></div>
                                            </div>
                                        </div>
                                        </React.Fragment>
                                                :
                                                <React.Fragment>
                                                <div className="d-flex justify-content-between mb-4">
                                                    <div className="w-50">
                                                        <div className="m-0 mb-3 p-0 ph-item ph-row">
                                                            <div className="ph-col-6 m-0"></div>
                                                        </div>
                                                        <div className="ph-row ph-item p-0 m-0">
                                                            <div className="ph-col-6 m-0"></div>
                                                        </div>
                                                    </div>
                                                    <div className="p-0 ph-item ph-row w-50">
                                                        <div className="m-0 ph-col-12 rounded-pill" style={{ "height": "2.7rem" }}></div>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <div className="w-50">
                                                        <div className="m-0 mb-3 p-0 ph-item ph-row">
                                                            <div className="ph-col-6 m-0"></div>
                                                        </div>
                                                        <div className="ph-row ph-item p-0 m-0">
                                                            <div className="ph-col-6 m-0"></div>
                                                        </div>
                                                    </div>
                                                    <div className="p-0 ph-item ph-row w-50">
                                                        <div className="m-0 ph-col-12 rounded-pill" style={{ "height": "2.7rem" }}></div>
                                                    </div>
                                                </div>
                                    </React.Fragment>
                                    }
                                    </div>
                                    <div className="card-footer p-2 bg-white">
                                        <div className="ph-row ph-item p-0 mb-0">
                                            <div className="m-0 ph-col-12" style={{"height":"1rem"}}></div>
                                        </div>
                                        <div className="ph-row ph-item p-0 my-2">
                                            <div className="ph-col-12 m-0"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    )
                })}
            </div>
        </section> }
        </React.Fragment>
    )
}
export default TestSliderGhostImage;