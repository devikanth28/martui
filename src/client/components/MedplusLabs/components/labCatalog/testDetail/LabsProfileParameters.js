import React, { useState } from "react"

const LabsProfileParameters = (props) => {

    const [loadmore, setLoadMore] = useState(false)
    return (
        <React.Fragment>
            <div className="lab-test-included">
                <section className="shadow-none">
                    {(props.testParameters && (props.testParametersCount > 0)) &&
                        <h5 className="heading">Includes {props.testParametersCount} parameter{props.testParametersCount > 1 && "s"}</h5>
                    }
                    <ul className="list-group">
                        {props.testParameters && props.testParameters.map((value, index) => {
                            return (<li className="list-group-item p-0">
                                <span id={'ProfileParameter' + index} title={value} className="header-tabs text-dark font-14 py-2 px-3" href="javascript:void(0)" >
                                    {value}
                                </span>
                            </li>)
                        })}
                    </ul>
                </section>
            </div>
        </React.Fragment>
    )
}
export default LabsProfileParameters


