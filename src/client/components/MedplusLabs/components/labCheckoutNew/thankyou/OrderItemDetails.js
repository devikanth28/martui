import React, { useState } from 'react';
import { Collapse } from 'reactstrap';
import Validate from '../../../../../helpers/Validate';

const OrderItemDetails = (props) => {

  const validate = Validate();
  const [openPickUp, setOpenPickUp] = useState(false)

  return (<React.Fragment>
    <div className="panel-group">
      <div className="panel panel-default">
        <div className="panel-heading">
          <a className="toggle-arrow" aria-label='click to view details' aria-role="button" href="javascript:void(0)" title="click to view details" onClick={() => setOpenPickUp(!openPickUp)}>
            {props.displayName} ({Object.values(props.items).reduce((total, item) => total = total + item.length, 0)} Tests)
            <svg className={openPickUp ? "rotate-arrow" : "rotate-arrow d-none"} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18 18">
              <rect fill="none" width="18" height="18" transform="translate(0 0)" />
              <rect fill="#080808" width="18" height="1.431" rx="0.636" transform="translate(0 8.285)" />
            </svg>
            <svg className={openPickUp ? "rotate-arrow d-none" : "rotate-arrow"} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18 18">
              <rect fill="none" width="18" height="18" />
              <path fill="#080808" d="M69.226,601.175H61.657v-7.569a.716.716,0,1,0-1.431,0v7.569H52.657a.716.716,0,1,0,0,1.431h7.569v7.569a.716.716,0,0,0,1.431,0v-7.569h7.569a.716.716,0,0,0,0-1.431Z" transform="translate(-51.941 -592.89)" />
            </svg>
          </a>
        </div>
        <Collapse isOpen={openPickUp}>
          <div className="panel-collapse">
            {Object.keys(props.items).map(key => {
              return (
                <div key={key} className="panel-body mx-n3">
                  <strong><span className="d-block text-danger mb-2">Order - {key}</span></strong>
                  {props.items[key].map((order, index) => {
                    return (
                      <p key={order.testName} className={props.items[key].length == index + 1 ? "d-flex justify-content-between mb-0" : "d-flex justify-content-between mb-1"}>
                        <strong>{order.testName}</strong>
                        <span class="text-secondary">
                          {validate.isNotEmpty(order.mrp) && validate.isNotEmpty(order.price) && (parseFloat(order.mrp) > parseFloat(order.price)) &&
                            <span class="font-14"><strong class="rupee">₹</strong><del class="mr-2">{parseFloat(order.mrp).toFixed(2)}</del></span>
                          }
                          <strong class="rupee text-dark">₹</strong><strong class="text-dark">{parseFloat(order.price).toFixed(2)}</strong>
                        </span>
                      </p>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </Collapse>
      </div>
    </div>
  </React.Fragment>);
}

export default OrderItemDetails;