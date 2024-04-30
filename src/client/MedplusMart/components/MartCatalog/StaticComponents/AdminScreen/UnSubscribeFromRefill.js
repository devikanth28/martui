import React from 'react'

const UnSubscribeFromRefill = () => {
    const refillTypes=["Refill Id's","Cart Id's","Order Id's"]
  return (
      <section className='p-3 Admin-screen container'>
          <h1 className='h5 mb-4'>UnSubscribe From Refill</h1>
          <div>
            {refillTypes.map((each)=>{
                return(
                    <React.Fragment>
                        <div className='row justify-content-center'>
                            <p className='col-2'>{each}</p>
                        <div className="form-group has-float-label px-0 mb-3 form-group-error w-50 col-4">
                         <input type="text" class="form-control" placeholder=" " />
                            <label htmlFor="fullName">Enter {each} Id's Seperated With ,</label>
                        </div>
                            <button type="submit" class="btn mb-3 btn-brand-gradient ml-3 px-5 rounded-pill custom-btn-lg">Submit</button>
                        </div>
                    </React.Fragment>
                )
            })}
            </div>
      </section>
  )
}

export default UnSubscribeFromRefill