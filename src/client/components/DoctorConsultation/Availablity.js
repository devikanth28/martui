import React from 'react';
import SelectClinic from './SelectClinic';
import SlotSelection from './SlotSelection';

const Availablity = (props) => {
    let title = "Select Consultation Type"
    if(props.isonline) {
        title = 'Online Consultation in x mins'
    } 
    if(props.iswalkin) {
        title = "Walk-in Consultation"
    }
    return (
        <React.Fragment>
            <section>
                <div className="px-3 py-2">
                    <p className={(!props.isonline && !props.iswalkin)?'':'mb-0'}><strong> {title} </strong></p>

                    {(!props.isonline && !props.iswalkin) && <div className="mb-2">
                        <button onClick={() => props.setStoreType('Online')} className={props.storeType =='Online' ?"btn btn-blue-shadow mr-3 px-4 custom-btn-lg active":"btn btn-blue-shadow mr-3 px-4 custom-btn-lg" }>Online Consultation in x mins</button>
                        <button onClick={() => props.setStoreType('Store')} className={props.storeType =='Store' ?"btn btn-blue-shadow px-4 custom-btn-lg active":"btn btn-blue-shadow px-4 custom-btn-lg"}>Walk-in Consultation</button>
                    </div> }
                </div>
                <hr className='mb-3 solid'/>
                {props.storeType == 'Store' && <SelectClinic/> }
                {props.storeType == 'Online' && <SlotSelection/> }
            </section>

        </React.Fragment>
    )
}
export default Availablity