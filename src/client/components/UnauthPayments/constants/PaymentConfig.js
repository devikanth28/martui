
const REQUEST_TYPE = {
    GET: 'GET',
    POST: 'POST'
};

const COMMON_SERVER_PATH = `mart-common-api`

export const PAYMENT_CONFIG={
    API:{
        GET_PAYMENT_ORDER_DETAILS:{
            PATH : process.env.API_URL + COMMON_SERVER_PATH + "/getOrderDetails",
            HEADER : {
                method : REQUEST_TYPE.POST
            }
        }
    }
}