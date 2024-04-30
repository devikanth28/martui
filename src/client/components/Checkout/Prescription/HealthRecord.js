import React, {useState} from 'react';
import { Carousel, CarouselItem, CarouselControl } from 'reactstrap';
import HealthRecordZoom from './HealthRecordZoom';
import Image from '../../Common/Image';

const HealthRecord = (props) => {

	const [activeIndex, setActiveIndex] = useState(0);
	const [animating, setAnimating] = useState(false);
	const [isLightBoxOpen, setLightBoxOpen] = useState(false);
	const healthRecordImages = props.healthRecordImages;
	let imagesForZoom = [];

	const openLightBox = (index)=>{
        setLightBoxOpen(true);
        setActiveIndex(index);
    }

	const imageSlides = healthRecordImages.map((eachImage, key) => {
		imagesForZoom.push(eachImage.imagePath);
		return (
			<CarouselItem onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} key={eachImage.imageId}>
				 <Image className="pointer" onClick={() => openLightBox(key)} src={eachImage.thumbnailPath} height='100' handleError='' alt='Prescription'/>
			</CarouselItem>
		);
	});

	const nextHealthRecordImage = () => {
		if (animating) return;
		const nextIndex = activeIndex === healthRecordImages.length - 1 ? 0 : activeIndex + 1;
		setActiveIndex(nextIndex);
	}

	const previousHealthRecordImage = () => {
		if (animating) return;
		const nextIndex = activeIndex === 0 ? healthRecordImages.length - 1 : activeIndex - 1;
		setActiveIndex(nextIndex);
	}

	const closeLightBox = () => {
		setLightBoxOpen(false);
	}

	return (
		<Carousel className="previous-prescription-carousel" activeIndex={activeIndex} next={nextHealthRecordImage} previous={previousHealthRecordImage} >
			{imageSlides}
			<div className="sub-text">
				{healthRecordImages.length > 1 && 
					<div>
						<CarouselControl direction="prev" directionText="Previous" onClickHandler={previousHealthRecordImage}/>
						<CarouselControl direction="next" directionText="Next" onClickHandler={nextHealthRecordImage} />
					</div>
				}
				{<HealthRecordZoom imageIndex={activeIndex} isLightBoxOpen={isLightBoxOpen} closeLightBox={closeLightBox} images={imagesForZoom} reactModalStyle={{"z-index":1060}}/>}
				<span className="prescription-count">{activeIndex+1}/{healthRecordImages.length}</span>
			</div>
		</Carousel>
	);
}

export default HealthRecord