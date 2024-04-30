import React,{ useRef, useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import PharmaManufactureProducts from "./PharmaManufactureProducts";
import GeneralStoreBrands from "./GeneralStoreBrands";
import { Link } from "react-router-dom";

const BrowseAllBrands = (props) => {

  

  const generalStoreRef=useRef(null);

  const scrollIntoGeneralStore=()=>{
    window.scrollTo({top:(generalStoreRef.current.offsetTop) ,behavior: "smooth"})
  }

    return(
        <React.Fragment>
          <section className="static-pages browse-all-brands">
            <Nav tabs>
            <div class="page-header w-100">
		  <h1>All Brands</h1>
		  <p>Below are the manufacturers for pharmacy products and list of brands for general products. Find the products listed under each of these brands and manufacturers by clicking on the name.</p>
		</div>
              <NavItem>
              <a href="javascript:void(0)" className="font-16">
                  Pharmaceutical Manufacturers
              </a>
              </NavItem>
              <NavItem>
                <a href='javascript:void(0);' className="ml-5 font-16" onClick={scrollIntoGeneralStore}>
                General Products Brands
                </a>
              </NavItem>
            </Nav>
             <TabContent>
              
              
            <PharmaManufactureProducts/>
            <GeneralStoreBrands generalStoreRef={generalStoreRef}/>
            </TabContent>
          </section>
        </React.Fragment>
        
    )
}
export default BrowseAllBrands;