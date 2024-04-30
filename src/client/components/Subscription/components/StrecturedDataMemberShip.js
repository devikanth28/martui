import React from 'react';

const StrecturedDataMemberShip = (props) => {
    let name=props.name;
    let price=props.price;
    let mrp=props.mrp
    let description=props.description
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
    if(description){
        sData["description"]=description.toString();
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
  return  (
  <React.Fragment>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(sData)}}></script>
  
</React.Fragment>
  )
};

export default StrecturedDataMemberShip;
