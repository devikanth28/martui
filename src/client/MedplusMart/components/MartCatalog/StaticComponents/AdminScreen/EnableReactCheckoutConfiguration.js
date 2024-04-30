import React, { useEffect, useState } from 'react'
import Switch from 'react-switch';
import BreadCrumbAction from '../../../../../../redux/action/BreadCrumbAction';
const EnableReactCheckoutConfiguration = (props) => {
    const [switchValue, setSwitchValue]=useState(false);
    const breadCrumbAction = BreadCrumbAction();
      const handleSwitch = () =>{
        setSwitchValue(!switchValue)
      }
      
      useEffect(() => {
        console.log("switchValue",switchValue)
      }, [switchValue]);

      useEffect(()=>{
        breadCrumbAction.pushBreadCrumbs({ name: 'Enable React Checkout', url: props.location.pathname });
      },[])
    
  return (
    <section>
      <h1 className="h5 p-3 header">Emergency Message Configuration</h1>
      <div className='d-flex p-3'>
        <label className='mr-3'>Enable React Checkout</label>
        <Switch 
        checked={switchValue}
        onChange={()=>{handleSwitch()}}
        // onBlur={(checked, event, id) => { action(checked,event) }}
        onColor="#A0DFD4"
        offColor='#C4C8CB'
        onHandleColor="#11B094"
        handleDiameter={18}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={12}
        width={28}
        // id={id}
        // className={message ? `${className || ''} is-invalid` : (className || '')}
        />
        </div>
    </section>
  )
}

export default EnableReactCheckoutConfiguration