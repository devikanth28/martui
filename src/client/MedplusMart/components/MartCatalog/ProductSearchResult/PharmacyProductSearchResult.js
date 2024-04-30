import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "../../../../components/Common/Image";
import PaginationComponent from "../../../../components/Common/PaginationComponent";
import { getProductRedirectUrl, popOverPlacement } from "../../../../helpers/CommonUtil";
import Validate from "../../../../helpers/Validate";
import MartCatalogService from "../../../services/MartCatalogService";
import AddToCart from "../../Common/AddToCart";
import CompositionSearchResult from "./CompositionSearchResult";
import PharmacyProductSearchResultGhostImage from "./PharmacyProductSearchResultGhostImage";
import NoProductsFound from "../../Common/NoProductsFound";
import ProductSummaryCard from "../../Common/ProductSummaryCard";

const PharmacyProductSearchResult = (props) => {

	const [isProductsLoading, setProductsLoading] = useState(false);
	const [products, setProducts] = useState([]);
	const [compositions, setCompositions] = useState([]);
	const [currentProductsPageNo, setCurrentProductsPageNo] = useState(1);
	const martCatalogService = MartCatalogService();
	const validate = Validate();

	useEffect(() => {
		if (validate.isNotEmpty(props.encodedKeyword)) {
			getSearchResults();
		}
	}, [props.encodedKeyword]);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [currentProductsPageNo]);

	const getSearchResults = async () => {
		try {
			const searchCriteria = {
				searchQuery: props.encodedKeyword,
				recordsCount: 100,
				allFieldsRequired: true,
			};
			setProductsLoading(true);
			const response = await martCatalogService.getSearchResults({searchCriteria: JSON.stringify(searchCriteria)});
			if (response?.statusCode === "SUCCESS" && validate.isNotEmpty(response.dataObject)) {
				if (validate.isNotEmpty(response?.dataObject?.compositions)) {
					setCompositions(response.dataObject.compositions);
				}
				else {
					setCompositions([]);
				}
				if (validate.isNotEmpty(response?.dataObject?.products)) {
					setProducts(response.dataObject.products);
				}
			} else if (
				response?.statusCode === "SUCCESS" &&
				validate.isEmpty(response.dataObject)
			) {
				setCompositions([]);
				setProducts([]);
			}
			setProductsLoading(false);
		} catch (err) {
			console.log(err);
			setProductsLoading(false);
		}
	};

    return (
      <React.Fragment>
      {isProductsLoading && <PharmacyProductSearchResultGhostImage/>}
            {!isProductsLoading && (products.length > 0 || compositions.length > 0)
				?	<React.Fragment>
						<div className='row mt-3'>
							<div className='col-8'>
								<div>
									<h5 className="my-2">Showing results for "<span className='text-danger'>{props.searchKeyword}</span>"</h5>
								</div>
								{products?.length > 0 
								?
									<section>
										<div className='w-100 d-flex flex-wrap home-page-products-slider py-3 px-2' style={{'gap':'0.5rem 0rem'}} >
												{[...products.slice((currentProductsPageNo-1)*20,(currentProductsPageNo)*20)].map((each,index) => {
													return (
														<div className="search-all-products">
															<ProductSummaryCard product={each} isDropDownRequired={true} showinformation={true} cardIndex={`${popOverPlacement(index+1)}`} height={props.height} width={props.height}/>
														</div>
													)
												})}
										</div>
										{/* pagination */}
										<PaginationComponent totalNoOfRecords={products?.length} recordsPerPage={20} currentPageNo={currentProductsPageNo} onSelectHandler={setCurrentProductsPageNo} />
									</section>
								:
									<NoProductsFound /> }
							</div>
							<div className='col-4 pl-0'>
								<CompositionSearchResult compositions={compositions}/>
							</div>
						</div>
					</React.Fragment>
				:
					<NoProductsFound />
            }
    </React.Fragment>
    );

}

export default PharmacyProductSearchResult;