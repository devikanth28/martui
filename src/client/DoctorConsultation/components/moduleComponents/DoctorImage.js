import React from "react";
import Validate from "../../../helpers/Validate";
import Image from "../../../components/Common/Image";
import { getConsultationString } from "../../constants/DoctorConsultationConstants";

export default (props) => { 

    const doctorInfo = props.doctorInfo;
    const height =  props.height ? props.height : "80";
    if (Validate().isEmpty(doctorInfo))
        return <React.Fragment></React.Fragment>
        
    return <React.Fragment>
        <Image alt={"Dr. " +doctorInfo.name} className={props.className} src={doctorInfo.profile} title={"Dr. " +doctorInfo.name} height={height} width={props.width} onErrorClassName={"h-auto w-auto"}/>
    </React.Fragment>
}