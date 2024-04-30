const IMAGE_SERVER_ERROR_MESSAGE = "An unexpected error occurred. Please try uploading the image again.";

export const compressImages = (imageData, maxSizeInMb) => {
    return new Promise((resolve, reject) => {
        try {
            let totalImageSize = 0
            imageData.map(eachFile=> {
                totalImageSize = totalImageSize + eachFile.size;
            })
            const compressedImageData = imageData.map(eachFile =>resize(eachFile, parseFloat(parseFloat((eachFile.size * maxSizeInMb * 1000000)/totalImageSize).toFixed(2)/eachFile.size).toFixed(2)));
            Promise.all(compressedImageData).then(compressedImages => {
                resolve(compressedImages);
            }).catch((error)=>{
                reject(IMAGE_SERVER_ERROR_MESSAGE);    
            });
        } catch (error) {
            reject(IMAGE_SERVER_ERROR_MESSAGE);
        }
    })
}

const resize = (file, quality) => {
    return new Promise((resolve, reject) => {
        if( quality > 1 ) {
            resolve(file);return;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            var dataUrl = event.target.result;
            var image = new Image();
            image.src = dataUrl;
            image.onload = () => {
                var resizedDataUrl = resizeImage(image, quality); 
                saveBlob(resizedDataUrl,file.name, resolve);
            };
            image.onerror = () =>{
                resolve(file);
            }
        };
        reader.onerror = () => {
            resolve(file);
        }
    });
}

const resizeImage = (image, quality) => {
    quality = parseFloat(quality);
    var canvas = document.createElement('canvas');
    var width = image.width;
    var height = image.height;
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, width, height);
    return canvas.toDataURL("image/jpeg", quality);
}

const saveBlob = (dataURI, name, resolve) => {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], {type: mimeString});
    let file = new File([blob], name, {type: mimeString});
    resolve(file);
}