import React , {Component, PureComponent} from 'react';

export default class HiddenForm extends PureComponent{
    componentDidMount(){
        if(this.props.formData != undefined){
            document.getElementById(this.props.formData.formId).submit();
        }
    }
    render(){
        var inputs = [];
        if(this.props.formData != undefined){
            var inputArray = this.props.formData.inputArray;
            for( var i = 0; i < inputArray.length; i++){
                inputs.push(<input key={i} type='hidden' name = {inputArray[i].name} value = {inputArray[i].value}/>);
            }
        }
        var styles = {};
        this.props.formData ? styles = {...this.props.formData.formStyle} : {};
        return(
            this.props.formData != undefined ?
                <form id={this.props.formData.formId} action={this.props.formData.formAction} method={this.props.formData.formMethod} style={styles}>
                    {inputs}
                </form>
            :
                <span></span>
        )
    }
}