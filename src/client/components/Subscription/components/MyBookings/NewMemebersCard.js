import React from 'react'

const  NewMemebersCard = (props) => {
    return (
        <div className="card">
            <div className="card-body p-3 float-right">
                <h6 className="mb-2">Adding new member</h6>
                {/* <p className="small text-secondary mb-4">Tag line of benefits</p> */}
                <p className="small mb-4">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete.</p>
                <button className="btn btn-dark px-4 shadow" onClick={() => props.history.push("/LabBookings")}>Add a member to plan</button>
            </div>
        </div>
    )
}

export default NewMemebersCard;
