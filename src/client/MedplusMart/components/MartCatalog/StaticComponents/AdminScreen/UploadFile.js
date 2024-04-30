import React, { useEffect } from 'react';
import BreadCrumbAction from '../../../../../../redux/action/BreadCrumbAction';

const UploadFile = (props) => {

  const breadCrumbAction = BreadCrumbAction();

  useEffect(()=>{
    breadCrumbAction.pushBreadCrumbs({ name: 'upload Customer Session File', url: props.location.pathname });
  },[])

  return (
    <section class="p-3 container">
      <h1 className='h5 mb-3'>Upload file for Customer Session</h1>
      <div className='text-center '>
        <span>Upload File</span>
        <input type="File" className='p-2 ml-2'/>
        <button type="button" className="btn btn-brand-gradient rounded-pill px-5 custom-btn-lg">Submit</button>
      </div>
    </section>
  )
}

export default UploadFile