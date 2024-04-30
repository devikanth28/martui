import React from "react";

const AdminUserConfiguration = () => {
    return (
        <React.Fragment>
            <section className="admin-screen container">
                <div className="py-3">
                    <h1 className="h5">Admin User Configuration</h1>
                        <form className="d-flex justify-content-center align-items-baseline">
                            <p className="mr-2">
                                Enter Customer ID  
                            </p>
                            <div>
                                <div className="each-group has-float-label form-group-error">
                                <input className="form-control w-100" id="customerId" name="customerId" placeholder=" " type="text"/>
                                <label htmlFor="customerId">
                                    Customer Id
                                </label>
                                <p className="d-none">Enter Valid Customer ID</p>
                                </div>
                            </div>
                            <div>
                                <button type="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3 custom-btn-lg">
                                    Search
                                </button>
                            </div>
                        </form>
                        <div className="row px-3">
                            <div className="col-6 card">
                                <h6 className="pt-3">User Details</h6>
                                <div>
                                    <p>name:Nagachaitnya</p>
                                    <p>name:Samanth</p>
                                    <p>UserId:111111</p>
                                    <p>CustomerId:222222</p>
                                </div>
                            </div>
                            <div className="col-6 card">
                            <div className="pt-3">
                            <input type="checkbox" id="vehicle1" name="MartAdmin" value="Mart Admin"/>
  <label for="Mart Admin" className="ml-2"> Mart Admin</label><br/>
  <input type="checkbox" id="vehicle1" name="MartAdmin" value="Mart Admin"/>
  <label for="Mart Admin" className="ml-2"> Mart Admin</label><br/>
  <input type="checkbox" id="vehicle1" name="MartAdmin" value="Mart Admin"/>
  <label for="Mart Admin" className="ml-2"> Mart Admin</label><br/>
                                    <button type="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3 custom-btn-lg">
                                    Save
                                </button>
                                </div>
                            </div>
                        </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default AdminUserConfiguration;