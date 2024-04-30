import Cookies from 'js-cookie';

export const addOrderItem = (firstOrderId,firstOrderTotal,secondOrderId,secondOrderTotal) =>{
    ADMITAD = window.ADMITAD || {};
    ADMITAD.Invoice = ADMITAD.Invoice || {};
	const deduplicationCookie = Cookies.get("deduplication_cookie");
// define a channel for Admitad
	if(!deduplicationCookie) {
		ADMITAD.Invoice.broker = 'na';
	} else if (deduplicationCookie == 'admitad') {
		ADMITAD.Invoice.broker = 'adm';
	} else {
		ADMITAD.Invoice.broker = deduplicationCookie;
	};
    ADMITAD.Invoice.category = '1';  // action code (defined during integration)
    var orderedItem = [];  // temporary array for product items
// repeat for every product item in the cart
    orderedItem.push({
        Product: {
            category: '1',             
            price: firstOrderTotal,
            priceCurrency: "INR",      
        },
        orderQuantity: '1',            
        additionalType: "sale"         
    });
    ADMITAD.Invoice.referencesOrder = ADMITAD.Invoice.referencesOrder || [];
    // adding items to the order
    ADMITAD.Invoice.referencesOrder.push({
	    orderNumber: firstOrderId,
	    orderedItem: orderedItem
});

if(secondOrderId != ''){
	var orderedItems2 = [];
// repeat for every product item in the cart
	orderedItems2.push({
		Product: {
			category: '1',	
			price: secondOrderTotal,
			priceCurrency: 'INR',
		},
		orderQuantity: '1',	
		additionalType: 'sale'
	});
	ADMITAD.Invoice.referencesOrder = ADMITAD.Invoice.referencesOrder || [];
	// adding items to the order
	ADMITAD.Invoice.referencesOrder.push({
		orderNumber: secondOrderId,
		orderedItem: orderedItems2
	});
}

// Important! If order data is loaded via AJAX, uncomment this string.
    ADMITAD.Tracking.processPositions();
}