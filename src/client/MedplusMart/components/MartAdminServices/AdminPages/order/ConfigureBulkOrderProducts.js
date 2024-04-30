import React, { useEffect, useState } from 'react'
import BreadCrumbAction from '../../../../../../redux/action/BreadCrumbAction';
import { useInputField } from '../../../../../components/Common/CustomHooks/useInputField';
import MartAdminService from '../../../../services/MartAdminService';
import Alert, { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS, ALERT_TYPE_WARNING } from '../../../../../components/Common/Alert';
import { Table } from 'reactstrap';

const ConfigureBulkOrderProducts = (props) => {
  const [productIds, setProductIds] = useState([]);
  const [productId, , , , handleOnChange, ,] = useInputField("ALPHANUMERICWITHOUTSPACE", 8);
  const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
  const breadCrumbAction = BreadCrumbAction();
  let removeProductId = null;
  const productIdPattern = /^([A-Za-z A-Za-z _ 0-9]){4}([0-9]){4}$/;
  useEffect(() => {
    breadCrumbAction.pushBreadCrumbs({ name: 'Configure BulkOrder Products', url: props.location.pathname });
  }, [ productIds ]);

  const closeAlertMessage = () => {
    setAlertInfo({ message: "", type: "" });
  }

  const doAction = (e, obj) => {
    e.preventDefault();
    if (e.target.name === 'REMOVE') {
      removeProductId = obj;
    }
    if(!productIdPattern.test(productId)){
      setAlertInfo({message:'invalid productId',type : ALERT_TYPE_WARNING});
      return;
    }
    MartAdminService().addOrRemoveBulkProductId({ bulkProductID: productId, action: e.target.name }).then(response => {
      if (response.statusCode == 'SUCCESS') {
        if (e.target.name != 'REMOVE' && !productIds.includes(productId)) {
          setProductIds([...productIds, productId]);
        } else {
          let index = productIds.indexOf(removeProductId);
          if (index > -1) {
            productIds.splice(index, 1);
            setProductIds([...productIds]);
          }
        }
        setAlertInfo({ message: 'configuration saved successfully', type: ALERT_TYPE_SUCCESS});
      } else {
        setAlertInfo({ message:  response.message, type: ALERT_TYPE_ERROR });
      }
    }).catch(error => {
      console.log(error);
    })
  }
  return (
    <>
    <Alert alertInfo={alertInfo} onDurationEnd={closeAlertMessage} duration='5000' />
      <section>
        <h1 className='h5 p-3 border-bottom'>Configure BulkOrder Products</h1>
        <div className='p-3'>
          <div className='d-flex'>
            <div class="form-group has-float-label px-0 form-group-error mb-0 d-flex">
              <input type="text" className="form-control" placeholder=" " name="productIds" value={productId} maxLength={8} onChange={event => { handleOnChange(event) }} />
              <label htmlFor="productIds">Enter Product Id</label>
              <p className="d-none">Enter Valid Product ID</p>
              <button type="submit" className="btn btn-brand-gradient ml-3 px-5 rounded-pill" name="ADD" onClick={e => { doAction(e, '') }}>ADD</button>
            </div>
          </div>
          {productIds.length > 0 &&
        <div className='mt-3 w-25'>
          <Table bordered>
            <thead>
              <tr>
                <th>BulkOrder ProductId</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {productIds.map(obj => {
                return (
                  <tr>
                    <td className='text-center'>{obj}</td>
                    <td><button type="submit" className="btn btn-brand-gradient px-5 rounded-pill" name="REMOVE" onClick={e => { doAction(e, obj) }}>REMOVE</button></td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>}
        </div>
       
      </section>
      
    </>
  )
}
export default ConfigureBulkOrderProducts;