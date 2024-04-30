import React, { useState, useEffect } from 'react'
import ApplePlayStore from '../../../../../images/common/App_Store-cssbg.svg'
import GooglePlayStore from '../../../../../images/common/Google_Play_Store-cssbg.svg'

const DownloadAddBanner = () =>{
    return (
        <React.Fragment>
            <section className='bg-primary-gradient px-4 py-3 mb-4 d-flex justify-content-between align-items-center'>
                <div className='align-items-center d-flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                        <g transform="translate(-518.102 -807.914)">
                            <rect fill="none" width="40" height="40" transform="translate(518.102 807.914)"></rect>
                            <g transform="translate(522.759 807.914)">
                                <rect fill="#fff" width="1.331" height="1.331" transform="translate(14.678 34.678)"></rect>
                                <rect fill="#fff" width="1.331" height="1.331" transform="translate(14.678 1.996)"></rect>
                                <path fill="#fff" d="M552.288,827.247a6.637,6.637,0,0,0-3.335-5.741V811.247a3.339,3.339,0,0,0-3.335-3.333H528.273a3.339,3.339,0,0,0-3.335,3.333v12.416a5.311,5.311,0,0,0,0,9.859V844.58a3.338,3.338,0,0,0,3.335,3.333h17.344a3.338,3.338,0,0,0,3.335-3.333V832.99A6.639,6.639,0,0,0,552.288,827.247Zm-26.017-16a2,2,0,0,1,2-2h17.344a2,2,0,0,1,2,2v.667H526.272Zm0,2h21.347v7.673a6.33,6.33,0,0,0-3.788-.1,6.673,6.673,0,0,0-12.037-.832,4.666,4.666,0,0,0-5.331,3.276c-.067.007-.125.029-.191.037Zm21.347,29.333h-8.672v1.333h8.672v.667a2,2,0,0,1-2,2H528.273a2,2,0,0,1-2-2v-.667h8.672V842.58h-8.672v-8.729a5.233,5.233,0,0,0,.667.063h18.679a6.588,6.588,0,0,0,2-.339Zm-2-10H526.939a4,4,0,1,1,.06-8,.667.667,0,0,0,.658-.557,3.315,3.315,0,0,1,3.285-2.776,3.4,3.4,0,0,1,1.007.156.668.668,0,0,0,.809-.361,5.338,5.338,0,0,1,10.006.807.665.665,0,0,0,.818.468.632.632,0,0,0,.08-.027,5.115,5.115,0,0,1,1.956-.376,5.333,5.333,0,1,1,0,10.667Z" transform="translate(-521.602 -807.914)"></path>
                                <path fill="#fff" d="M534.585,824.792v-6.377h-1.331v6.377l-1.687-1.687-.941.941,3.293,3.293,3.293-3.293-.941-.941Z" transform="translate(-518.577 -804.406)"></path>
                            </g>
                        </g>
                    </svg>
                    <div className='ml-4'>
                        <h6 className='mb-0 text-white'>Download our app now</h6>
                        <p className='mb-0 text-white font-14'>Now Order Pharmacy & Health Store Products from mobile!</p>
                    </div>
                </div>
                <div>
                    <a href="https://play.google.com/store/apps/details?id=com.medplus.mobile.android" className='mr-3' target="_blank" rel="noopener">
                        <img src = {GooglePlayStore} alt="Apple PlayStore" />    
                    </a>
                    <a href="https://itunes.apple.com/us/app/medplus-drug-directory-store/id1070265254?mt=8" target="_blank" rel="noopener">
                        <img src = {ApplePlayStore} alt="Apple PlayStore" />    
                    </a>
                </div>
            </section>
        </React.Fragment>
    )
}

export default DownloadAddBanner