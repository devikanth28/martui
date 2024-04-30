import React from 'react'
import {Route} from 'react-router-dom'
import Body from '../Common/Body'
import ErrorBoundary from '../Common/ErrorBoundaries'
import ScrollToTop from '../Subscription/routes/ScrollToTop'

const MartPromoRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            <React.Fragment>
                 <Body routePath ={rest.routePath}>
                    <ErrorBoundary {...props}>
                    <ScrollToTop {...props}/>
                        <main role="main" className="container-fluid my-3">
                            <Component routePath = {rest.routePath} details ={rest.details} showCorporate ={rest.showCorporate}  {...props} />
                        </main>
                    </ErrorBoundary>
                </Body>
                
            </React.Fragment>
        )} />
    )
}

export default MartPromoRoute