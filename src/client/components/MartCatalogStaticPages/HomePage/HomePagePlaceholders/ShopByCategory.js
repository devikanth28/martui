import React, { useEffect, useState } from 'react'
const ShopByCategory = () => {
    const [ghostimg, setGhostimg] = useState([]);
    useEffect(()=>{
        if(window.screen.width >= 1680 && window.screen.width <= 1920){
            setGhostimg([1,2,3,4,5,6,7]);
        }
        if(window.screen.width >=1280 && window.screen.width <=1440){
            setGhostimg([1,2,3,4,5,6]);
        }
    }, [])
    return(
        <div style={{"background":"#fff"}} className='mb-4'>
                <div className="ph-row ph-item p-0 m-0  ml-3 my-3"><div className="ph-col-2 mt-4 m-0" style={{ "height":"1.5rem" }}></div></div>
                <div className="home-page-slider-container condition-based-test-slider pt-3 d-flex justify-content-between mx-5">
                    {ghostimg.map((index,value) => {
                        return (
                            <React.Fragment>
                            <div className="mx-2">
                                <div className="card border-0">
                                    <div className="card-body p-2">
                                        <div className="img-container border" style={{ "height":"8.75rem","width":"8.75rem" }}>
                                            <div className="ph-row m-4">
                                                <div className="ph-picture ph-item rounded-circle m-0" style={{"height":"6rem","width":"6rem" }}></div>
                                            </div>
                                        </div>
                                        <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-12 m-0"></div></div>
                                    </div>
                                </div>
                           
                            </div>
                            </React.Fragment>
                        )
                        
                    })}
                </div>
                
            </div> )
}
export default ShopByCategory