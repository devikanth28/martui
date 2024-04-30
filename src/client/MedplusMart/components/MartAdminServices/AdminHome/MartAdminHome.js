import React from 'react';
import LocalDB from '../../../../DataBase/LocalDB';

const MartAdminHome = (props) => {

    const MART_CATALOG_API_URL = "/mart-catalog-api";
    const MY_PROFILE_CONST="/my-profile"
    const ADMIN = "/admin";
    const LAB_CATALOG = "/labcatalog";
    const DOCTORS_API = "/doctors-api";
    const MART_COMMON_API_URL = "mart-common-api";
    
    let token_from_LocalStorage = LocalDB.getValue("SESSIONID");

    const martketingAdminData = {
        "Meta Tags": [
            {
                title: "Provide All Meta Information",
                redirectTo: "/configureMetaInformation",
                target: ""
            }
        ]
    }
    
    const data = {
        "Meta Tags": [
            {
                title: "Provide All Meta Information",
                redirectTo: "/configureMetaInformation",
                target: ""
            }
        ],

        "Customers": [
            {
                title: "Re-index Customers",
                redirectTo: "/reindexCustomers",
                target: ""
            },
            {
                title: "Configure Customer Promotion",
                redirectTo: "/martCustomerPromotion",
                target: ""
            },
            {
                title: "Push Customer Details in Queue",
                redirectTo: "/pushCustomerDetailsInQueue",
                target: ""
            }
        ],
        "Footer": [
            {
                title: "Generate Lab and Doctors Categories for Footer",
                redirectTo: "/footerForLabsAndDoctors",
                target: ""
            }

        ],
        "Token": [
            {
                title: "Get Token Details",
                redirectTo: "/getTokenDetails",
                target: ""
            },
            {
                title: "Get Customer Token Details",
                redirectTo: "/getCustomerDetails",
                target: ""
            }
        ],
        "Sitemaps for Urls": [
            {
                title: "Sitemap Generator",
                redirectTo: MART_CATALOG_API_URL + ADMIN + `/sitemapGenerator?tokenId=${token_from_LocalStorage}`,
                target: "_blank"
            },
            {
                title: "Sitemap for Diagnostics",
                redirectTo: LAB_CATALOG + ADMIN + `/sitemapGeneratorForLab?tokenId=${token_from_LocalStorage}`,
                target: "_blank"
            },
            {
                title: "Sitemap for Doctors",
                redirectTo: DOCTORS_API + ADMIN + `/generateDoctorsSiteMap?tokenId=${token_from_LocalStorage}`,
                target: "_blank"
            }
        ],
        "Sitemaps for Static pages": [
            {
                title: "Sitemap for Products",
                redirectTo: MART_CATALOG_API_URL + ADMIN + `/generateSitemapForProducts?tokenId=${token_from_LocalStorage}`,
                target: "_blank"
            },
            {
                title: "Sitemap for Brands",
                redirectTo: MART_CATALOG_API_URL + ADMIN + `/generateSitemapForBrands?tokenId=${token_from_LocalStorage}`,
                target: "_blank"
            }
        ],
        "Redis": [
            {
                title: "Push Category Meta Information to Redis",
                redirectTo: MART_CATALOG_API_URL + ADMIN + `/pushMetaInfoIntoRedis?tokenId=${token_from_LocalStorage}`,
                target: "_blank"
            },
            {
                title: "Push Health Record Type to Redis",
                redirectTo: MY_PROFILE_CONST + ADMIN + `/pushRecordTypeToRedis?tokenId=${token_from_LocalStorage}`,
                target: "_blank"
            },
            {
                title: "Store Redis Configuration",
                redirectTo: MART_CATALOG_API_URL + ADMIN + `/storeRedisConfiguration?tokenId=${token_from_LocalStorage}`,
                target: "_blank"
            },
            {
                title: "Refresh Redis Configuration",
                redirectTo: MART_CATALOG_API_URL + ADMIN + `/refreshRedisConfiguration?tokenId=${token_from_LocalStorage}`,
                target: "_blank"
            },
            {
                title: "Push Order Service Masters to Redis",
                redirectTo: "/secure/pushOrderSerivceConfToRedis.mart",
                target: "_blank"
            },
            {
                title: "Refresh Relationship Types",
                redirectTo:  MART_COMMON_API_URL + ADMIN + `/refreshRelationshipTypes?tokenId=${token_from_LocalStorage}`,
                target: "_blank"
            },
            {
                title: "Refresh KYC Types",
                redirectTo: MART_COMMON_API_URL + ADMIN + `/refreshKYCTypes?tokenId=${token_from_LocalStorage}`,
                target: "_blank"
            },
            {
                title: "Refresh Categories",
                redirectTo: MART_CATALOG_API_URL + ADMIN + `/refreshCategories?tokenId=${token_from_LocalStorage}`,
                target: "_blank"
            },
            {
                title: "Configure Redis Key",
                redirectTo: "/configureRedisKey",
                target: ""
            }
        ],
        "Common": [
            {
                title: "Admin User Configuration",
                redirectTo: "/adminUserConfiguration",
                target: ""
            },
            {
                title: "Generate Main Navigation",
                redirectTo: "/generateMainNavigationForCatalog",
                target: ""
            },
            {
                title: "Configure Up Sell Products Heading for Shopping Cart",
                redirectTo: "/configureUpsellProductsHeading",
                target: ""
            },
            {
                title: "Unsubscribe from Refill Services",
                redirectTo: "/unSubscribeFromRefill",
                target: ""
            },
            {
                title: "Holidays ETA Configuration",
                redirectTo: "/holidaysETAConfiguration",
                target: ""
            },
            {
                title: "Emergency Message Configuration",
                redirectTo: "/emergencyMessageConfiguration",
                target: ""
            },
            {
                title: "Show Locality Details",
                redirectTo: "/localityInfo",
                target: ""
            },
            {
                title: "Get Product Discount Details",
                redirectTo: "/productDiscountDetail",
                target: ""
            },
            {
                title: "Product Stock Details",
                redirectTo: "/getStockDetails",
                target: ""
            },
            {
                title: "Version Configuration",
                redirectTo: "/martVersions",
                target: ""
            }
        ]
    }

    if(props.isLoading) {
        return <React.Fragment />
    }

    const prepareHtml = () => {
        return Object.entries(props.isMarketingAdmin  ? martketingAdminData : data).map(([eachItem, value]) => {
            return (
                <div className='each-card'>
                    <div className='card mb-2 w-100'>
                        <div className='card-header font-weight-bold'>
                            {eachItem}
                        </div>
                        <ul className='list-group list-group-flush'>
                            {value.map((each) => {
                                return (
                                    <li className='list-group-item'>
                                        <a href={each.redirectTo} className='d-flex justify-content-between w-100' target={each.target} title={each.title}>{each.title}
                                            <span>
                                                {each.target == "_blank" ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                                    <g id="link-open-icn-16" transform="translate(-180.258 -387.452)">
                                                        <rect id="Rectangle_3299" data-name="Rectangle 3299" width="16" height="16" rx="3" transform="translate(180.258 387.452)" fill="none" />
                                                        <path id="Subtraction_86" data-name="Subtraction 86" d="M1427.6-7871h-4.565v-.946h4.565a1.457,1.457,0,0,0,1.027-.425,1.462,1.462,0,0,0,.427-1.027v-7.705a1.465,1.465,0,0,0-.427-1.029,1.464,1.464,0,0,0-1.027-.425h-7.7a1.455,1.455,0,0,0-1.452,1.454v7.3a.49.49,0,0,0,.3.477.5.5,0,0,0,.186.035.5.5,0,0,0,.366-.164l5.233-5.247h-3.184v-.944h4.323a.472.472,0,0,1,.473.471v4.325h-.944v-3.187l-5.243,5.269a1.443,1.443,0,0,1-1.025.432,1.423,1.423,0,0,1-.552-.111,1.43,1.43,0,0,1-.885-1.35v-7.3a2.4,2.4,0,0,1,2.4-2.4h7.7a2.4,2.4,0,0,1,2.4,2.4v7.705A2.4,2.4,0,0,1,1427.6-7871Z" transform="translate(-1235.241 8272.951)" />
                                                    </g>
                                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18.001 18">
                                                    <g id="right_black_icon_18px" transform="translate(-48.941 -351.847)">
                                                        <rect id="BG_Guide" data-name="BG Guide" width="15" height="15" transform="translate(48.941 351.847)" fill="none"></rect>
                                                        <path id="Path_22926" data-name="Path 22926" d="M58.6,354.508a1.275,1.275,0,0,0-.179.537.771.771,0,0,0,.269.536l5.635,5.188H49.657a.715.715,0,1,0,0,1.431H64.325l-5.546,5.188a.7.7,0,0,0,0,.984.709.709,0,0,0,.984.089l6.977-6.44a.7.7,0,0,0,0-.984l-6.977-6.53a.684.684,0,0,0-.447-.178C58.869,354.24,58.69,354.329,58.6,354.508Z" transform="translate(0 -0.448)" fill="#080808">
                                                        </path>
                                                    </g>
                                                </svg>}

                                            </span>
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            )

        })

    }
    return (
        <section className="p-3">
            <div className='AdminPage'>
                {prepareHtml()}
            </div>
        </section>
    )
}

export default MartAdminHome