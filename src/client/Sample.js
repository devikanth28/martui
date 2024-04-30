import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

class Sample extends Component{
showLoader = false;

constructor(props){
      super(props);
}
render(){
      if(this.showLoader){
            return(
                  <React.Fragment>
                     <div>Loading...</div>
                  </React.Fragment>
               );
      }else{
            return(
                  <React.Fragment>
                     <div>Sample Page</div>
                  </React.Fragment>
               );
      }
   }
}
export default withRouter(Sample);



