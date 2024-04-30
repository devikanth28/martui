import React from 'react'

const ProductStructuredData = (props) => {
    let pname=props.pname;
    let pimage=props.pimage;
    let psku=props.psku;
    let pbrand=props.Pbrand;
    let pId=props.pId;
    let pLowerPrice=props.pLowerPrice;
    let pHighPrice=props.pHighPrice;
    let pavailability=props.pavailability;
    let pUrl=props.pUrl;
    let pdescription=props.pdescription
    let sData={
        "@context": "https://schema.org",
        "@type": "Product",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "3",
            "ratingCount": "3"
        },
        
    };
    if(pname){
        sData["name"]=pname;
    }
    if(pimage){
        sData["image"]=pimage;
    }
    if(psku){
        sData["sku"]=psku
    }
    let brand={"@type":"Brand"}
    if(pbrand){
        brand["name"]=pbrand;
    }
    sData["brand"]={...brand}
    if(pId){
        sData["productID"]=pId
    }
    let priceObject={ "@type":"AggregateOffer","priceCurrency":"INR","offerCount":1}
    if(pLowerPrice){
        priceObject["lowPrice"]=pLowerPrice;
    }
    if(pHighPrice){
        priceObject["highPrice"]=pHighPrice;
    }
    if(pavailability){
        priceObject["availability"]=pavailability;
    }
    if(pUrl){
        priceObject["url"]=[pUrl]
    }
    sData["offers"]={...priceObject}
    if(pdescription){
        sData["description"]=pdescription;
    }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(sData)}}></script>
  )
}

export default ProductStructuredData