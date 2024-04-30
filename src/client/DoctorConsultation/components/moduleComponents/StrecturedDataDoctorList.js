import React from 'react'


const StrecturedDataDoctorList=(props) => {
    let name=props.name;
    let image=props.image;
    let jobTitle=props.jobTitle;
    let qualification=props.qualification;
    let experience=props.experience;
    let visitType=props.visitType;
    let job=jobTitle.toString();
    let quali=qualification.toString();


    const Serv={
        "@context": "https://schema.org",
        "@type":"Service"
    }
    const sData={
        
        "@type":"Person",
        "name":name,
        "image":image,
        
    }
    const Qualification={
        "@type":"Occupation",
        "name":job,
        "educationRequirements":quali
    }
    const Experience={
        "@context": "https://schema.org",
        "@type":"jobposting",
       
        "experienceRequirements":experience
    }
    const Availabilit={
        "@type":"ContactPoint",
    }
    visitType='T' ? Availabilit["contactType"]="OnlineConsultation": (visitType='W' ? Availabilit["contactType"]='clinic Consultation': Availabilit["contactType"]='Online/Clinc')
    sData["hasOccupation"]={...Qualification}
    sData["ContactPoint"]={...Availabilit}
    Serv["provider"]={...sData}
    return (
        <div>
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(sData)}}></script>
        </div>
    )
}

export default StrecturedDataDoctorList