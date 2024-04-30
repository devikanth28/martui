import React from 'react'

const  DoctorDetailStercturedData=(props)=> {
    let name=props.name;
    let image=props.image;
    let jobTitle=props.jobTitle;
    let qualification=props.qualification;
    let experience=props.experience;
    let registrationNumber=props.registrationNumber;
    let addressname=props.addressname;
    let avail=props.avail;
     let desc=props.desc;


     let job=jobTitle.toString();
     let quali=qualification.toString();

    const sData={
        "@context": "https://schema.org",
        "@type":"person",
        "name":name,
        "image":image,
    }
    const Qualification={
        "@type":"Occupation",
        "educationRequirements":quali,
        "name":job,
    }
    const RegisterNo={
        "@type":"DefinedTerm",
        "termCode":registrationNumber
    }
    const clinicAddress={
        "@type":"postalAddress",
        "addressLocality":addressname        
    }
    const Availability={
        "@type":"ContactPoint",
        
    }
    if(desc){
        sData["Description"]=desc
    }
   
    avail == 'T' ? Availability["contactType"]="Online Consultation" : (avail == 'W' ? Availability["contactType"]="Walk-In Consultation" : Availability["contactType"]="Online and Walk-In Consultations")
    if(addressname){

        sData["address"]={...clinicAddress}
    }
    sData["hasOccupation"]={...Qualification}
    sData["jobTitle"]={...RegisterNo}
    sData["ContactPoint"]={...Availability}
    
    return (
        <div>
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(sData)}}></script>
        </div>
    )
}

export default DoctorDetailStercturedData