import React from "react";
import Slider from "react-slick";

const HealthyLife = (props) => {

    const content = props.data
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
        slidesToScroll: 1
    };

    return (
        <React.Fragment>
            <section className="p-3 healthcare-blog">
                <div className="col-7">
                    <div>
                        <h6 className="mb-0">Information You can Use for a </h6>
                        <h2 className="title">HEALTHY LIFE</h2>
                    </div>
                    <Slider {...settings}>
                        {content.map((value) => {
                            return <div className="healthblog-header">
                                <a className="title-location" href={value.blogUrl}>
                                    <p>
                                        <span className="font-16">{value.title}</span><br />
                                        <small className="text-secondary">by MedPlus Team, March 11, 2022</small>
                                    </p>
                                    <div className="content" dangerouslySetInnerHTML={{ __html: value.summary }}></div>
                                    <p className="text-right mb-0">
                                        <a href={value.blogUrl} className="link-danger">Read more <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                            <g id="rightchevron_black_icon_18px" transform="translate(-906.838 780) rotate(-90)">
                                                <rect id="Rectangle_4721" data-name="Rectangle 4721" width="18" height="18" transform="translate(762 906.838)" fill="none" />
                                                <path id="Path_23400" data-name="Path 23400" d="M61.559,501.985l4.049-4.049a.917.917,0,0,0-1.3-1.3l-3.4,3.39-3.4-3.4a.921.921,0,0,0-1.569.649.912.912,0,0,0,.272.649l4.049,4.059A.922.922,0,0,0,61.559,501.985Z" transform="translate(710.032 416.557)" fill="#FF0000" />
                                            </g>
                                        </svg></a>
                                    </p>
                                </a></div>
                        })}
                    </Slider>
                </div>
            </section>
        </React.Fragment>
    )
}
export default HealthyLife