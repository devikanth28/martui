import React, {useRef, useMemo} from 'react';
import { Progress } from 'reactstrap';
import DefaultKycSvg from '../../../images/common/default-kyc-image.svg';
import ImageLoad from "../../../images/image-load.gif";
import Validate from '../../../helpers/Validate';
import { photoIdInputMaxLength} from "../constants/SubscriptionConstants";

const UploadPhotoId = (props) => {

    const refs = useRef({});
    const validate = Validate();

    const getFileUrl = ( file ) =>{
        let url_to_file;
        if(file.type !="application/pdf")
            url_to_file=URL.createObjectURL(file);
        else
            url_to_file="PDFFILE";
        return url_to_file;
    }

    const imageUrl = useMemo(()=>{
        if(props.selectedFile) {
            return getFileUrl(props.selectedFile);
        }else{
            return "";
        }

    },[props.selectedFile])

    return (
        <React.Fragment>
            <div className="my-3">
                <div className="card upload-photo-id-card">
                    <div className="card-body p-2">
                        <div className="d-flex">
                            <BackGroundImage src={props.isDisplayProgressLoader ? ImageLoad : (props.selectedFile ? imageUrl : `${DefaultKycSvg}`)}/>
                            <div className="photo-id-container pt-2">
                                <div className="form-group has-float-label mb-3">
                                    <input name={props.id} id={props.id} value={props.kycRefNo} onChange={(e) => { props.handleOnChange(e) }}   maxLength={validate.isNotEmpty(props.kycType) && validate.isNotEmpty(photoIdInputMaxLength[props.kycType.kycType])?photoIdInputMaxLength[props.kycType.kycType]:"16"} placeholder=" " type="text" autoComplete="off" className={`form-control ${validate.isNotEmpty(props.errorMsg) ? "is-invalid" : ''}`} />
                                    <label htmlFor={props.id} className="select-label text-capitalize">Photo ID Number<sup className="text-danger"> *</sup></label>
                                    <div className="invalid-feedback">{props.errorMsg? props.errorMsg : ""}</div>
                                </div>
                                {!props.isDisplayProgressLoader &&
                                    <label htmlFor={props.labelName ? props.labelName : "file-select"}>
                                        <button  className="btn btn-block btn-outline-primary" onClick={e=>{refs.current['file-select'].click()}} >{props.selectedFile ? `Change Photo`:'Upload Photo'}</button>
                                        <input ref={element=>{refs.current['file-select'] = element}}  type="file" id="file-select" name="file-select" accept="image/*" onChange={e => props.uploadFile(e)} onClick={(event) => { event.target.value = null }} className={validate.isEmpty(props.errorMessage) ? "d-none" : "d-none is-invalid"}/>
                                        <div className="invalid-feedback">{props.errorMessage}</div>
                                    </label>
                                } 
                                {props.isDisplayProgressLoader && validate.isNotEmpty(props.percentCompleted) && (parseInt(props.percentCompleted) >= 0) && (parseInt(props.percentCompleted) < 100) && 
                                    <div className="file-upload-progress">
                                        <Progress className="upload-progress-bar" barClassName="bar" color="success" value={props.percentCompleted}><span className="sr-only percent">0% Complete</span></Progress>
                                        <small className="file-uploading-text w-100 d-flex justify-content-between">Uploading... <span className="text-dark ml-1 percent">{props.percentCompleted + "%"}</span></small>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <small className="text-secondary">Supported Files: jpeg/jpg/png, Size upto 4MB</small>
            </div>
        </React.Fragment>
    );
}

export  const  BackGroundImage = (props) => {
    const source = useMemo(()=>{
        return props.src;
    },[props.src]);

    return (
        <React.Fragment>
           <div className="bg-gray-light border rounded thumbnail-container" style={{backgroundImage:`url(${source})`}}/>
          </React.Fragment>
    )
};

export default UploadPhotoId;