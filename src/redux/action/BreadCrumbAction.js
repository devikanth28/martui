import { useDispatch, useSelector } from "react-redux";

export default function BreadCrumbAction() {
    
    const dispatch = useDispatch();

    const pushBreadCrumbs = (breadCrumb)=> {
     dispatch({type : 'PUSH_BREADCRUMB',payload : breadCrumb})
    }
    const clearBreadCrumb = ()=> {dispatch({type : 'CLEAR_BREADCRUMB'});}

    return {pushBreadCrumbs,clearBreadCrumb};

}