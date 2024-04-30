import React, { useEffect, useState } from 'react'
import Switch from 'react-switch';
import BreadCrumbAction from '../../../../../../redux/action/BreadCrumbAction';
const EnableNewOrderHistory = (props) => {
  const [switchValue, setSwitchValue] = useState(false);
  const breadCrumbAction = BreadCrumbAction();

  useEffect(()=>{
    breadCrumbAction.pushBreadCrumbs({ name: 'Enable New Order History', url: props.location.pathname });
  },[])

  const handleSwitch = () => {
    setSwitchValue(!switchValue)
  }


  return (
    <section>
      <h1 className="h5 p-3 header">Enable New Order History</h1>
      <div className='d-flex p-3'>
        <label className='mr-3'>Enable New Order History</label>
        <Switch
          checked={switchValue}
          onChange={() => { handleSwitch() }}
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

export default EnableNewOrderHistory