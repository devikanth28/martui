import React from 'react';

const TabHeader = (props) =>{

    return(
        <section class="mb-0">
            <div class="header p-0 mb-0">
            <ul class="nav nav-pills" id="pills-tab" role="tablist">
                <li class="nav-item border-0">
                    <a class="nav-link active py-3" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">My Wallet</a>
                </li>
                <li class="nav-item border-0">
                    <a class="nav-link py-3" id="pills-profile-tab" data-toggle="pill" href="#pills-profile4" role="tab" aria-controls="pills-profile" aria-selected="false">Wallet History</a>
                </li>
                <li class="nav-item border-0">
                    <a class="nav-link py-3" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">How it works</a>
                </li>
                <li class="nav-item border-0">
                    <a class="nav-link py-3" id="pills-profile-tab" data-toggle="pill" href="#pills-profile2" role="tab" aria-controls="pills-profile" aria-selected="false">Frequently Asked Questions</a>
                </li>
                <li class="nav-item border-0">
                    <a class="nav-link py-3" id="pills-profile-tab" data-toggle="pill" href="#pills-profile3" role="tab" aria-controls="pills-profile" aria-selected="false">FlexiCash Catalog</a>
                </li>
            </ul>
            </div>
        </section>
    )
}

export default TabHeader;