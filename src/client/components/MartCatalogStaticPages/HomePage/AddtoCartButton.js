import React ,{useState} from "react";
import GetNotifiedPopover from "../ProductDetailPage/GetNotifiedPopover";

const AddtoCartButton = (props) => {
    const [loader,setLoader] = useState(props.isoutofStock);
    const [spinner,setspinner] = useState(false)
    const [open,setOpen] = useState(false)

    const handleOnClick =() => {
        setspinner(true)
        setLoader(true)
        setspinner(false)
        props.added(true)
    }
    return  (
        <React.Fragment>
             {!props.getNotified && <button role="button" type="button" className={(!loader || props.addedStatus) ? (props.addedStatus ? "btn btn-block btn-brand cursor-not-allowed  btn-lg" :props.classStyle) : "btn btn-block btn-secondary btn-lg cursor-not-allowed"} disabled={loader} onClick={()=>handleOnClick()}>
                   {spinner ? <React.Fragment>
                        <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                        <span className="sr-only"></span>
                    </React.Fragment>
                    : <React.Fragment>{!loader ? 
                        "Add to Cart" 
                        :
                        <React.Fragment>
                            {props.isoutofStock ? "Out of Stock" :"Added to Cart"} 
                        </React.Fragment>} 
                    </React.Fragment>}
            </button> }
            
            {props.getNotified && <React.Fragment><p className="mb-0 text-secondary text-right">out of stock
            </p>
                <button type="button" onClick={() => { setOpen(!open) }} className="btn btn-block btn-lg btn-outline-warning">
                    Get Notified
                </button></React.Fragment>}
            <GetNotifiedPopover open={open} setopen= {setOpen} />
        </React.Fragment>
    )
}
export default AddtoCartButton