
import React, {useEffect} from 'react';
import db from '../../DataBase/LocalDB';
import Validate from '../../helpers/Validate';

const  PageRedirection = (props)=> {
    const validate = Validate();
    useEffect(() => {
        let fromPage =db.getValue("fromPage");
        if(validate.isNotEmpty(fromPage)){
            db.removeValue("fromPage");
            window.location.href = fromPage;
        }else{
            props.history.push('/shoppingCart');
        }
    })

    return (
        <React.Fragment>
             <div></div>
        </React.Fragment>
    );

}

export default PageRedirection;