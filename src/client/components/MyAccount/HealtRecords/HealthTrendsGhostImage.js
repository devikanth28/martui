import React from 'react'

const HealthTrendsGhostImage = () => {
  return (
    <div className='row mt-3'>
        {/* customer details commen for dashboard and recokner */}
    <div className='col-3 p-3'>
        <div className='ph-row ph-item py-0'>
            <div className='ph-col-8' style={{ "height": "2rem" }}></div>
        </div>
        {[1, 2, 3, 4, 5, 6, 7].map((each, key) => {
            return (
                <React.Fragment>
                    {key == 3 ? <div className='ph-row ph-item py-0'>
                        <div className='ph-col-10 py-3'></div>
                    </div> : <div className="ph-item ph-row mb-4 pt-2 pb-0">
                        <div className={`ph-col-8 ${each > 4 ? "mb-3" : ""}`}></div>
                        <div className="ph-col-4 empty"></div>
                        <div className="ph-col-6" style={{ "height": "1rem" }}></div>
                    </div>}
                </React.Fragment>
            )
        })}
    </div>
    {/* Dashboard */}
    <div className='col mr-3 ml-2'>
        <div className='ph-row ph-item p-0'>
            <div className='ph-col-2 rounded-pill mr-3' style={{ "height": "2rem" }}></div>
            <div className='ph-col-1 rounded-pill empty'></div>
            <div className='ph-col-2 rounded-pill' style={{ "height": "2rem" }}></div>
            <div className='ph-col-5 empty'></div>
            <div className='ph-col-2 rounded-pill' style={{ "height": "2rem" }}></div>
        </div>
        <div className='card parameter-card mb-4' style={{ "height": "350px" }}>
            <div className='ph-row ph-item p-0 m-3'>
                <div className='ph-col-2'></div>
                <div className='ph-col-6 empty'></div>
                <div className='ph-col-1 mr-4'></div>
                <div className='ph-col-1 mr-4'></div>
                <div className='ph-col-1 mr-4'></div>
                <div className="ph-col-4" style={{ "height": "1rem" }}></div>
            </div>
            <div className='d-flex justify-content-between align-items-baseline mr-3' style={{ "marginLeft": "5rem" }}>
                {
                    [1, 2, 3, 4, 5].map((value, key) => {
                        return (
                            <React.Fragment>
                                <div class="ph-picture ph-item p-0" style={{ "height": `${value % 2 == 0 ? "7rem" : "14rem"}`, "width": "4rem" }}></div>
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </div>
        <div className='card parameter-card mb-4'>
            <div className='p-3'>
                <div className='ph-row ph-item p-0'>
                    {[1, 2, 3, 4, 5, 6].map(() => {
                        return (
                            <React.Fragment>
                                <div className='ph-col-1'></div>
                                <div className='ph-col-1 empty'></div>
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
            <div className='p-3'>
                <div className='ph-row ph-item p-0'>
                    {[1, 2, 3, 4, 5, 6].map(() => {
                        return (
                            <React.Fragment>
                                <div className='ph-col-1'></div>
                                <div className='ph-col-1 empty'></div>
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
        </div>
        <div className='ph-row ph-item p-0'>
            <div className='ph-col-6' style={{ "height": "2rem" }}></div>
        </div>
        <div className='card parameter-card'>
            <div className='p-3'>
                <div className='ph-row ph-item p-0'>
                    {[1, 2, 3].map(() => {
                        return (
                            <React.Fragment>
                                <div className='ph-col-2'></div>
                                <div className='ph-col-2 empty'></div>
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
            <div className='p-3'>
                <div className='ph-row ph-item p-0'>
                    {[1, 2, 3].map(() => {
                        return (
                            <React.Fragment>
                                <div className='ph-col-2'></div>
                                <div className='ph-col-2 empty'></div>
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default HealthTrendsGhostImage