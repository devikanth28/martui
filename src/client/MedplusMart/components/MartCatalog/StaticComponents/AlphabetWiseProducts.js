import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BreadCrumbAction from "../../../../../redux/action/BreadCrumbAction";
import AlphabetwiseProductsPlaceholders from "../../../../components/MartCatalogStaticPages/FooterStaticPages/AlphabetwiseProductsPlaceholders";
import Validate from "../../../../helpers/Validate";
import MartCatalogService from "../../../services/MartCatalogService";
import NoProductsFound from "../../Common/NoProductsFound";

const AlphabetWiseProducts = (props) => {

    const validate = Validate();
    const breadCrumbAction = BreadCrumbAction();

    const pageRequest = props.match.params.pageRequest;
    const alphabets = ['0-9'];
    const subAlphabets = [pageRequest !== '0-9' ? pageRequest : ''];
    const [productsData, setProductsData] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedSubAlphabet, setSelectedSubAlphabet] = useState(pageRequest);
    const [noProductsFound, setNoProductsFound] = useState(false);
    const [onlyLinksLoader, setOnlyLinksLoader] = useState(false);

    for (let k = 65; k < 91; k++) {
        alphabets.push(String.fromCharCode(k));
    }

    if (pageRequest !== '0-9') {
        for (let j = 65; j < 91; j++) {
            subAlphabets.push(pageRequest + String.fromCharCode(j));
        }
    }

    useEffect(() => {
        getAlphabetWiseProducts();
        setSelectedSubAlphabet(pageRequest);
    }, [pageRequest]);

    const getAlphabetWiseProducts = () => {
        setIsLoading(true);
        MartCatalogService().alphabetWiseProducts({ pageRequest: pageRequest }).then((data) => {
            setIsLoading(false);
            checkNoProductsFound(data);
            breadCrumbAction.pushBreadCrumbs({ name: data.dataObject.name, url: props.location.pathname });
        }).catch((err) => {
            setIsLoading(false);
            console.log(err);
        });
    }

    const checkNoProductsFound = (data) => {
        if (data?.dataObject?.productPage.indexOf('No Product Found!') != -1) {
            setNoProductsFound(true);
            setProductsData(null);
        }
        else {
            setNoProductsFound(false);
            setProductsData(data?.dataObject?.productPage);
        }
    }

    const getSubcategoryPage = (e, key) => {
        e.preventDefault();
        setOnlyLinksLoader(true);
        MartCatalogService().getSubAlphabetProductList({ pageRequest: key }).then((data) => {
            setSelectedSubAlphabet(key);
            setOnlyLinksLoader(false);
            checkNoProductsFound(data);
        }).catch((err) => {
            setOnlyLinksLoader(false);
            console.log(err);
        });
    }

    return (
        <React.Fragment>
            {isLoading && <AlphabetwiseProductsPlaceholders />}
            {validate.isNotEmpty(productsData) && <section className='p-4 alphabetwise-products-list'>
                <div class="mb-4"><h2>Find information on drugs <span class="font-weight-light">by alphabet</span></h2></div>
                {validate.isNotEmpty(alphabets) && <div className='Alphabet p-2'>
                    <ul class="d-flex flex-wrap justify-content-center list-inline mb-0" aria-role="list">
                        {alphabets.map((eachChar) => {
                            return (<li aria-role="listitem"><Link to={`/alphabetWiseProducts/${eachChar}`} className={`${eachChar == pageRequest ? 'active' : ''}`} title={eachChar} aria-label={`Redirecting to ${eachChar}`}>{eachChar}</Link></li>)
                        })}
                    </ul>
                </div>
                }
                {validate.isNotEmpty(subAlphabets) && subAlphabets.length > 0 &&
                    <ul class="nav sub-alphabets" aria-role="list">
                        {subAlphabets.map((eachValue) => {
                            return (
                                <li className={`nav-item ${(eachValue == selectedSubAlphabet) ? 'active' : ""}`} aria-role="listitem">
                                    <Link className="nav-link" to="javascript:void(0);" onClick={(e) => getSubcategoryPage(e, eachValue)} title={eachValue} role="tab" aria-label={`Redirecting to ${eachValue}`}>{eachValue}</Link>
                                </li>
                            )
                        })}
                    </ul>
                }
                {!onlyLinksLoader && <div dangerouslySetInnerHTML={{ __html: productsData }} />}
                {onlyLinksLoader && <AlphabetwiseProductsPlaceholders onlyLinksLoader={onlyLinksLoader}/>}
                {noProductsFound && <NoProductsFound message={"No Links Found "} showrequest={false} />}
            </section>}
        </React.Fragment>
    );

}

export default AlphabetWiseProducts;