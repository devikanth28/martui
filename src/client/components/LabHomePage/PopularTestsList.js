import React from "react"
import Validate from '../../helpers/Validate';
const PopularTestsList =(props)=>{
    const validate = Validate();
    function getTestList(testList) {
        return(
            testList.map((each,index) => {
                return (
                    <React.Fragment>
                        <div className={index == 0 ? "d-flex justify-content-between align-items-center pb-3" : index == testList.length -1 ? "d-flex justify-content-between align-items-center border-top pt-3" :"d-flex justify-content-between align-items-center border-top py-3"}>
                            <div>
                                <h6 className="mb-2">{each.title}</h6>
                                {validate.isNotEmpty(props.showPrice) && props.showPrice && <p className="mb-0 font-14">&#x20B9;&nbsp;{each.price}</p>}
                                {validate.isNotEmpty(props.showIncludeParameters) && props.showIncludeParameters && <p className="mb-0 small text-secondary">Includes {each.includedParameters} Parameters</p>}
                            </div>
                            <button className="btn brand-secondary border-0" role="button">Add to Cart</button>
                        </div>
                    </React.Fragment>
                );
            })
        )
    }
    return(
        <React.Fragment>
            <h5 className="mb-3">{props.sectionTitle}</h5>
            <div className="mb-3 pb-3">
                <section className="shadow-none">
                    <div className="p-3">
                        {getTestList(props.testList)}
                    </div>
                </section>
            </div>

            {/* Ghost Images Here */}
            <div className="d-none">
                <div className="ph-row mb-3 w-100">
                    <div className="ph-col-6"></div>
                </div>
                <div className="mb-3 pb-3">
                    <section className="shadow-none p-3">
                        <div className="pb-3">
                            <div className="d-flex justify-content-between align-items-center py-3">
                                <div className="w-75">
                                    <div className="ph-row mb-3">
                                        <div className="ph-col-6"></div>
                                    </div>
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-2"></div>
                                    </div>
                                </div>
                                <div className="w-25">
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-12"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pb-3">
                            <div className="d-flex justify-content-between align-items-center border-top py-3">
                                <div className="w-75">
                                    <div className="ph-row mb-3">
                                        <div className="ph-col-6"></div>
                                    </div>
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-2"></div>
                                    </div>
                                </div>
                                <div className="w-25">
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-12"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pb-3">
                            <div className="d-flex justify-content-between align-items-center border-top py-3">
                                <div className="w-75">
                                    <div className="ph-row mb-3">
                                        <div className="ph-col-6"></div>
                                    </div>
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-2"></div>
                                    </div>
                                </div>
                                <div className="w-25">
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-12"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pb-3">
                            <div className="d-flex justify-content-between align-items-center border-top py-3">
                                <div className="w-75">
                                    <div className="ph-row mb-3">
                                        <div className="ph-col-6"></div>
                                    </div>
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-2"></div>
                                    </div>
                                </div>
                                <div className="w-25">
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-12"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pb-3">
                            <div className="d-flex justify-content-between align-items-center border-top py-3">
                                <div className="w-75">
                                    <div className="ph-row mb-3">
                                        <div className="ph-col-6"></div>
                                    </div>
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-2"></div>
                                    </div>
                                </div>
                                <div className="w-25">
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-12"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pb-3">
                            <div className="d-flex justify-content-between align-items-center border-top py-3">
                                <div className="w-75">
                                    <div className="ph-row mb-3">
                                        <div className="ph-col-6"></div>
                                    </div>
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-2"></div>
                                    </div>
                                </div>
                                <div className="w-25">
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-12"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pb-3">
                            <div className="d-flex justify-content-between align-items-center border-top py-3">
                                <div className="w-75">
                                    <div className="ph-row mb-3">
                                        <div className="ph-col-6"></div>
                                    </div>
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-2"></div>
                                    </div>
                                </div>
                                <div className="w-25">
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-12"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pb-3">
                            <div className="d-flex justify-content-between align-items-center border-top py-3">
                                <div className="w-75">
                                    <div className="ph-row mb-3">
                                        <div className="ph-col-6"></div>
                                    </div>
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-2"></div>
                                    </div>
                                </div>
                                <div className="w-25">
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-12"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>
                </div>

            </div>

        </React.Fragment>
    )
}
export default PopularTestsList