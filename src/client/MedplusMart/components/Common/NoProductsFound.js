import React from "react";
import { Link } from "react-router-dom";
import NoDataFound from "../../../images/common/No-data-pana.svg";

const NoProductsFound = (props) => {
    return(
        <React.Fragment>
            <section className={props.className ? props.className :"body-height d-flex align-items-center justify-content-center"}>
                <div className="text-center m-3">
                    <img src={NoDataFound} alt="No Data Found" className="mb-2" height="150" />
                    <p className="mb-0 font-14 text-secondary">{props.message ? props.message : "Huh..! We don't have any more products that match your search criteria. Do you want to"}</p>
                    {(props.showrequest || props.showrequest == undefined) && <Link to={"/requestProduct"} className="btn brand-secondary my-3" >
                        Request A Product
                    </Link>}
                </div>
            </section>
        </React.Fragment>
    );
}

export default NoProductsFound;