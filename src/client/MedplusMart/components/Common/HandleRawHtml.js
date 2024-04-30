import React, { useEffect, useState } from "react"

const HandleRawHtml = (props) =>{

    const[htmlData, setHtmlData] = useState("");

    useEffect(() =>{
        setHtmlData(parseHtmlResponse(props.rawHtml));
    },[]);

    const parseHtmlResponse = (rawHtml) =>{
        try{
            if(rawHtml && rawHtml !== ""){
                let parser = new DOMParser();
                let rawHtmlData = parser.parseFromString(rawHtml, 'text/html');
                window.scrollToElement = (elementId) => scrollToElement(elementId);
                rawHtml = rawHtmlData.body.innerHTML
            }
        }catch(err){
            console.log(err);
        }
        return rawHtml;
    }
    
    const scrollToElement = (elmId) => {
        const id = elmId.split("#")[1];
        const element = document.getElementById(id);
        props.history.push(`/brands#${id}`)
        if(element){  
           element.scrollIntoView({behavior: "smooth", block: "center"});
        }
    }

    return (
        <React.Fragment>
            <section className="browse-all-brands static-pages">
                <div class="Browse-all-brands-title mt-0">
                    <h1>All Brands</h1>
                    <p>Below are the manufacturers for pharmacy products and list of brands for general products. Find the products listed under each of these brands and manufacturers by clicking on the name.</p>
                </div>
                <div dangerouslySetInnerHTML={{ __html: htmlData }}></div>
            </section>
        </React.Fragment>
    );
}

export default HandleRawHtml;