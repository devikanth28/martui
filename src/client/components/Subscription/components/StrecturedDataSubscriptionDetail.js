import React from 'react';

const StrecturedDataSubscriptionDetail = (props) => {
    let name=props.name;
    let price=props.price;
    let mrp=props.mrp;
    let desc=props.desc;

    let sData={
        "@context": "https://schema.org",
        "@type": "Product",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "1",
            "ratingCount": "55"
        },
        
    };

    if(name){

        sData["name"]=name;
    }
    if(desc){
        sData["description"]=desc
    }
    let priceObject={ "@type":"offer", "priceCurrency":"INR"}
    if(price){
        if(price!=mrp){
            priceObject["itemOffered"]=price;
            priceObject["price"] = mrp;
        }
        else{
            priceObject["price"] = mrp;
        }
    }
    sData["offers"]={...priceObject}
  return (
<React.Fragment>
<script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(sData)}}></script>
</React.Fragment>
  )
};

export default StrecturedDataSubscriptionDetail;
