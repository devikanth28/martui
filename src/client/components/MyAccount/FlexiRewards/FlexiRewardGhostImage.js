import React from 'react';


const FlexiRewardGhostImage = (props) => {
    return(
        <React.Fragment>
            { props.FAQLoader && <section>
                <div className="ph-item mb-0 border-0 px-0 pb-0">
                    <div className="px-0">
                        <div className="ph-row">
                            <div className="ph-picture " style={{'height':'13.875rem'}}></div>
                        </div>
                    </div>
                </div>
                {[1,2,3,4,5].map(()=>{
                    return(
                        <div class="border rounded">
                        <div class="row mx-0 py-3">
                           <div class="col-10">
                              <div class="ph-item mb-0 pt-3 pl-0">
                                 <div class="px-0">
                                    <div class="ph-row mb-0">
                                       <div class="ph-col-4 mb-4" style={{"height": "1.5rem"}}></div>
                                       <div class="ph-col-8 empty"></div>
                                       <div class="mb-2 ph-col-10"></div>
                                       <div class="mb-2 ph-col-10"></div>
                                       <div class="mb-2 ph-col-4"></div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="col-2">
                              <div class="px-0">
                                 <div class="ph-row mb-0">
                                    <div class="ph-picture mb-0" style={{"height":"7.5rem","width":"8.125rem"}}></div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                    )
                })}
            </section>}
            {props.redeemRewardLoader && <section>
                <div className='body pt-2 redeem-reward'>
                    <div className="point-summary d-flex" style={{ "background": "none" }}>
                        <div className="p-0 ph-item ph-row" style={{ "width": "7.75rem" }}>
                            <div className="mb-0 ph-picture" style={{ "height": "7.188rem" }}></div>
                        </div>
                        <div className="ph-row ph-item ml-5 p-0 w-100"><div className="ph-col-4" style={{ "height": "1.5rem" }}></div>
                            <div className="ph-col-8 empty"></div><div className="ph-col-6" style={{ "height": "1rem" }}></div>
                        </div></div>
                    <div className='d-flex mb-3 scrollmenu'>
                        {[1, 2, 3].map(() => {
                            return (
                                <div className="m-2 mb-0 p-0 ph-item ph-row" style={{ "width": "4.875rem" }}>
                                    <div className="mb-0 ph-picture" style={{ "height": "1.5rem", "border-radius": "1.375rem" }}></div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='row m-0 px-2'>
                        {[1, 2, 3, 4, 5, 6].map(() => {
                            return (
                                <div className="each-reward payback">
                                    <div className="card p-2">
                                        <div className="photo">
                                            <div className="mx-auto p-0 ph-item ph-row" style={{ "width": "5.75rem" }}>
                                                <div className="mt-3 ph-picture" style={{ "height": "5.188rem" }}></div>
                                            </div>
                                        </div>
                                        <div className="card-title ph-row ph-item p-0">
                                            <div className="ph-col-6" style={{ "height": "1rem" }}></div>
                                        </div>
                                        <div className="py-1 ph-row ph-item p-0">
                                            <div className="ph-col-4"></div>
                                        </div>
                                        <div className="mb-1">
                                            <div className="mb-0 p-0 ph-item ph-row py-1">
                                                <div className="mb-0 ph-col-4"></div>
                                            </div>
                                            <div className="mt-1 p-0 ph-item ph-row">
                                                <div className="ph-col-6" style={{ "height": "1rem" }}></div>
                                            </div>
                                        </div>
                                        <div className="mb-0 p-0 ph-item ph-row">
                                            <div className="mb-0 ph-picture" style={{ "height": "2rem" }}></div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="ph-item p-0 ph-row mx-3">
                        <div className="ph-col-12" style={{ "height": "2rem" }}></div>
                    </div>
                </div>
            </section>}

            {props.redeemRewardOnlyProductsLoader && <section>
                <div className='body pt-2 redeem-reward'>
                    <div className='row m-0 px-2'>
                        {[1, 2, 3, 4, 5, 6].map(() => {
                            return (
                                <div className="each-reward payback">
                                    <div className="card p-2">
                                        <div className="photo">
                                            <div className="mx-auto p-0 ph-item ph-row" style={{ "width": "5.75rem" }}>
                                                <div className="mt-3 ph-picture" style={{ "height": "5.188rem" }}></div>
                                            </div>
                                        </div>
                                        <div className="card-title ph-row ph-item p-0">
                                            <div className="ph-col-6" style={{ "height": "1rem" }}></div>
                                        </div>
                                        <div className="py-1 ph-row ph-item p-0">
                                            <div className="ph-col-4"></div>
                                        </div>
                                        <div className="mb-1">
                                            <div className="mb-0 p-0 ph-item ph-row py-1">
                                                <div className="mb-0 ph-col-4"></div>
                                            </div>
                                            <div className="mt-1 p-0 ph-item ph-row">
                                                <div className="ph-col-6" style={{ "height": "1rem" }}></div>
                                            </div>
                                        </div>
                                        <div className="mb-0 p-0 ph-item ph-row">
                                            <div className="mb-0 ph-picture" style={{ "height": "2rem" }}></div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="ph-item p-0 ph-row mx-3">
                        <div className="ph-col-12" style={{ "height": "2rem" }}></div>
                    </div>
                </div>
            </section>}

            { props.redeemRewardProductLoader && 
                <React.Fragment>
                    <div className="each-reward">
                        <div className="card">
                            <div className="ph-item mb-0 pt-3 pb-0">
                                <div className="px-0">
                                    <div className="ph-row mb-0">
                                        <div className="ph-picture mb-0 mx-auto" style={{'height': '87px','width': '94px'}}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="ph-item mb-0 pt-1 pb-2">
                                <div className="px-0">
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-12"></div>
                                        <div className="ph-col-6 mb-3"></div>
                                        <div className="ph-col-6 empty mb-3"></div>
                                        <div className="ph-col-4 mb-3"></div>
                                        <div className="ph-col-8 empty mb-3"></div>
                                        <div className="ph-col-2 mb-3"></div>
                                        <div className="ph-col-8 empty mb-3"></div>
                                        <div className="ph-col-2 mb-3"></div>
                                        <div className="ph-col-4"></div>
                                        <div className="ph-col-4 empty"></div>
                                        <div className="ph-col-4"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="each-reward">
                        <div className="card">
                            <div className="ph-item mb-0 pt-3 pb-0">
                                <div className="px-0">
                                    <div className="ph-row mb-0">
                                        <div className="ph-picture mb-0 mx-auto" style={{'height': '87px','width': '94px'}}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="ph-item mb-0 pt-1 pb-2">
                                <div className="px-0">
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-12"></div>
                                        <div className="ph-col-6 mb-3"></div>
                                        <div className="ph-col-6 empty mb-3"></div>
                                        <div className="ph-col-4 mb-3"></div>
                                        <div className="ph-col-8 empty mb-3"></div>
                                        <div className="ph-col-2 mb-3"></div>
                                        <div className="ph-col-8 empty mb-3"></div>
                                        <div className="ph-col-2 mb-3"></div>
                                        <div className="ph-col-4"></div>
                                        <div className="ph-col-4 empty"></div>
                                        <div className="ph-col-4"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            }
            { props.rewardSummaryLoader && 
                <section class="body-height">
                    <div class="d-flex justify-content-between p-3">
                        <p class="mb-0">
                            <strong>Detailed History</strong><br />
                        </p>
                        <div style={{ 'width': '270px' }} class="mb-0">
                            <div class="ph-item mb-3 p-0">
                                <div class="p-0">
                                    <div class="ph-row mb-0">
                                        <div class="ph-col-12 mb-0"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="ph-item mb-0 d-non p-0">
                                <div class="p-0">
                                    <div class="ph-row mb-0">
                                        <div class="ph-col-2 mb-0 empty"></div>
                                        <div class="ph-col-10 mb-0"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {[1,2,3,4,5,6,7,8].map(()=>{
                        return(
                            <div class="card mx-3 d-block p-1 mb-3 shadow-sm">
                                <div class="ph-item mb-0 py-3">
                                    <div class="ph-col-1 p-0">
                                        <div class="ph-picture mb-0" style={{ "height": "2.75rem", "width": "2.75rem" }}></div>
                                    </div>
                                    <div class="">
                                        <div class="mb-0 ph-row pt-1">
                                            <div class="ph-col-1 empty"></div>
                                            <div class="ph-col-1"></div>
                                            <div class="ph-col-2 empty"></div>
                                            <div class="ph-col-2"></div>
                                            <div class="ph-col-2 empty"></div>
                                            <div class="ph-col-1"></div>
                                            <div class="ph-col-2 empty"></div>
                                            <div class="ph-col-1"></div>
                                        </div>
                                        <div class="mb-0 ph-row pt-1">
                                            <div class="ph-col-1 empty"></div>
                                            <div class="ph-col-1"></div>
                                            <div class="ph-col-2 empty"></div>
                                            <div class="ph-col-2"></div>
                                            <div class="ph-col-2 empty"></div>
                                            <div class="ph-col-1"></div>
                                            <div class="ph-col-2 empty"></div>
                                            <div class="ph-col-1"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                   
                 
                </section>
            }
        </React.Fragment>
    )
}

export default FlexiRewardGhostImage;