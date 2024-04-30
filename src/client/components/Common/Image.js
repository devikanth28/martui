import React, { Component } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import DefaultBanner from '../../images/image-load.gif';
import DefaultBanner1 from '../../images/npa.png';
import KymNPAImage from '../../images/npa-dark.svg';
import DefaultBannerWithText from '../../images/npa-with-text.svg';
import Validate from '../../helpers/Validate';

export default class Image extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageLoaded: false,
            animateImage: false,
            classNames : props.className ? props.className : ''  ,
            opacityTransition: 2,
            ...this.props };
        this.onVisibilityChange = this.onVisibilityChange.bind(this);
    }

    onVisibilityChange(isVisible) {
        if (isVisible && !this.state.imageLoaded) {
            this.setState({ imageLoaded: true});
        }
    }

    onLoad(e){
        var src = e.target.src;
        if(src && src.indexOf("image-load") < 0){
            this.setState({ animateImage: true});
        }
        if(this.props.handleError && (this.props.isPharmaProduct) && src && src.indexOf("npa") > 0){
            this.props.handleError(); 
        }
    }

    handleError(e){
        e.target.onerror = null;
        if(this.props.showNpaWithText){
            e.target.src= DefaultBannerWithText;
        }else if(this.props.showKymNpa){
            e.target.src= KymNPAImage;
        } else {
            e.target.src= DefaultBanner1
        }
        if(Validate().isNotEmpty(this.props.onErrorClassName)){
            this.state.classNames = this.state.classNames + " "+this.props.onErrorClassName;
        }
    }

    getSrc(src) {
        if (Validate().isEmpty(src)) {
            if (this.props.showNpaWithText) {
                return DefaultBannerWithText;
            }else if(this.props.showKymNpa){
                return KymNPAImage;
            } else {
                return DefaultBanner1
            }
        } else {
            return src
        }
    }

    render() {
        return (
            <VisibilitySensor active={!this.state.imageLoaded} partialVisibility={true} onChange={this.onVisibilityChange}>
            <img className={this.state.classNames} title={this.props.title}
                src={ this.getSrc(this.props.src)}
                srcSet={this.props.srcSet} onClick={this.props.onClick} 
                alt={this.props.alt} style={{ ...this.props }} height={this.props.height} 
                width={this.props.width} onLoad={(e)=>this.onLoad(e)} 
                onError={(e)=>{this.handleError(e)}} />
            </VisibilitySensor>
        )
    }
}