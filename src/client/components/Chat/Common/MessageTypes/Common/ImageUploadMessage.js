import React, { useState, useRef, useEffect } from "react";
import { compressImages } from "../../../../../helpers/CompressImages";
import imageProcessService from '../../../../../services/ImageProcessService';
import "../../../css/ImageUpload.css";

/**
 * Functional component for ImageUploadMessage
  @param {} props
 */

const ImageUploadMessage = (props) => {

    const addMoreImages = useRef({});
    const [imageData, setImageData] = useState([]);
    const [showSubmitButton, setShowSubmitButton] = useState(false);
    const [showButtonLoader, setShowButtonLoader] = useState(false);
    let delayImageSubmit = 2000; //delay after uploading to image server in ms
    const CUSTOMER_COMPLIANT_IMAGE_TYPE = "T"; //image type to be uploaded for image server
    const IMAGE_SERVER_ERROR_MESSAGE = "An unexpected error occurred. Please try uploading the image again.";
    const MAX_NUMBER_OF_FILES = props.message.blocks ? props.message.blocks.maxImageCount ? props.message.blocks.maxImageCount : 2 : 2; // max number of images allowed for each product 
    const MAX_FILE_SIZE = 10; // max size of original image in mb
    const MAX_FILES_SIZE = 4; // max size of all images after compression in mb

    useEffect(()=>{
        props.scrollBottom();
    },[imageData]);

    /**
     * method to invoke upload more images
     * @param {*}  
     */
    const uploadMoreImages = () => {
        if (addMoreImages.current && !showButtonLoader) {
            if(imageData.length == MAX_NUMBER_OF_FILES){
                props.updateInputData({ data: {}, isValid: false, type: "image", errorMessage: `You can upload max. ${MAX_NUMBER_OF_FILES} images` });
                return;
            }else{
                addMoreImages.current.click();
            }
        } 
    }

    /**
     * method to upload multiple image files
     * @param {*} e 
     */
    const uploadMultipleFiles = async (e) => {
        let filesToUpload = e.target.files;
        let imageFiles = [...imageData];
        imageFiles.length > 0 ? setShowSubmitButton(true) : setShowSubmitButton(false);
        if (imageFiles.length + filesToUpload.length > MAX_NUMBER_OF_FILES) {
            props.updateInputData({ data: {}, isValid: false, type: "image", errorMessage: `You can upload max. ${MAX_NUMBER_OF_FILES} images` });
            return;
        }
        for (const file of filesToUpload) {
            if (file.type != "image/jpeg" && file.type != "image/png") {
                props.updateInputData({ data: {}, isValid: false, type: "image", errorMessage: "Only JPG, JPEG and PNG types are accepted" });
                return;
            } else if(file.size/(1024*1024) > MAX_FILE_SIZE ){
                props.updateInputData({ data: {}, isValid: false, type: "image", errorMessage: "Please upload each image of size 10mb or less" });
                return;
            }
        }
        setImageData([...imageFiles,...filesToUpload]);
        props.updateInputData({ data: {}, isValid: true, type: "image", errorMessage: null });
        setShowSubmitButton(true);
    }

    /**
     * method to remove selected image
     * @param {} event 
     * @param {*} key 
     */
    const removeImage = (key) => {
        let images = [...imageData];
        images.splice(key, 1);
        if (images.length < 1) {
            props.updateInputData({ data: {}, isValid: false, type: "image", errorMessage: "Kindly upload at least one image" });
            setShowSubmitButton(false);
        } else if (images.length > 0 && images.length <= MAX_NUMBER_OF_FILES) {
            props.updateInputData({ data: {}, isValid: true, type: "image", errorMessage: null });
            setShowSubmitButton(true);
        }
        setImageData(images);
    }

    /**
    * method to submit images to upload into image server 
    * @param {} 
    */
    const submitImages = () => {
        setShowButtonLoader(true);
        props.updateInputData({ data: {}, isValid: true, type: "image", errorMessage: null });
        compressImages(imageData, MAX_FILES_SIZE).then(async (compressedImages) => {
            if(!compressedImages || !compressedImages.length) {
                setShowButtonLoader(false);
                setShowSubmitButton(true);
                props.updateInputData({ data: {}, isValid: false, type: "image", errorMessage: "Please upload images of size 4mb or less" });
                return;
            } ;
            let totalSizeAfterCompression = 0;
            compressedImages.map((eachfile)=>{
                totalSizeAfterCompression += eachfile.size;
            })
            if(totalSizeAfterCompression > (MAX_FILES_SIZE * 1000000)){
                setShowButtonLoader(false);
                setShowSubmitButton(true);
                props.updateInputData({ data: {}, isValid: false, type: "image", errorMessage: "Please upload images of size 4mb or less" });
            } else {
                await imageProcessService().uploadFilesToImageServerForChat(compressedImages, CUSTOMER_COMPLIANT_IMAGE_TYPE, {}).then((response) => {
                    if (response && response.imageServerUrl && response.uploadedData && response.uploadedData.statusCode == "SUCCESS" && response.uploadedData.response) {
                        const uploadedData = response.uploadedData.response ;
                            uploadedData.map(image => {
                                image.thumbnailPath = response.imageServerUrl + "/" + image.thumbnailPath;
                                image.imagePath = response.imageServerUrl + "/" + image.imagePath;
                            });
                            setTimeout(() => {
                                props.sendMessage(props.message, uploadedData, { type: "image", value: uploadedData });
                            }, delayImageSubmit);
                    } else {
                        setShowButtonLoader(false);
                        setShowSubmitButton(true);
                        props.updateInputData({ data: {}, isValid: false, type: "image", errorMessage: IMAGE_SERVER_ERROR_MESSAGE });
                    }
                }).catch((error) => {
                    setShowButtonLoader(false);
                    setShowSubmitButton(true);
                    props.updateInputData({ data: {}, isValid: false, type: "image", errorMessage: IMAGE_SERVER_ERROR_MESSAGE });
                });
            }
        }).catch((error)=>{
            setShowButtonLoader(false);
            setShowSubmitButton(true);
            props.updateInputData({ data: {}, isValid: false, type: "image", errorMessage: error });
        });
    }

    return (
        <React.Fragment>
            <button className="btn mt-3 add-more-btn" onClick={event => uploadMoreImages(event)}>{(imageData.length > 0) ? "Add More Images" : "Add Images"}</button>
            <input type="file" id="imageUpload" name="imageUpload" accept="image/*" ref={addMoreImages} onClick={e => e.target.value = ''} onChange={async event => await uploadMultipleFiles(event)} multiple hidden />
            {imageData &&
                <div class="image-upload-container">
                    <div className="image-content">
                        {imageData.map((imgData, index) => {
                            return (
                                <div class="image-upload " key={index}>
                                    <p class="text-dark text-truncate">{imgData.name}</p>
                                    {!showButtonLoader &&
                                        <a title='Remove' className="remove" onClick={() => removeImage(index)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12.828 12.828"><g data-name="Symbol Symbol 77 â 1" transform="translate(-144.086 -752.086)"><line id="Line_24" data-name="Line 24" x2="10" y2="10" transform="translate(145.5 753.5)" fill="none" stroke="#e71c37" stroke-linecap="round" stroke-width="2"></line><line id="Line_25" data-name="Line 25" x2="10" y2="10" transform="translate(145.5 763.5) rotate(-90)" fill="none" stroke="#e71c37" stroke-linecap="round" stroke-width="2"></line></g></svg>
                                        </a>
                                    }
                                </div>
                            )
                        })}
                    </div>
                </div>
            }
            <div className="pt-2">
                {showSubmitButton &&
                    <button style={{minWidth : "60px"}} className="float-right p-2" disabled={showButtonLoader} onClick={() => submitImages()}>
                        {showButtonLoader ? "" : "Submit"}
                        {showButtonLoader &&
                            <React.Fragment>
                                <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                <span className="sr-only"></span>
                            </React.Fragment>
                        }
                    </button>
                }
            </div>
        </React.Fragment>
    );
};
export default ImageUploadMessage;
