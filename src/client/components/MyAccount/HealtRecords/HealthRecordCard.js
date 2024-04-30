import React, {useState,useEffect} from 'react';
import { Carousel, CarouselItem, CarouselControl } from 'reactstrap';
import HealthRecordZoom from '../../Checkout/Prescription/HealthRecordZoom';
import Image from '../../Common/Image';


const HealthRecordCard = (props) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [animating, setAnimating] = useState(false);
	const [isLightBoxOpen, setLightBoxOpen] = useState(false);
	const [imagesForZoom, setImagesForZoom] = useState([]);
	const [imageSlides, setImageSlides] = useState([]);


	const openLightBox = (index)=>{
        setLightBoxOpen(true);
        setActiveIndex(index);
    }

	useEffect(() => {
		setActiveIndex(0);
		let tempImagesForZoom = [];
		const tempImageSlides = props.healthRecordImages.map((eachImage, index) => {
			tempImagesForZoom.push(eachImage.imagePath);
			return (
				<CarouselItem onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} key={eachImage.imageId}>
					<Image className="pointer" onClick={() => openLightBox(index)} src={eachImage.thumbnailPath} height='128' handleError='' alt='Prescription'/>
				</CarouselItem>
			);
		});
		setImagesForZoom(tempImagesForZoom);
		setImageSlides(tempImageSlides);
	}, [props.healthRecordImages]);
	

	const nextHealthRecordImage = () => {
		if (animating) return;
		const nextIndex = activeIndex == props.healthRecordImages.length - 1 ? 0 : activeIndex + 1;
		setActiveIndex(nextIndex);
	}
	const previousHealthRecordImage = () => {
		if (animating) return;
		const nextIndex = activeIndex == 0 ? props.healthRecordImages.length - 1 : activeIndex - 1;
		setActiveIndex(nextIndex);
	}
	const getPresctiionType = (type) =>{
        let recordType = "";
        switch(type){
            case 'OPT':
                recordType = "Optical Prescriptions"
                break;
            case 'MED':
                recordType = "Medical Reports"
                break;
            case 'OTR':
                recordType = "Other Records"
                break;
            case 'PRE':
                recordType = "Medical Prescriptions"
                break;
            default:
                recordType="N/A"
                break;
		}
		return recordType;
	}
	const closeLightBox = () => {
		setLightBoxOpen(false);
	}
	return (
		<div className="each-health-record">
			<div className="card p-0">
				<Carousel className="previous-prescription-carousel" activeIndex={activeIndex} next={nextHealthRecordImage} previous={previousHealthRecordImage} >
					{imageSlides}
					<div className="sub-text">
						<div>
							{props.healthRecordImages.length > 1 && 
							<React.Fragment>
								<CarouselControl direction="prev" directionText="Previous" onClickHandler={previousHealthRecordImage}/>
								<CarouselControl direction="next" directionText="Next" onClickHandler={nextHealthRecordImage} />
							</React.Fragment> 
							}
						</div>
						{<HealthRecordZoom imageIndex={activeIndex} isLightBoxOpen={isLightBoxOpen} closeLightBox={closeLightBox} images={imagesForZoom} reactModalStyle={{"z-index":1060}}/>}
						<span className="prescription-count">{activeIndex+1}/{props.healthRecordImages.length}</span>
					</div>
				</Carousel>
				<div className="prescription-details-text">
					<p><span className="truncate">{props.healthRecord.recordName}</span></p>
					<p>Record ID:<span>{props.healthRecord.recordId}</span></p>
					<p>Patient:<span className="text-truncate">{props.healthRecord.patientName}</span></p>
					<p>Doctor:<span className="text-truncate">{props.healthRecord.doctorName}</span></p>
					<p>Type:<span className="text-truncate">{getPresctiionType(props.healthRecord.recordType)}</span></p>
				</div>
				<div className="btn-container">
					<button role="button" className="btn btn-sm" title="Edit prescription" data-toggle="modal" data-target="#edit-health-record" onClick={()=>{props.createOrEditHelathRecordModalToggle(false, props.healthRecord)}}>
						<svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
							<g transform="translate(-180.257 -249.084)">
								<rect fill="none" width="18" height="18" transform="translate(180.257 249.084)"/>
								<g transform="translate(180.258 249.086)">
									<path fill="#080808" d="M2.765,18A2.77,2.77,0,0,1,0,15.234V4.341A2.77,2.77,0,0,1,2.765,1.574H6.274a.6.6,0,0,1,0,1.208H2.763A1.566,1.566,0,0,0,1.208,4.346V15.234A1.568,1.568,0,0,0,2.759,16.8H13.648a1.567,1.567,0,0,0,1.564-1.563V11.725a.6.6,0,0,1,1.207,0v3.509A2.769,2.769,0,0,1,13.652,18ZM5.9,12.825a1.043,1.043,0,0,1-.727-1.281l.7-2.466a.605.605,0,0,1,.149-.269L14.177.649a2.265,2.265,0,0,1,3.172,0,2.261,2.261,0,0,1,0,3.174L9.215,11.98a.612.612,0,0,1-.278.152l-2.445.688-.313.042A1.067,1.067,0,0,1,5.9,12.825ZM7,9.528l-.6,2.041,2.022-.549.022-.007,6.9-6.922.063-.064L13.944,2.563Zm8.083-8.069-.269.242,1.452,1.454.215-.173.009-.008a1.035,1.035,0,0,0-1.407-1.514Z" transform="translate(-0.001 -0.001)"/>
								</g>
							</g>
						</svg>
						Edit
					</button>
					<button role="button" className="btn btn-sm ga-delete-health-record" title="delete prescription" data-toggle="modal" data-target="#delete-health-record" onClick={()=>{props.deleteHealthRecordModalToggle(props.healthRecord.recordId)}}>
						<svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18.001" viewBox="0 0 18 18.001">
							<g transform="translate(-180.258 -281.936)">
								<rect fill="none" width="18" height="18" transform="translate(180.258 281.936)"/>
								<g transform="translate(180.825 281.937)">
									<path fill="#080808" d="M4.72,18a2.583,2.583,0,0,1-2.564-2.59V3.6H.616a.617.617,0,0,1,0-1.234H5.088V2.194A2.183,2.183,0,0,1,7.26,0H10A2.187,2.187,0,0,1,12.17,2.2v.172h4.08a.617.617,0,0,1,0,1.234H15.1V15.41A2.584,2.584,0,0,1,12.538,18ZM3.375,15.409a1.353,1.353,0,0,0,1.344,1.355h7.819a1.353,1.353,0,0,0,1.344-1.354V3.6H3.375ZM6.311,2.2l0,.172h4.635V2.2A.958.958,0,0,0,10,1.234H7.258A.962.962,0,0,0,6.311,2.2Zm5.016,13.154a.647.647,0,0,1-.619-.675V7.34a.645.645,0,0,1,.619-.617h.023a.644.644,0,0,1,.645.614v7.392a.647.647,0,0,1-.645.621Zm-2.725,0a.648.648,0,0,1-.619-.675V7.336a.643.643,0,1,1,1.286,0v7.392a.647.647,0,0,1-.645.621Zm-2.723,0a.648.648,0,0,1-.62-.675V7.336a.643.643,0,1,1,1.287,0v7.392a.647.647,0,0,1-.645.621Z"/>
								</g>
							</g>
						</svg>
						Delete
					</button>
                </div>
				{props.healthRecord.recordType =='PRE' && props.locServiceAvailable  && <button role="button" className="btn btn-block text-brand hover-red"  title="Place Order" onClick={()=>props.requestForOrderPlacement(props.healthRecord.recordId)}>Place Order</button>} 
			</div>
			
		</div>
	);
}

export default HealthRecordCard