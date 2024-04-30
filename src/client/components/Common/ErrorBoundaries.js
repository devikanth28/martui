import React, { Component } from 'react';
import SomeThingWentWrong from "../../images/common/SomeThing-Went-Wrong.svg"
import CommonHeaderService from '../../services/CommonHeaderService';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  componentDidCatch(error, errorInfo) {
    CommonHeaderService().sendErrorLog({error : JSON.stringify({[error.message] : error.stack})}).catch(apiError => {
        console.log(apiError);
    })
    this.setState({
      error: error,
      errorInfo: errorInfo
    })

  }

  componentWillReceiveProps(nextProps){
    if(this.props.location.pathname !== nextProps.location.pathname){
      this.setState({
        error: null,
        errorInfo: null
      })
    }
   
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <section className='body-height d-flex align-items-center justify-content-center w-100 mt-3'>
          <div className='text-center m-3'>
          <img src={SomeThingWentWrong} alt="Some Thing Went Wrong" className="mb-2" height="150" />
          <p>Something went wrong! Try Again Later</p>
          </div>
        </section>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary