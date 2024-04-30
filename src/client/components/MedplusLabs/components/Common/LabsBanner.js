import React from "react";
import LabsBannerSlider from "./LabsBannerSlider";
import LabCatalogService from "../../Services/LabCatalogService";
import Validate from "../../../../helpers/Validate";

const LabsBanner = (props) => {
    const labCatalogService = LabCatalogService();
    const validate = Validate();
    const page = props.page;
    const screenLocation = props.screenLocation || '';
    const requestFor = props.requestFor;

    const [bannerDetails, setBannerDetails] = React.useState({});
    const [redirectValues, setRedirectValues] = React.useState(undefined);
    const [ghostImage, setGhostImage] = React.useState(true)

    React.useEffect(() => {
        setGhostImage(true)
        const obj = { REQUEST_OBJ: JSON.stringify({ 'requestFor': requestFor, 'pageName': page, 'screenLocation': screenLocation }) };
        labCatalogService.getLabCatalogBannerDetails(obj).then(data => {
            if (validate.isNotEmpty(data) && data.statusCode === "SUCCESS" && validate.isNotEmpty(data['dataObject'])) {
                setBannerDetails(data['dataObject']['bannerPromotion']['bannerPromoDetails']);
                setRedirectValues(data['dataObject']['redirectionUrls']);
            }
            setGhostImage(false)
        }).catch(err => {
            console.log("Error ::", err);
            setGhostImage(false)
        })
    }, []);
    if (ghostImage) {
        return (<div className="ph-row ph-item p-0 m-0 mb-4" style={props.fromProductDetail ? { marginBottom: "1.5rem" } : {}}>
            <div className="ph-picture mb-0" style={{ "height": "16.313rem" }}></div>
        </div>)
    } else {
        return (
            <div>
                {validate.isNotEmpty(props.title) && validate.isNotEmpty(bannerDetails[screenLocation.toUpperCase()]) && <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5 className="m-0">{props.title}</h5>
                </div>}
                <LabsBannerSlider packageSlider={props.packageSlider} slides={props.slides} banners={bannerDetails[screenLocation.toUpperCase()]} bannerRedirectionVals={redirectValues} history={props.history} screenLocation={screenLocation.toUpperCase()} ></LabsBannerSlider>
            </div>
        )
    }
}
export default LabsBanner;