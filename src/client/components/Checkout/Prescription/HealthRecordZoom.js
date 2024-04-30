import React, {useState, useEffect} from 'react';
import ImageLightBox from '../../Common/ImageLightBox/ImageLightBox';
import './../../Common/ImageLightBox/LightBoxStyle.css';

const HealthRecordZoom = (props) => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setImageIndex(props.imageIndex);
  }, [props.imageIndex]);

    

  return (
    <div>
      {props.isLightBoxOpen &&
        <ImageLightBox imageIndex={imageIndex} prescImages={props.images}
          mainSrc={props.images[imageIndex]}
          nextSrc={props.images[(imageIndex + 1) % props.images.length]}
          prevSrc={props.images[(imageIndex + props.images.length - 1) % props.images.length]}
          onCloseRequest={() => props.closeLightBox()}
          onMovePrevRequest={() => setImageIndex((imageIndex + props.images.length - 1) % props.images.length)}
          onMoveNextRequest={() => setImageIndex((imageIndex + 1) % props.images.length)}
        />
      }
    </div>
  );
}

export default HealthRecordZoom;
