import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BreadCrumbAction from "../../redux/action/BreadCrumbAction";

const BreadCrumb = (props)=> {
        
    const breadCrumbAction = BreadCrumbAction(); 

    useEffect(()=>{
        breadCrumbAction.clearBreadCrumb();
    },[props.location.pathname]);

    const catalogs = {
            'Pharmacy' : { name : 'Pharmacy', url:'/pharmaHome'},
            'blog' : {name : 'Healthy Life', url:'/healthy-life'},
            'admin' : {name : 'Admin Panel',url:'/martAdminServices'},
            'kym' : {name : 'Know Your Medicine', url: '/kym'},
            'home' :  { name : 'Home',url:'/'}
    }

    const breadCrumbStack = useSelector(state => {
        let crumbs = [];
        if(state?.breadCrumb?.length>0){
            crumbs=[...state.breadCrumb];
        }
        if(props.catalog){
            crumbs.unshift(catalogs[props.catalog]);
        }
        if(crumbs.length>0){
            crumbs.unshift(catalogs['home']);
        }
        return crumbs;
    });

    const checkForBreadCrumb = () =>{
        if(props.breadCrumbNotRequired){
            return false;
        }
        return true;
    }

    return (
        <React.Fragment>
        {breadCrumbStack?.find(crumb=>crumb?.url===props.location.pathname)  ?
        <nav aria-label="breadcrumb bg-none">
            <ol className="breadcrumb m-0 bgclr-tpt" itemScope itemType='https://schema.org/BreadcrumbList'>
                {breadCrumbStack.map((breadCrumb,index)=> {
                    return(
                <li className={index !=breadCrumbStack.length-1 ? 'breadcrumb-item' : 'breadcrumb-item text-secondary'} itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'>
                    <span itemProp='name' content={breadCrumb.name}>
                    {index!=breadCrumbStack.length-1 ?
                        <Link to={breadCrumb.url} itemProp='item' title = {breadCrumb.name}>{breadCrumb.name}</Link> :
                        <span title={breadCrumb.name} dangerouslySetInnerHTML={{ __html: breadCrumb.name }} />}
                        <meta itemProp='position' content={index}></meta>
                    </span>
                </li>);
                })}
            </ol>
        </nav> : checkForBreadCrumb() &&
                <div className="bg-transparent m-0 py-3 p-0 ph-item ph-row px-3">
                    {[1, 2, 3].map((each) => {
                        return (
                            <div className={`ph-col-1 ${each !== 1 ? "ml-3" : ""}`} style={{ "height": "1rem" }}></div>
                        )
                    })}
                </div>
        }
        </React.Fragment>
    );

}



export default BreadCrumb;