import { instanceOf } from "prop-types";

class LocalDB {

    setValue(key, value) {
        if(key === undefined || key === 'undefined'){
            return;
        }
        if(typeof window !== "undefined" && window.localStorage){
            window.localStorage.setItem(key, value);
        }
    }

    getValue(key) {
        if(key === undefined || key === 'undefined'){
            return;
        }
        if(typeof window !== "undefined" && window.localStorage){
            return window.localStorage.getItem(key);
        }
    }

    removeValue(key){
        if(key === undefined || key === 'undefined'){
            return;
        }
        if(typeof window !== "undefined" && window.localStorage){
            return window.localStorage.removeItem(key);
        }
    }

    setObject(key, obj) {
        if(key === undefined || key === 'undefined'){
            return;
        }
        if(typeof window !== "undefined" && window.localStorage){
            window.localStorage.setItem(key, JSON.stringify(obj));
        }
    }

    getObject(key) {
        if(key === undefined || key === 'undefined'){
            return;
        }
        if(typeof window !== "undefined" && window.localStorage){
            try{
                return JSON.parse(window.localStorage.getItem(key));
            }catch(error){
                console.log(error);
            }
        }
    }

    getFromHelpPage(){
        let fromHelpPage = this.getValue("fromHelpPage");
        if("Y" === fromHelpPage){
            fromHelpPage = '//'+"Y"
        }else{
            fromHelpPage = '';
        }
        return fromHelpPage;
    }
}

export default new LocalDB();