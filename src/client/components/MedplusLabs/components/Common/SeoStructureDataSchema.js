import React from "react";
const SeoStructureDataSchema=(props)=>{
    let name = props.name ? props.name : ``;
    let alternateName =props.alternateName ? props.alternateName : ``;
    let price = props.price ? props.price : ``;
    let mrp = props.mrp ? props.mrp : ``;
    let subscriptionPrice = props.subscriptionPrice ? props.subscriptionPrice : ``;
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
    if(alternateName){
        sData["alternateName"]=alternateName
    }
    // if(mrp){
    //     sData["price"]=mrp
    // }
    if(subscriptionPrice){
        priceObject["priceSpecification"]=subscriptionPrice
    }
    sData["offers"]={...priceObject}
    // sData={
            /* "name":name, */
            /* "alternateName":alternateName, */
            /* "offers":
            [{
    
                "@type":"offer",
          
                "itemOffered":price,
                
                "price":mrp == price ? null : mrp,
                "priceSpecification":subscriptionPrice,
                "priceCurrency":"INR"
            }] */
            
    //}
    //sData = Object.fromEntries(Object.entries(sData).filter(([_, v]) => v != null));


    return(
        <React.Fragment>
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(sData)}}></script>
        </React.Fragment>
    )
}
export default SeoStructureDataSchema;