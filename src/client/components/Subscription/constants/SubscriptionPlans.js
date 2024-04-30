import { isProduction } from "../../../helpers/CommonUtil";
import { SubscriptionBenefitType } from "./SubscriptionConstants";


const productionPlans = [
    {
        id: 39,
        name: "Single Adult",
        mrp: 1499,
        price: 999,
        description: "Covers one adult at <small>&#x20B9;</small>999",
        benefitType: SubscriptionBenefitType.HEALTHCARE,
        type: { type: "INDIVIDUAL" },
        benefits: [
            "Covers one adult at <small>&#x20B9;</small>999",
            "For Individuals 18 years or above only",
            "Provides benefits for one year",
            //"Upto 20% off on Tele consultations",
            //"Add upto 2 members in the plan",
            //"Add a member at Rs 1000 only",
            //"Get surprise coupon on purchasing the plan"
        ]
    }, 
    {
        id: 40,
        name: "Adult Couple",
        mrp: 2499,
        price: 1499,
        benefitType: SubscriptionBenefitType.HEALTHCARE,
        type: { type: "INDIVIDUAL" },
        description: "Covers one married couple for <small>&#x20B9;</small>1499",
        benefits: [
            "Covers one married couple for <small>&#x20B9;</small>1499",
            "For Individuals 18 years or above only",
            "Provides benefits for one year",
            //"Upto 20% off on Tele consultations",
            //"Add upto 2 members in the plan",
            //"Add a member at Rs 1000 only",
            //"Get surprise coupon on purchasing the plan"
        ]
    },
    {
        id: 41,
        name: "Family with 1 Child",
        mrp: 3499,
        price: 1649,
        benefitType: SubscriptionBenefitType.HEALTHCARE,
        type: { type: "INDIVIDUAL" },
        description: "Covers a family (parents) and 1 child under 25 yrs for <small>&#x20B9;</small>1649",
        benefits: [
            "Covers a family (parents) and 1 child under 25 yrs for <small>&#x20B9;</small>1649",
            "Can add upto 5 more children at <small>&#x20B9;</small>250 each",
            "Provides benefits for one year",
            //"Upto 20% off on Tele consultations",
            //"Add upto 2 members in the plan",
            //"Add a member at Rs 1000 only",
            //"Get surprise coupon on purchasing the plan"
        ]
    },
    {
        id: 42,
        name: "Family with 2 Children",
        mrp: 4499,
        price: 1799,
        benefitType: SubscriptionBenefitType.HEALTHCARE,
        type: { type: "INDIVIDUAL" },
        description: "Covers a family (parents) with 2 children under 25 yrs for <small>&#x20B9;</small>1799",
        benefits: [
            "Covers a family (parents) with 2 children under 25 yrs for <small>&#x20B9;</small>1799",
            "Can add upto 4 more children at <small>&#x20B9;</small>250 each",
            "Provides benefits for one year",
            //"Upto 20% off on Tele consultations",
            //"Add upto 2 members in the plan",
            //"Add a member at Rs 1000 only",
            //"Get surprise coupon on purchasing the plan"
        ]
    },
    {
        id: 126,
        name: "Health Care Service Plan",
        mrp: 1499,
        price: 1149,
        type: { type: "INDIVIDUAL" },
        description: "MedPlus Advantage Plan for benefits on diagnostic tests and doctor consultations",
        benefitType: SubscriptionBenefitType.HEALTHCARE,
        benefits: [
            "Covers one adult at <small>&#x20B9;</small>1149",
            "Can add upto 3 adults at <small>&#x20B9;</small>500 each",
            "Can add upto 3 children at <small>&#x20B9;</small>150 each",
            "Provides benefits for one year",
            //"Add upto 2 members in the plan",
            //"Add a member at Rs 1000 only",
            //"Get surprise coupon on purchasing the plan"
        ],
    },
    {
        id: 128,
        name: "Health Care Services Plan",
        mrp: 1249,
        price: 999,
        type: { type: "INDIVIDUAL" },
        description: "MedPlus Advantage Plan for benefits on diagnostic tests and doctor consultations",
        benefitType: SubscriptionBenefitType.HEALTHCARE,
        benefits: [
            "Covers one adult at <small>&#x20B9;</small>999",
            "Can add upto 3 adults at <small>&#x20B9;</small>500 each",
            "Can add upto 3 children at <small>&#x20B9;</small>150 each",
            "Provides benefits for one year",
            //"Add upto 2 members in the plan",
            //"Add a member at Rs 1000 only",
            //"Get surprise coupon on purchasing the plan"
        ],
    },
    /*{
        id: 125,
        name: "Pharmacy Plan",
        benefitType: SubscriptionBenefitType.PHARMA,
        type: { type: "INDIVIDUAL" },
        mrp: 499,
        price: 50,
        description: "MedPlus Advantage - Pharma Plan",
        benefits: [
            "Get 50-80% discount on MedPlus brand medicines",
            "Covers benefits for entire family",
            "Provides benefits for one year",
        ]
    },
    {
        id: 127,
        name: "Pharmacy and Health Care Service Plan",
        benefitType: null,
        mrp: 1998,
        price: 1198,
        type: { type: "INDIVIDUAL_COMBO" },
        plans: [
            {
                id: 125,
                name: "Pharmacy Plan",
                benefitType: SubscriptionBenefitType.PHARMA,
                type: { type: "INDIVIDUAL" },
                mrp: 499,
                price: 50,
                description: "MedPlus Advantage - Pharma Plan",
                benefits: [
                    "Get 50-80% discount on MedPlus brand medicines",
                    "Covers benefits for entire family",
                    "Provides benefits for one year",
                ]
            },
            {
                id: 126,
                name: "Health Care Service Plan",
                benefitType: SubscriptionBenefitType.HEALTHCARE,
                type: { type: "INDIVIDUAL" },
                mrp: 1499,
                price: 1149,
                description: "MedPlus Advantage Plan for benefits on diagnostic tests and doctor consultations",
                benefits: [
                    "Covers one adult at <small>&#x20B9;</small>1149",
                    "Can add upto 3 adults at <small>&#x20B9;</small>500 each",
                    "Can add upto 3 children at <small>&#x20B9;</small>150 each",
                    "Provides benefits for one year",
                ]
            }
        ]
    },*/
]


const localEnvDevelopmentPlans = [
    {
        id: 135,
        name: "MA Total Care Pro",
        benefitType: null,
        mrp: 3600,
        price: 2700,
        type: { type: "INDIVIDUAL_COMBO" },
        plans: [
            {
                id: 134,
                name: "MA Pharma Pro",
                mrp: 2000,
                benefitType: SubscriptionBenefitType.PHARMA,
                type: { type: "INDIVIDUAL" },
                price: 1200,
                description: "MedPlus Pharma Pro,",
                benefits: [
                    "Get 40-80% discount on MedPlus brand prescription medicines",
                    "Covers the entire family",
                    "Provides benefits for one year",
                ]
            },
            {
                id: 133,
                name: "MA Health Care Pro",
                benefitType: SubscriptionBenefitType.HEALTHCARE,
                type: { type: "INDIVIDUAL" },
                mrp: 1600,
                price: 1500,
                description: "Medplus Health Care Pro",
                benefits: [
                    "Covers a family (parents) and 1 child under 25 yrs for <small>&#x20B9;</small>1649",
                    "Can add upto 5 more children at <small>&#x20B9;</small>250 each",
                    "Provides benefits for one year",
                ]
            }
        ]
    },
    {
        id: 131,
        name: "MA Total Care Lite",
        type: { type: "INDIVIDUAL_COMBO" },
        benefitType: null,
        mrp: 3600,
        price: 3220,
        plans: [
            {
                id: 130,
                name: "MA Pharma Lite",
                benefitType: SubscriptionBenefitType.PHARMA,
                mrp: 2000,
                price: 1720,
                description: "MedPlus Pharma Lite",
                type: { type: "INDIVIDUAL" },
                benefits: [
                    "Get 40-80% discount on MedPlus brand prescription medicines",
                    "Can add upto 4 more children at <small>&#x20B9;</small>250 each",
                    "Provides benefits for one year",
                ]
            },
            {
                id: 129,
                name: "MA Health Care Lite",
                benefitType: SubscriptionBenefitType.HEALTHCARE,
                mrp: 1600,
                price: 1500,
                description: "MedPlus Health Care Lite",
                type: { type: "INDIVIDUAL" },
                benefits: [
                    "Avail free diagnostic tests worth <small>&#x20B9;</small>449 at MRP",
                    "Benefits covered for an individual",
                    "Provides benefits for one year",
                ]
            }
        ],
    },


    {
        id: 133,
        name: "MA Health Care Pro",
        mrp: 1600,
        price: 1500,
        type: { type: "INDIVIDUAL" },
        description: "MedPlus Health Care Pro",
        benefitType: SubscriptionBenefitType.HEALTHCARE,
        benefits: [
            "Avail free diagnostic tests worth <small>&#x20B9;</small>1149 at MRP",
            "75% discount on all diagnostic tests",
            "Provides benefits for one year",
            //"Upto 20% off on Tele consultations",
            //"Add upto 2 members in the plan",
            //"Add a member at Rs 1000 only",
            //"Get surprise coupon on purchasing the plan"
        ],
    },
    {
        id: 134,
        name: "MA Pharma Pro",
        benefitType: SubscriptionBenefitType.PHARMA,
        type: { type: "INDIVIDUAL" },
        mrp: 2000,
        price: 1200,
        description: "MedPlus Pharma Pro",
        benefits: [
            "Get 40-80% discount on MedPlus brand prescription medicines",
            "Covers the entire family",
            "Provides benefits for one year",
        ]
    },
    {
        id: 129,
        name: "MA Health Care Lite",
        benefitType: SubscriptionBenefitType.HEALTHCARE,
        type: { type: "INDIVIDUAL" },
        mrp: 1600,
        price: 1500,
        description: "MedPlus Health Care Lite",
        benefits: [
            "Avail free diagnostic tests worth <small>&#x20B9;</small>449 at MRP",
            "Benefits covered for an individual",
            "Provides benefits for one year",
        ]
    },
    {
        id: 130,
        name: "MA Pharma Lite",
        benefitType: SubscriptionBenefitType.PHARMA,
        type: { type: "INDIVIDUAL" },
        mrp: 2000,
        price: 1720,
        description: "MedPlus Pharma Lite",
        benefits: [
            "Get 40-80% discount on MedPlus brand prescription medicines",
            "Can add upto 4 more children at <small>&#x20B9;</small>250 each",
            "Provides benefits for one year",
        ]
    },
// the belo plans are added by QA team
    
    {
        id: 228,
        name: "Combo Protect",
        benefitType: null,
        mrp: 1599,
        price: 1199,
        type: { type: "INDIVIDUAL_COMBO" },
        plans: [
            {
                id: 224,
                name: "Pharma Protect",
                mrp: 100,
                benefitType: SubscriptionBenefitType.PHARMA,
                type: { type: "INDIVIDUAL" },
                price: 50,
                description: "Get discounts on pharmacy products",
                benefits: [
                    "Get 40-80% discount on MedPlus brand prescription medicines",
                    "Covers the entire family",
                    "Provides benefits for one year",
                ]
            },
            {
                id: 226,
                name: "Health Protect",
                benefitType: SubscriptionBenefitType.HEALTHCARE,
                type: { type: "INDIVIDUAL" },
                mrp: 1499,
                price: 1149,
                description: "Get discounts on diagnostic tests",
                benefits: [
                    "Get 50-80% discount on diagnostic tests",
                    "Can add upto 5 more children",
                    "Provides benefits for one year",
                ]
            }
        ]
    },
    {
        id: 224,
        name: "Pharma Protect",
        mrp: 100,
        benefitType: SubscriptionBenefitType.PHARMA,
        type: { type: "INDIVIDUAL" },
        price: 50,
        description: "Get discounts on pharmacy products",
        benefits: [
            "Get 40-80% discount on MedPlus brand prescription medicines",
            "Covers the entire family",
            "Provides benefits for one year",
        ]
    },
    {
        id: 226,
        name: "Health Protect",
        benefitType: SubscriptionBenefitType.HEALTHCARE,
        type: { type: "INDIVIDUAL" },
        mrp: 1499,
        price: 1149,
        description: "Get discounts on diagnostic tests",
        benefits: [
            "Get 50-80% discount on diagnostic tests",
            "Can add upto 5 more children",
            "Provides benefits for one year",
        ]
    },
    {
        id: 229,
        name: "Combo Protect Plus",
        benefitType: null,
        mrp: 2199,
        price: 1699,
        type: { type: "INDIVIDUAL_COMBO" },
        plans: [
            {
                id: 225,
                name: "Pharma Protect Plus",
                mrp: 200,
                benefitType: SubscriptionBenefitType.PHARMA,
                type: { type: "INDIVIDUAL" },
                price: 100,
                description: "Get great discounts on pharmacy products",
                benefits: [
                    "Get 50-80% discount on MedPlus brand prescription medicines",
                    "Covers the entire family",
                    "Provides benefits for one year",
                ]
            },
            {
                id: 227,
                name: "Health Protect Plus",
                benefitType: SubscriptionBenefitType.HEALTHCARE,
                type: { type: "INDIVIDUAL" },
                mrp: 1999,
                price: 1599,
                description: "Get great discounts on diagnostic tests",
                benefits: [
                    "Get 60-90% discount on diagnostic tests",
                    "Can add upto 8 members",
                    "Provides benefits for one year",
                ]
            }
        ]
    },
    {
        id: 225,
        name: "Pharma Protect Plus",
        mrp: 200,
        benefitType: SubscriptionBenefitType.PHARMA,
        type: { type: "INDIVIDUAL" },
        price: 100,
        description: "Get great discounts on pharmacy products",
        benefits: [
            "Get 50-80% discount on MedPlus brand prescription medicines",
            "Covers the entire family",
            "Provides benefits for one year",
        ]
    },
    {
        id: 227,
        name: "Health Protect Plus",
        benefitType: SubscriptionBenefitType.HEALTHCARE,
        type: { type: "INDIVIDUAL" },
        mrp: 1999,
        price: 1599,
        description: "Get great discounts on diagnostic tests",
        benefits: [
            "Get 60-90% discount on diagnostic tests",
            "Can add upto 8 members",
            "Provides benefits for one year",
        ]
    },
    {
        id: 136,
        name: "Health Care Service Plan",
        mrp: 1499,
        price: 1149,
        type: { type: "INDIVIDUAL" },
        description: "MedPlus Advantage Plan for benefits on diagnostic tests and doctor consultations",
        benefitType: SubscriptionBenefitType.HEALTHCARE,
        benefits: [
            "Covers one adult at <small>&#x20B9;</small>1149",
            "Can add upto 3 adults at <small>&#x20B9;</small>500 each",
            "Can add upto 3 children at <small>&#x20B9;</small>150 each",
            "Provides benefits for one year",
            //"Add upto 2 members in the plan",
            //"Add a member at Rs 1000 only",
            //"Get surprise coupon on purchasing the plan"
        ],
    },
    {
        id: 137,
        name: "Pharmacy Plan",
        benefitType: SubscriptionBenefitType.PHARMA,
        type: { type: "INDIVIDUAL" },
        mrp: 499,
        price: 50,
        description: "MedPlus Advantage - Pharma Plan",
        benefits: [
            "Get 50-80% discount on MedPlus brand medicines",
            "Covers benefits for entire family",
            "Provides benefits for one year",
        ]
    },
    {
        id: 138,
        name: "Pharmacy and Health Care Service Plan",
        benefitType: null,
        mrp: 1998,
        price: 1198,
        type: { type: "INDIVIDUAL_COMBO" },
        plans: [
            {
                id: 137,
                name: "Pharmacy Plan",
                benefitType: SubscriptionBenefitType.PHARMA,
                type: { type: "INDIVIDUAL" },
                mrp: 499,
                price: 50,
                description: "MedPlus Advantage - Pharma Plan",
                benefits: [
                    "Get 50-80% discount on MedPlus brand medicines",
                    "Covers benefits for entire family",
                    "Provides benefits for one year",
                ]
            },
            {
                id: 136,
                name: "Health Care Service Plan",
                benefitType: SubscriptionBenefitType.HEALTHCARE,
                type: { type: "INDIVIDUAL" },
                mrp: 1499,
                price: 1149,
                description: "MedPlus Advantage Plan for benefits on diagnostic tests and doctor consultations",
                benefits: [
                    "Covers one adult at <small>&#x20B9;</small>1149",
                    "Can add upto 3 adults at <small>&#x20B9;</small>500 each",
                    "Can add upto 3 children at <small>&#x20B9;</small>150 each",
                    "Provides benefits for one year",
                ]
            }
        ]
    },

    // iris enviornment plans
    {
        id: 149,
        name: "Total Protect",
        benefitType: null,
        mrp: 1798,
        price: 1498,
        type: { type: "INDIVIDUAL_COMBO" },
        plans: [
        {
                id: 145,
                name: "Pharma Protect",
                mrp: 599,
                benefitType: SubscriptionBenefitType.PHARMA,
                type: { type: "INDIVIDUAL" },
                price: 499,
                description: "Get discounts on pharmacy products",
                benefits: [
                    "Get 40-80% discount on MedPlus brand prescription medicines",
                    "Covers the entire family",
                    "Provides benefits for one year",
                ]
            },
            {
                id: 146,
                name: "Health Protect",
                benefitType: SubscriptionBenefitType.HEALTHCARE,
                type: { type: "INDIVIDUAL" },
                mrp: 1199,
                price: 999,
                description: "Get discounts on diagnostic tests",
                benefits: [
                    "Get 50-80% discount on diagnostic tests",
                    "Can add upto 5 more children",
                    "Provides benefits for one year",
                ]
            }
        ]
    },{
        id: 145,
        name: "Pharma Protect",
        mrp: 599,
        benefitType: SubscriptionBenefitType.PHARMA,
        type: { type: "INDIVIDUAL" },
        price: 499,
        description: "Get discounts on pharmacy products",
        benefits: [
            "Get 40-80% discount on MedPlus brand prescription medicines",
            "Covers the entire family",
            "Provides benefits for one year",
        ]
    },{
        id: 146,
        name: "Health Protect",
        benefitType: SubscriptionBenefitType.HEALTHCARE,
        type: { type: "INDIVIDUAL" },
        mrp: 1199,
        price: 999,
        description: "Get discounts on diagnostic tests",
        benefits: [
            "Get 50-80% discount on diagnostic tests",
            "Can add upto 5 more children",
            "Provides benefits for one year",
        ]
    },
    {
        id: 150,
        name: "Total Protect Plus",
        benefitType: null,
        mrp: 2298,
        price: 1798,
        type: { type: "INDIVIDUAL_COMBO" },
        plans: [
        {
                id: 147,
                name: "Pharma Protect Plus",
                mrp: 799,
                benefitType: SubscriptionBenefitType.PHARMA,
                type: { type: "INDIVIDUAL" },
                price: 599,
                description: "Get great discounts on pharmacy products",
                benefits: [
                    "Get 50-80% discount on MedPlus brand prescription medicines",
                    "Covers the entire family",
                    "Provides benefits for one year",
                ]
            },
            {
                id: 148,
                name: "Health Protect Plus",
                benefitType: SubscriptionBenefitType.HEALTHCARE,
                type: { type: "INDIVIDUAL" },
                mrp: 1499,
                price: 1199,
                description: "Get great discounts on diagnostic tests",
                benefits: [
                    "Get 60-90% discount on diagnostic tests",
                    "Can add upto 8 members",
                    "Provides benefits for one year",
                ]
            }
        ]
    },
    {
        id: 147,
        name: "Pharma Protect Plus",
        mrp: 799,
        benefitType: SubscriptionBenefitType.PHARMA,
        type: { type: "INDIVIDUAL" },
        price: 599,
        description: "Get great discounts on pharmacy products",
        benefits: [
            "Get 50-80% discount on MedPlus brand prescription medicines",
            "Covers the entire family",
            "Provides benefits for one year",
        ]
    },
    {
        id: 148,
        name: "Health Protect Plus",
        benefitType: SubscriptionBenefitType.HEALTHCARE,
        type: { type: "INDIVIDUAL" },
        mrp: 1499,
        price: 1199,
        description: "Get great discounts on diagnostic tests",
        benefits: [
            "Get 60-90% discount on diagnostic tests",
            "Can add upto 8 members",
            "Provides benefits for one year",
        ]
    },

    //new plans for sp 157 staging
    {
        id: 87,
        name: "Combo Protect",
        benefitType: null,
        mrp: 1398,
        price: 1148,
        type: { type: "INDIVIDUAL_COMBO" },
        plans: [
            {
                id: 80,
                name: "Pharma Protect",
                mrp: 299,
                benefitType: SubscriptionBenefitType.PHARMA,
                type: { type: "INDIVIDUAL" },
                price: 199,
                description: "Get discounts on pharmacy products",
                benefits: [
                    "Get 40-80% discount on MedPlus brand prescription medicines",
                    "Covers the entire family",
                    "Provides benefits for one year",
                ]
            },
            {
                id: 85,
                name: "Healthcare Protect",
                benefitType: SubscriptionBenefitType.HEALTHCARE,
                type: { type: "INDIVIDUAL" },
                mrp: 1099,
                price: 949,
                description: "Get discounts on diagnostic tests",
                benefits: [
                    "Get 50-80% discount on diagnostic tests",
                    "Can add upto 5 more children",
                    "Provides benefits for one year",
                ]
            }
        ]
    },
    {
        id: 80,
        name: "Pharma Protect",
        mrp: 299,
        benefitType: SubscriptionBenefitType.PHARMA,
        type: { type: "INDIVIDUAL" },
        price: 199,
        description: "Get discounts on pharmacy products",
        benefits: [
            "Get 40-80% discount on MedPlus brand prescription medicines",
            "Covers the entire family",
            "Provides benefits for one year",
        ]
    },
    {
        id: 85,
        name: "Healthcare Protect",
        benefitType: SubscriptionBenefitType.HEALTHCARE,
        type: { type: "INDIVIDUAL" },
        mrp: 1099,
        price: 949,
        description: "Get discounts on diagnostic tests",
        benefits: [
            "Get 50-80% discount on diagnostic tests",
            "Can add upto 5 more children",
            "Provides benefits for one year",
        ]
    },
    {
        id: 88,
        name: "Combo Protect Plus",
        benefitType: null,
        mrp: 1798,
        price: 1448,
        type: { type: "INDIVIDUAL_COMBO" },
        plans: [
            {
                id: 82,
                name: "Pharma Protect Plus",
                mrp: 399,
                benefitType: SubscriptionBenefitType.PHARMA,
                type: { type: "INDIVIDUAL" },
                price: 249,
                description: "Get great discounts on pharmacy products",
                benefits: [
                    "Get 50-80% discount on MedPlus brand prescription medicines",
                    "Covers the entire family",
                    "Provides benefits for one year",
                ]
            },
            {
                id: 86,
                name: "Healthcare Protect Plus",
                benefitType: SubscriptionBenefitType.HEALTHCARE,
                type: { type: "INDIVIDUAL" },
                mrp: 1399,
                price: 1199,
                description: "Get great discounts on diagnostic tests",
                benefits: [
                    "Get 60-90% discount on diagnostic tests",
                    "Can add upto 8 members",
                    "Provides benefits for one year",
                ]
            }
        ]
    },
    {
        id: 82,
        name: "Pharma Protect Plus",
        mrp: 399,
        benefitType: SubscriptionBenefitType.PHARMA,
        type: { type: "INDIVIDUAL" },
        price: 249,
        description: "Get great discounts on pharmacy products",
        benefits: [
            "Get 50-80% discount on MedPlus brand prescription medicines",
            "Covers the entire family",
            "Provides benefits for one year",
        ]
    },
    {
        id: 86,
        name: "Healthcare Protect Plus",
        benefitType: SubscriptionBenefitType.HEALTHCARE,
        type: { type: "INDIVIDUAL" },
        mrp: 1399,
        price: 1199,
        description: "Get great discounts on diagnostic tests",
        benefits: [
            "Get 60-90% discount on diagnostic tests",
            "Can add upto 8 members",
            "Provides benefits for one year",
        ]
    }
]
export default isProduction() ? [...productionPlans] : [...localEnvDevelopmentPlans];