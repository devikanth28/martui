import React, { useState, useEffect } from "react";
import CheckBox from "./CheckBox";
import "../../../css/ProductSelection.css";

/**
 * Functional component for ProductSelection
  @param {} props
 */
const ProductSelection = (props) => {
    const [products, setProducts] = useState([]);
    const productData = props.message && props.message.blocks ? props.message.blocks.viewData : null;
    const [disableSubmitButton, setDisableSubmitButton] = useState(true);

    /**
     * Use effect lifecycle method
     */
    useEffect(() => {
        if (productData && productData.length > 0) {
            const products = productData.map(product => {
                return { productId: product.id, productName: product.name, checked: false }
            });
            setProducts(products);
        }
    }, [props.message]);

    useEffect(()=>{
        props.scrollBottom();
    },[products])

    /**
     * Function to validate and return the input selection data of checkboxes and date inputs
      @param {} products 
     */
    const validateAndGetSelectedInput = (products) => {
        let text = "";
        let selectedInputData = { data: [], isValid: false, errorMessage: null, textToShow: "" };
        products.forEach((product, index) => {
            if (product.checked === true) {
                selectedInputData.isValid = true;
                text += `${product.productName} <br>`;
                selectedInputData.data.push({ productId: product.productId, productName: product.productName });
            }
        });
        if (selectedInputData.data.length === 0) {
            setDisableSubmitButton(true);
            selectedInputData.errorMessage = "Please select at least one product";
        } else {
            selectedInputData.textToShow = text;
            setDisableSubmitButton(false);
        }
        return selectedInputData;
    }

    /**
     * handle check box function
     * @param {} checked 
      @param {} index 
     */
    const checkBoxHandler = (checked, index) => {
        products[index]["checked"] = !checked;
        const selectedProductData = validateAndGetSelectedInput(products);
        props.updateInputData(selectedProductData);
        setProducts(products => {
            const parsedProducts = products.map(l => Object.assign({}, l));
            parsedProducts[index].checked = !checked;
            return parsedProducts;
        });
    }

    return (
        <div id="message_replies">
            <div id="message_replies_container">
                <section className="list-card-box p-0 mb-0">
                    <ul className="list-group list-group-flush">
                        {products && products.map((product, index) => {
                            return <li className="list-group-item no-chev p-2 m-0" htmlFor={product.productName} key = {index}>
                                <CheckBox defaultChecked={false} checkBoxHandler={checkBoxHandler} key={`checkbox ${product.productId}`} id={index} values={[product.productName]} />
                            </li>
                        }
                        )}
                        <li className="list-group-item no-chev p-2 m-0">
                            <button disabled={disableSubmitButton} className="float-right p-2" onClick={() => { props.sendMessage() }} >Submit</button>
                        </li>
                    </ul>
                </section>
                <span className="time-stamp">{props.time}</span>
            </div>
        </div>
    );

};

export default ProductSelection;