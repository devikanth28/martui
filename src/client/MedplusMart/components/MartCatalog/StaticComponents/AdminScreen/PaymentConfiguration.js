import React, { useEffect, useState } from 'react';
import Switch from 'react-switch';
import BreadCrumbAction from '../../../../../../redux/action/BreadCrumbAction';

const PaymentConfiguration = (props) => {
  const [switchValue, setSwitchValue] = useState([]);
  const breadCrumbAction = BreadCrumbAction();

  useEffect(()=>{
    breadCrumbAction.pushBreadCrumbs({ name: 'Payment Configuration', url: props.location.pathname });
  },[])

  const handleSwitch = (id) => {
    if (switchValue.includes(id)) {
      let updatedArray = switchValue.filter((currentId) => currentId !== id);
      setSwitchValue(updatedArray);
    } else {
      setSwitchValue([...switchValue, id]);
    }
  };

  useEffect(() => {
    console.log("switchValue: ", switchValue);
  }, [switchValue]);

  const paymentMethods = [
    { id: "PAYU", label: "PAYU" },
    { id: "PhonePe", label: "PhonePe" },
    { id: "PhonePeMax", label: "PhonePe Max" },
    { id: "Reliance", label: "Reliance Jio" },
    { id: "Amazon", label: "Amazon Pay" },
  ];

  return (
    <React.Fragment>
      <section>
        <h1 className="border-bottom h5 mb-0 p-3">Online Payment Configuration</h1>
        <div className="row p-3">
          <div className="col-6">
            <div className="card p-3">
              <h6>Mart</h6>
              <div className="d-flex flex-wrap">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="d-flex align-items-center mb-3 w-50">
                    <p className="mb-0 w-25">{method.label}</p>
                    <Switch
                      checked={switchValue.includes(method.id)}
                      onChange={(checked, event) => handleSwitch(method.id)}
                      onColor="#A0DFD4"
                      offColor="#C4C8CB"
                      onHandleColor="#11B094"
                      handleDiameter={18}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={12}
                      width={28}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card p-3">
              <h6>Mobile</h6>
              <div>
                <textarea className="col border" rows="6" placeholder="Emergency Message" />
                <button
                  type="button"
                  role="button"
                  className="btn-brand-gradient btn px-5 rounded-pill custom-btn-lg ml-3"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default PaymentConfiguration;
