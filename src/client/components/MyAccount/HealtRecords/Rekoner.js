import React from 'react'

const Rekoner = () => {
    let colours = ['#11B09433', '#11B09466', '#11B09499', '#11B094CC', '#11B094']
    return (
        <React.Fragment>
           <div className="align-items-center d-flex justify-content-between  mt-3">
           <h5 className="col p-0 mb-0">Test Names</h5>
            <div className="progress col-10 p-0">            
                {
                    colours.map((value,key)=>{
                        return(
                            <React.Fragment>                           
                            <div class="progress-bar col text-dark" style={{backgroundColor:`${value}`}}>{key == 0 ? "Latest Value" :(colours.length-1 == key ? "Oldest Value":"")} </div>
                            </React.Fragment>
                        )
                    })
                }               
            </div>
           </div>
            <div className="row m-0 reckoner">
              {/**/}  <div class="card parameter-card w-100">
                    <h5 class="m-3">CBP</h5>
                    <div class="d-flex justify-content-between p-0">                                                 
                            <p class="text-secondary col">Hemoglobin </p>
                            <p class="card-title col">11.2% </p>
                            <p class="card-title col">1.2% </p>
                            <p class="card-title col">31.2% </p>
                            <p class="card-title col">1.2% </p>
                            <p class="card-title col">31.2% </p>                        
                    </div>
                    <div class="d-flex justify-content-between p-0">                                                 
                            <p class="text-secondary col">Basophil </p>
                            <p class="card-title col">11.2% </p>
                            <p class="card-title col">1.2% </p>
                            <p class="card-title col">31.2% </p>
                            <p class="card-title col">1.2% </p>
                            <p class="card-title col">31.2% </p>                      
                    </div>
                    <div class="d-flex justify-content-between p-0">                                                 
                            <p class="text-secondary col">Lymphocytes </p>
                            <p class="card-title col">11.2% </p>
                            <p class="card-title col">1.2% </p>
                            <p class="card-title col">31.2% </p>
                            <p class="card-title col">1.2% </p>
                            <p class="card-title col">31.2% </p>                     
                    </div>
                </div>
                <div class="card parameter-card w-100">                   
                        <div className="align-items-center d-flex justify-content-between py-2">
                            <h5 class=" col">Glucose Fasting Blood</h5>
                            <p class="card-title col">100.50mg/dL</p>
                            <p class="card-title col">80mg/dL </p>
                            <p class="card-title col">90mg/dL </p>
                            <p class="card-title col">80mg/dL </p>
                            <p class="card-title col">90mg/dL </p>
                        </div>                    
                </div>
                <div class="card parameter-card w-100">
                    <h5 class="m-3">Kidney Profile</h5>
                    <div class="d-flex justify-content-between p-0">                                                 
                            <p class="text-secondary col">Urea / Creatinine Ratio</p>
                            <p class="card-title col">10.50mg/dL </p>
                            <p class="card-title col">10.50mg/dL</p>
                            <p class="card-title col">10.50mg/dL </p>
                            <p class="card-title col">10.50mg/dL</p>
                            <p class="card-title col">10.50mg/dL </p>                      
                    </div>
                    <div class="d-flex justify-content-between p-0">                                                 
                            <p class="text-secondary col">Serum Creatinine</p>
                            <p class="card-title col">10.50mg/dL </p>
                            <p class="card-title col">10.50mg/dL</p>
                            <p class="card-title col">10.50mg/dL </p>
                            <p class="card-title col">10.50mg/dL</p>
                            <p class="card-title col">10.50mg/dL </p>                      
                    </div>
                </div>
                <div class="card parameter-card w-100">
                    <h5 class="m-3">LFT</h5>
                    <div class="d-flex justify-content-between p-0">                                                 
                            <p class="text-secondary col">Bilirubin</p>
                            <p class="card-title col">10.50mg/dL </p>
                            <p class="card-title col">10.50mg/dL</p>
                            <p class="card-title col">10.50mg/dL </p>
                            <p class="card-title col">10.50mg/dL</p>
                            <p class="card-title col">10.50mg/dL </p>                      
                    </div>
                </div>

                <div class="card parameter-card w-100">
                    <h5 class="m-3">Lipid Profile</h5>
                    <div class="d-flex justify-content-between p-0">                                                 
                            <p class="text-secondary col">Triglycerides</p>
                            <p class="card-title col">10.50mg/dL </p>
                            <p class="card-title col">10.50mg/dL</p>
                            <p class="card-title col">10.50mg/dL </p>
                            <p class="card-title col">10.50mg/dL</p>
                            <p class="card-title col">10.50mg/dL </p>                      
                    </div>
                    <div class="d-flex justify-content-between p-0">                                                 
                            <p class="text-secondary col">LDL</p>
                            <p class="card-title col">10.50mg/dL </p>
                            <p class="card-title col">10.50mg/dL</p>
                            <p class="card-title col">10.50mg/dL </p>
                            <p class="card-title col">10.50mg/dL</p>
                            <p class="card-title col">10.50mg/dL </p>                      
                    </div>
                </div>
            </div>
            <div>
                <div className='ph-row ph-item p-0'>
                    <div className='ph-col-2 py-3'></div>
                    <div className='ph-col-2 empty'></div>
                    <div className='ph-col-8 py-3'></div>
                </div>
                <div className='card parameter-card mb-4'>
                        <div className='p-3'>
                            <div className='ph-row ph-item p-0'>
                                <div className='ph-col-2 py-2'></div>
                            </div>
                            <div className='ph-row ph-item p-0'>
                                {[1,2,3,4,5,6].map(()=>{
                                    return(
                                        <React.Fragment>
                                            <div className='ph-col-1'></div>
                                            <div className='ph-col-1 empty'></div>
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                            <div className='ph-row ph-item p-0'>
                                {[1,2,3,4,5,6].map(()=>{
                                    return(
                                        <React.Fragment>
                                            <div className='ph-col-1'></div>
                                            <div className='ph-col-1 empty'></div>
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                            <div className='ph-row ph-item p-0'>
                                {[1,2,3,4,5,6].map(()=>{
                                    return(
                                        <React.Fragment>
                                            <div className='ph-col-1'></div>
                                            <div className='ph-col-1 empty'></div>
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='card parameter-card mb-4'>
                        <div className='p-3'>
                            <div className='ph-row ph-item p-0'>
                                <div className='ph-col-2 py-2'></div>
                            </div>
                            <div className='ph-row ph-item p-0'>
                                {[1,2,3,4,5,6].map(()=>{
                                    return(
                                        <React.Fragment>
                                            <div className='ph-col-1'></div>
                                            <div className='ph-col-1 empty'></div>
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                            <div className='ph-row ph-item p-0'>
                                {[1,2,3,4,5,6].map(()=>{
                                    return(
                                        <React.Fragment>
                                            <div className='ph-col-1'></div>
                                            <div className='ph-col-1 empty'></div>
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                            <div className='ph-row ph-item p-0'>
                                {[1,2,3,4,5,6].map(()=>{
                                    return(
                                        <React.Fragment>
                                            <div className='ph-col-1'></div>
                                            <div className='ph-col-1 empty'></div>
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='card parameter-card mb-4'>
                        <div className='p-3'>
                            <div className='ph-row ph-item p-0'>
                                <div className='ph-col-2 py-2'></div>
                            </div>
                            <div className='ph-row ph-item p-0'>
                                {[1,2,3,4,5,6].map(()=>{
                                    return(
                                        <React.Fragment>
                                            <div className='ph-col-1'></div>
                                            <div className='ph-col-1 empty'></div>
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                            <div className='ph-row ph-item p-0'>
                                {[1,2,3,4,5,6].map(()=>{
                                    return(
                                        <React.Fragment>
                                            <div className='ph-col-1'></div>
                                            <div className='ph-col-1 empty'></div>
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                            <div className='ph-row ph-item p-0'>
                                {[1,2,3,4,5,6].map(()=>{
                                    return(
                                        <React.Fragment>
                                            <div className='ph-col-1'></div>
                                            <div className='ph-col-1 empty'></div>
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
            </div>
        </React.Fragment>
    )   
}

export default Rekoner
