import React from "react";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import Validate from "../../../../helpers/Validate";
import MartCatalogService from "../../../services/MartCatalogService";
import { getBlogUrl } from "../../../../helpers/CommonUtil";
import moment from "moment";
import { Link } from "react-router-dom";
const HealthyLife = (props) => {
	const validate = Validate();
	const martCatalogService = MartCatalogService();

	const [recentPosts, setRecentPosts] = useState([]);
	const [isRecentPostsLoading, setRecentPostsLoading] = useState(false);

	useEffect(() => {
		if (validate.isEmpty(recentPosts)) {
			getRecentPosts();
		}
	}, []);

	const getRecentPosts = () => {
		setRecentPostsLoading(true);
		martCatalogService.getRecentPosts({SEARCH_CRITERIA: JSON.stringify({ postCount: "2" })}).then((response) => {
			if ( validate.isNotEmpty(response) && validate.isNotEmpty(response.dataObject)) {
				setRecentPosts(response.dataObject);
			}
			setRecentPostsLoading(false);
		},(error) => {
			console.log(error);
			setRecentPostsLoading(false);
		});
	};
	const settings = {
		customPaging: function (i) {
			return (
				<div className="custompagination rounded">
					<span></span>
				</div>
			);
		},
		dots: true,
		dotsClass: "slick-dots d-flex mb-2",
		infinite: true,
		arrows: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	const recentPostsGhostImage = () => {
		return (
			<section class="p-2">
				<div class="col-7">
					<div class="p-0 ph-item ph-row pt-2">
						<div class="ph-col-2"></div>
					</div>
					<div class="mb-0 p-0 ph-item ph-row">
						<div class="ph-col-4" style={{ height: "3rem" }}></div>
						<div class="ph-col-8 empty"></div>
						<div class="my-3 ph-col-4"></div>
						<div class="ph-col-8 empty"></div>
						<div class="ph-col-4"></div>
						<div class="ph-col-8 empty"></div>
						<div class="mb-3 mt-4 ph-col-12"></div>
						<div class="ph-col-4"></div>
						<div class="ph-col-8 empty"></div>
						<div class="mt-4 ph-col-4"></div>
						<div class="ph-col-6 empty"></div>
						<div class="mt-4 ph-col-2"></div>
					</div>
				</div>
			</section>
		);
	};

	return (
		<React.Fragment>
			{isRecentPostsLoading && recentPostsGhostImage()}
			{validate.isNotEmpty(recentPosts) && !isRecentPostsLoading && (
				<section className="px-4 py-5 healthcare-blog">
					<div className="col-xl-8 col-xs-12">
						<div>
							<h6 className="mb-0">Information You can Use for a</h6>
							<h2 className="title">HEALTHY LIFE</h2>
						</div>
						<Slider {...settings}>
							{recentPosts.map(
								({ postId, title, summary, dateCreated }) => {
									const blogUrl = getBlogUrl(postId, title);
									return (
										<div className="healthblog-header" key={postId}>
                                            <div className="title-location">
                                                <a className="text-decoration-none" href = {blogUrl} title={"Click to read more"}>
                                                    <p className="text-dark">
                                                        <span className="font-16" dangerouslySetInnerHTML={{__html: title}} />
                                                        <br />
                                                        <small className="text-secondary">{`by MedPlus Team, ${moment(new Date(dateCreated)).format("MMMM DD, YYYY")}`}</small>
                                                    </p>
                                                </a>
                                                <div className="content" dangerouslySetInnerHTML={{__html: summary}} />
                                                <p className="text-right mb-0">
                                                    <a href = {blogUrl} className="link-danger text-decoration-none"  title={"Click to read more"}>
                                                        Read more
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                                            <g id="rightchevron_black_icon_18px" transform="translate(-906.838 780) rotate(-90)">
                                                                <rect id="Rectangle_4721" data-name="Rectangle 4721" width="18" height="18" transform="translate(762 906.838)" fill="none" />
                                                                <path id="Path_23400" data-name="Path 23400" d="M61.559,501.985l4.049-4.049a.917.917,0,0,0-1.3-1.3l-3.4,3.39-3.4-3.4a.921.921,0,0,0-1.569.649.912.912,0,0,0,.272.649l4.049,4.059A.922.922,0,0,0,61.559,501.985Z" transform="translate(710.032 416.557)" fill="#FF0000" />
                                                            </g>
                                                        </svg>
                                                    </a>
                                                </p>
                                            </div>
										</div>
									);
								}
							)}
						</Slider>
					</div>
				</section>
			)}
		</React.Fragment>
	);
};

export default HealthyLife;
