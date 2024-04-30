import React, { useEffect, useState } from "react";
import base64 from 'base-64';
import GeneralProductSearchResult from "./GeneralProductSearchResult";
import PharmacyProductSearchResult from "./PharmacyProductSearchResult";

const ProductSearchAllResult = (props)=> {

    const [encodedKeyword,setEncodedKeyword] = useState('');
    const [productType,searchKeyword] = base64.decode(encodedKeyword).split("::");


    useEffect(()=>{
        setEncodedKeyword(props.match.params.searchString);
    },[props.match.params.searchString])
    return (
        <React.Fragment>
        {productType =='G' && <GeneralProductSearchResult encodedKeyword={encodedKeyword} searchKeyword={searchKeyword} productType={productType} height={170} width={142}/>}
        {productType !== 'G' && <PharmacyProductSearchResult encodedKeyword={encodedKeyword} searchKeyword={searchKeyword} productType={productType} height={170} width={142}/>}
        </React.Fragment>
    );
}

export default ProductSearchAllResult;