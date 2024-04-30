export const SET_PLAN="SET_PLAN";
export const REMOVE_PLAN="REMOVE_PLAN";
export const SET_MEMBER_LIST = "SET_MEMBERS_LIST";
export const REMOVE_MEMBER_LIST="REMOVE_MEMBER_LIST";
export const CLEAR_DATA="CLEAR_DATA";
export const SAVE_SUBSCRIPTION="SAVE_SUBSCRIPTION";
export const DELETE_SUBSCRIPTION="DELETE_SUBSCRIPTION";
export const SET_PLAN_TYPE="SET_PLAN_TYPE";
export const SET_CORPORATE_EMAIL_ID="SET_CORPORATE_EMAIL_ID";
export const SAVE_COMPANY="SAVE_COMPANY";
export const SAVE_SUBSCRIPTION_ID="SAVE_SUBSCRIPTION_ID";
export const DELETE_ORDER_ID="DELETE_ORDER_ID";
export const SAVE_PLAN_DETAILS = "SAVE_PLAN_DETAILS";
export const SAVE_ORDER_ID="SAVE_ORDER_ID";

export default (state={},action)=>{
    switch(action.type){
        case SET_PLAN:return{
            ...state,
            selectedPlan:action.data
        }
        case REMOVE_PLAN: return{
            ...state,
            selectedPlan:undefined
        }
        case SET_MEMBER_LIST: return{
            ...state,
            members:action.data
        }
        case REMOVE_MEMBER_LIST: return{
            ...state,
            members:undefined
        }
        case SAVE_SUBSCRIPTION:return{
            ...state,
            subscription:action.data
        }
        case DELETE_SUBSCRIPTION:return{
            ...state,
            subscription:undefined
        }
        case SAVE_COMPANY : return{
            ...state,
            companyDetails : action.data
        }
        case CLEAR_DATA:return{}
        case SET_PLAN_TYPE:return{
            ...state,
            planType:action.data
        }
        case SET_CORPORATE_EMAIL_ID:return{
            ...state,
            corporateEmailId:action.data
        }
        case SAVE_SUBSCRIPTION_ID : return{
            ...state,
            subscriptionId : action.data
        }
        case DELETE_ORDER_ID:return{
            ...state,
            orderId:undefined
        }
        case SAVE_PLAN_DETAILS:return{
            ...state,
            planInfo: action.data
        }
        case SAVE_ORDER_ID:return{
            ...state,
            orderId:action.data
        }
        default : return state;
    }
}