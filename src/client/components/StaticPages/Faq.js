import React, { useState } from 'react';
import Footer from '../StaticPages/Footer'
import {UncontrolledCollapse, Collapse, CardHeader, CardBody, Card } from 'reactstrap';
const Faq = () => {    
    return (
        <React.Fragment>
    <div class="static-pages Faq">
        <h6>Frequently Asked Questions</h6>
  <p>To help you navigate our site better and make your shopping experience easier, we have 
  provided answers to some frequently asked questions. You are always welcome to call our 
  customer service if your question remains unanswered.</p>
            
        <div  className=" mb-2"> 
        <CardHeader  id='toggler1'>
         What products are available at medplusmart.com
        <a className="btn-title-right">
            <svg className="float-right mt-1" height="16" width="16" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsxlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" xmlspace="preserve"><g><rect id="BG_Guide_39_" fill="none" width="20" height="20"></rect><path fill="#404040" d="M19.2,15.3c0.2,0,0.4-0.1,0.6-0.2c0.3-0.3,0.3-0.8,0-1.1l-9.2-9.1c-0.3-0.3-0.8-0.3-1.1,0L0.2,14 c-0.3,0.3-0.3,0.8,0,1.1c0.3,0.3,0.8,0.3,1.1,0L10,6.5l8.7,8.6C18.8,15.2,19,15.3,19.2,15.3z"></path></g></svg>
        </a>
        </CardHeader>
        <UncontrolledCollapse toggler='#toggler1'>
            <Card>
             <CardBody className="border-top">
               <p> Medplusmart.com is an online extension of your medplus store with a wider range of medical and general products. You can purchase anything that you usually buy at a MedPlus store plus more. Just type the name of the product you need in our search box and select from the displayed options to start shopping.
                </p>
            </CardBody>
            </Card>
        </UncontrolledCollapse>
        </div>         
        <div  className="accordian-faq mb-2">            
            <CardHeader  id='toggler2'>
              How do I place an order?
            <a className="btn-title-right">
                <svg className="float-right mt-1" height="16" width="16" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsxlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" xmlspace="preserve"><g><rect id="BG_Guide_39_" fill="none" width="20" height="20"></rect><path fill="#404040" d="M19.2,15.3c0.2,0,0.4-0.1,0.6-0.2c0.3-0.3,0.3-0.8,0-1.1l-9.2-9.1c-0.3-0.3-0.8-0.3-1.1,0L0.2,14 c-0.3,0.3-0.3,0.8,0,1.1c0.3,0.3,0.8,0.3,1.1,0L10,6.5l8.7,8.6C18.8,15.2,19,15.3,19.2,15.3z"></path></g></svg>
            </a>
            </CardHeader>
            <UncontrolledCollapse toggler='#toggler2'>
                <Card >
                <CardBody className="border-top">
                <p>For placing a new order, go to online orders, type the name of the product you wish to purchase in the search box, select from the displayed options, review the product details, enter a quantity and add to cart. Once all required items are added to the cart, click on checkout, verify the order, select a delivery mode and enter the required details and submit the order.</p><p>You will receive a confirmation mail to your registered email ID with the order details and an SMS on your registered mobile number updating you about the order status.</p><p>If you order contains medicines please show your prescription to our delivery assistant or store assistant at the time of receipt of the products and payment.</p>
                </CardBody>
                </Card>
            </UncontrolledCollapse>
        </div>
        <div  className="accordian-faq mb-2">            
            <CardHeader  id='toggler3'>
            Do I have to be a existing MedPlus customer to shop at medplusmart.com ?
            <a className="btn-title-right">
                <svg className="float-right mt-1" height="16" width="16" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsxlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" xmlspace="preserve"><g><rect id="BG_Guide_39_" fill="none" width="20" height="20"></rect><path fill="#404040" d="M19.2,15.3c0.2,0,0.4-0.1,0.6-0.2c0.3-0.3,0.3-0.8,0-1.1l-9.2-9.1c-0.3-0.3-0.8-0.3-1.1,0L0.2,14 c-0.3,0.3-0.3,0.8,0,1.1c0.3,0.3,0.8,0.3,1.1,0L10,6.5l8.7,8.6C18.8,15.2,19,15.3,19.2,15.3z"></path></g></svg>
            </a>
            </CardHeader>
            <UncontrolledCollapse toggler='#toggler3'>
                <Card >
                <CardBody className="border-top">
                    <p>No. Medplusmart.com is open to new and returning customers. If you are an existing customer of MedPlus and have a store issued MedPlus Card or ID, by creating an online account and registering your card, you will be able to view and print all your previous bills and conveniently reorder from them.</p>
                </CardBody>
                </Card>
                </UncontrolledCollapse>
        </div>
        <div  className="accordian-faq mb-2">            
            <CardHeader  id='toggler4'>
            Do I have to create an account to shop at medplusmart.com
            <a className="btn-title-right">
                <svg className="float-right mt-1" height="16" width="16" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsxlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" xmlspace="preserve"><g><rect id="BG_Guide_39_" fill="none" width="20" height="20"></rect><path fill="#404040" d="M19.2,15.3c0.2,0,0.4-0.1,0.6-0.2c0.3-0.3,0.3-0.8,0-1.1l-9.2-9.1c-0.3-0.3-0.8-0.3-1.1,0L0.2,14 c-0.3,0.3-0.3,0.8,0,1.1c0.3,0.3,0.8,0.3,1.1,0L10,6.5l8.7,8.6C18.8,15.2,19,15.3,19.2,15.3z"></path></g></svg>
            </a>
            </CardHeader>
            <UncontrolledCollapse toggler='#toggler4'>
                <Card >
                <CardBody className="border-top">
                <p>Yes, it is mandatory to create an account on medplusmart.com to be able to shop online. Even if you are an existing MedPlus customer, you are required to create an online account for yourself to shop at medplusmart.com. While creating the account or at a later point of time, you will be able to combine your online and offline accounts to:</p>
       <p>View or print your previous bills</p>
       <p>Reorder products conveniently</p>
       <p>Track your ValuePlus loyalty points</p>
       <p>To create an account you must have a valid email address and a mobile number. If you'd like to create an account now and enjoy these benefits, please click here.
</p>
                </CardBody>
                </Card>
                </UncontrolledCollapse>
        </div>
        <div  className="accordian-faq mb-2">            
            <CardHeader  id='toggler5'>
            How do I create an account?
            <a className="btn-title-right">
                <svg className="float-right mt-1" height="16" width="16" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsxlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" xmlspace="preserve"><g><rect id="BG_Guide_39_" fill="none" width="20" height="20"></rect><path fill="#404040" d="M19.2,15.3c0.2,0,0.4-0.1,0.6-0.2c0.3-0.3,0.3-0.8,0-1.1l-9.2-9.1c-0.3-0.3-0.8-0.3-1.1,0L0.2,14 c-0.3,0.3-0.3,0.8,0,1.1c0.3,0.3,0.8,0.3,1.1,0L10,6.5l8.7,8.6C18.8,15.2,19,15.3,19.2,15.3z"></path></g></svg>
            </a>
            </CardHeader>
            <UncontrolledCollapse toggler='#toggler5'>
                <Card >
                <CardBody className="border-top">
                <p>Click on <strong >SIGN IN/REGISTER</strong> at the top of any page on the website. Then click on Register now. Enter your email address and password. Re-enter your password to create an account. Your email ID will be used as your default username for your account.</p><p>While choosing a password, please remember that:</p><ol><li>Passwords are case sensitive. For example Password and password will be treated as different from one another.</li><li>Passwords must be of 6 or more characters.</li><li>Adding numbers and special characters to your password will make them difficult to hack.</li></ol><p></p><p>While registering, you can opt to combine your offline MedPlus ID to your online account by providing your MedPlus ID or registered mobile number. You will be required to enter a OTP sent to your phone to complete the registration process.</p><p>If you are not an existing MedPlus customer, you can create a MedPlus ID while completing the registration process.</p><p>You have an option to do this anytime later by visiting the <strong class="txtshadowsml">'My Account'</strong> section of the website. If you would like to create a new account now, please <a href="javascript:void(0)" title="Click Here to Register">Click Here</a>.</p>
                 </CardBody>
                </Card>
                </UncontrolledCollapse>
        </div>

        <div  className="accordian-faq mb-2">            
            <CardHeader  id='toggler6'>
              I have a MedPlus store issued Customer ID number. How do I link it to my online account?
            <a className="btn-title-right">
                <svg className="float-right mt-1" height="16" width="16" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsxlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" xmlspace="preserve"><g><rect id="BG_Guide_39_" fill="none" width="20" height="20"></rect><path fill="#404040" d="M19.2,15.3c0.2,0,0.4-0.1,0.6-0.2c0.3-0.3,0.3-0.8,0-1.1l-9.2-9.1c-0.3-0.3-0.8-0.3-1.1,0L0.2,14 c-0.3,0.3-0.3,0.8,0,1.1c0.3,0.3,0.8,0.3,1.1,0L10,6.5l8.7,8.6C18.8,15.2,19,15.3,19.2,15.3z"></path></g></svg>
            </a>
            </CardHeader>
            <UncontrolledCollapse toggler='#toggler6'>
                <Card >
                <CardBody className="border-top">
                <p>At the time of online account creation, select the option "I have a store issued MedPlus ID" and follow the instructions. You will be required to enter a OTP sent to your registered mobile number to complete the process. Alternatively, if you have already created an online account, go the My Account, then click My MedPlus Card. Select the box 'Register my store issued MedPlus Card'. Provide your MedPlus Card no and registered mobile no. and follow the instructions.</p>
                </CardBody>
                </Card>
                </UncontrolledCollapse>
        </div>
        <div  className="accordian-faq mb-2">            
            <CardHeader  id='toggler7'>
               I am a registered user. How do I Edit/Manage <strong class="txtshadowsml">MY ACCOUNT</strong>?
            <a className="btn-title-right">
                <svg className="float-right mt-1" height="16" width="16" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsxlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" xmlspace="preserve"><g><rect id="BG_Guide_39_" fill="none" width="20" height="20"></rect><path fill="#404040" d="M19.2,15.3c0.2,0,0.4-0.1,0.6-0.2c0.3-0.3,0.3-0.8,0-1.1l-9.2-9.1c-0.3-0.3-0.8-0.3-1.1,0L0.2,14 c-0.3,0.3-0.3,0.8,0,1.1c0.3,0.3,0.8,0.3,1.1,0L10,6.5l8.7,8.6C18.8,15.2,19,15.3,19.2,15.3z"></path></g></svg>
            </a>
            </CardHeader>
            <UncontrolledCollapse toggler='#toggler7'>
                <Card >
                <CardBody className="border-top">
                <p>You can edit/update/manage your personal information, including your name, address, contact information and password at any time. To access your account, click on <strong class="txtshadowsml">SIGN IN/REGISTER</strong>. Once logged in, click on the down arrow beside your name and click <strong class="txtshadowsml">My Account</strong>. You will also be able to view your order history here.</p><p>It is important to keep your account information accurate and up to date, since our customer service will be unable to help you if you are not able to verify the information provided by you in your account.</p>
                </CardBody>
                </Card>
                </UncontrolledCollapse>
        </div>
       
        <div  className="accordian-faq mb-2">            
            <CardHeader  id='toggler8'>
            My email ID has changed. What should I do?
            <a className="btn-title-right">
                <svg className="float-right mt-1" height="16" width="16" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsxlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" xmlspace="preserve"><g><rect id="BG_Guide_39_" fill="none" width="20" height="20"></rect><path fill="#404040" d="M19.2,15.3c0.2,0,0.4-0.1,0.6-0.2c0.3-0.3,0.3-0.8,0-1.1l-9.2-9.1c-0.3-0.3-0.8-0.3-1.1,0L0.2,14 c-0.3,0.3-0.3,0.8,0,1.1c0.3,0.3,0.8,0.3,1.1,0L10,6.5l8.7,8.6C18.8,15.2,19,15.3,19.2,15.3z"></path></g></svg>
            </a>
            </CardHeader>
            <UncontrolledCollapse toggler='#toggler8'>
                <Card >
                <CardBody className="border-top">
                <p>Since your registered email ID is your unique user ID, we use this to keep track of all your transaction related information. This cannot be changed without creating a new account. You can continue to use this email ID as your username and update the contact email address in your My Account page. Once this is done, you will receive all communications at this new email address. However your user ID for logging into your account will remain the same.</p>
                </CardBody>
                </Card>
                </UncontrolledCollapse>
        </div>
        <div  className="accordian-faq mb-2">            
            <CardHeader  id='toggler9'>
            I forgot my password. What should I do?
            <a className="btn-title-right">
                <svg className="float-right mt-1" height="16" width="16" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsxlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" xmlspace="preserve"><g><rect id="BG_Guide_39_" fill="none" width="20" height="20"></rect><path fill="#404040" d="M19.2,15.3c0.2,0,0.4-0.1,0.6-0.2c0.3-0.3,0.3-0.8,0-1.1l-9.2-9.1c-0.3-0.3-0.8-0.3-1.1,0L0.2,14 c-0.3,0.3-0.3,0.8,0,1.1c0.3,0.3,0.8,0.3,1.1,0L10,6.5l8.7,8.6C18.8,15.2,19,15.3,19.2,15.3z"></path></g></svg>
            </a>
            </CardHeader>
            <UncontrolledCollapse toggler='#toggler9'>
                <Card >
                <CardBody className="border-top">
                    <p>If you forget your password, we can email you a new, secure password. Click on <strong class="txtshadowsml">SIGN IN/REGISTER</strong> at the top of any page on the website, and click on Forgot Password and enter your registered email ID and submit. We will send you a mail on your registered email ID with instructions on creating a new password.</p>
                 </CardBody>
                </Card>
                </UncontrolledCollapse>
        </div>
        <div  className="accordian-faq mb-2">            
            <CardHeader  id='toggler10'>
              Are any delivery charges applicable for online orders?
            <a className="btn-title-right">
                <svg className="float-right mt-1" height="16" width="16" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsxlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" xmlspace="preserve"><g><rect id="BG_Guide_39_" fill="none" width="20" height="20"></rect><path fill="#404040" d="M19.2,15.3c0.2,0,0.4-0.1,0.6-0.2c0.3-0.3,0.3-0.8,0-1.1l-9.2-9.1c-0.3-0.3-0.8-0.3-1.1,0L0.2,14 c-0.3,0.3-0.3,0.8,0,1.1c0.3,0.3,0.8,0.3,1.1,0L10,6.5l8.7,8.6C18.8,15.2,19,15.3,19.2,15.3z"></path></g></svg>
            </a>
            </CardHeader>
            <UncontrolledCollapse toggler='#toggler10'>
                <Card >
                <CardBody className="border-top">
                  <p>Yes, delivery charges may be applicable for some orders. This will depend on the destination address and order amount. Delivery charges will be communicated on the order review page before confirmation and payment.</p>
                 </CardBody>
                </Card>
                </UncontrolledCollapse>
        </div>
        <div  className="accordian-faq mb-2">            
            <CardHeader  id='toggler11'>
               How do I pay for the order?
            <a className="btn-title-right">
                <svg className="float-right mt-1" height="16" width="16" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsxlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" xmlspace="preserve"><g><rect id="BG_Guide_39_" fill="none" width="20" height="20"></rect><path fill="#404040" d="M19.2,15.3c0.2,0,0.4-0.1,0.6-0.2c0.3-0.3,0.3-0.8,0-1.1l-9.2-9.1c-0.3-0.3-0.8-0.3-1.1,0L0.2,14 c-0.3,0.3-0.3,0.8,0,1.1c0.3,0.3,0.8,0.3,1.1,0L10,6.5l8.7,8.6C18.8,15.2,19,15.3,19.2,15.3z"></path></g></svg>
            </a>
            </CardHeader>
            <UncontrolledCollapse toggler='#toggler11'>
                <Card >
                <CardBody className="border-top">
                   <p>At Medplusmart.com we have multiple payment options available for the customers. Customers can choose to pay through Debit/Credit/Net Banking/Wallets at the time of creating orders. We also have COD option available for selected locations. You are requested to select your locality to check if COD services available in your location.</p>
                </CardBody>
                </Card>
                </UncontrolledCollapse>
        </div>
        <div  className="accordian-faq mb-2">            
            <CardHeader  id='toggler12'>
            How do I submit my prescription for medicine purchases?
            <a className="btn-title-right">
                <svg className="float-right mt-1" height="16" width="16" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsxlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" xmlspace="preserve"><g><rect id="BG_Guide_39_" fill="none" width="20" height="20"></rect><path fill="#404040" d="M19.2,15.3c0.2,0,0.4-0.1,0.6-0.2c0.3-0.3,0.3-0.8,0-1.1l-9.2-9.1c-0.3-0.3-0.8-0.3-1.1,0L0.2,14 c-0.3,0.3-0.3,0.8,0,1.1c0.3,0.3,0.8,0.3,1.1,0L10,6.5l8.7,8.6C18.8,15.2,19,15.3,19.2,15.3z"></path></g></svg>
            </a>
            </CardHeader>
            <UncontrolledCollapse toggler='#toggler12'>
                <Card >
                <CardBody className="border-top">
                <p>You can upload prescription from your computer or from the list of saved prescription in your registered account. Medplus representative will verify the prescription for order before confirmation. Alternatively, have your prescription to be displayed to our delivery assistant  or store assistant at the time of receipt of products. Please note that we will not be able to handover any medicine without a valid prescription.</p>
                </CardBody>
                </Card>
                </UncontrolledCollapse>
        </div>
        <div  className="accordian-faq mb-2">            
            <CardHeader  id='toggler13'>
            Does my order has any expiry date for pick up?
            <a className="btn-title-right">
                <svg className="float-right mt-1" height="16" width="16" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsxlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" xmlspace="preserve"><g><rect id="BG_Guide_39_" fill="none" width="20" height="20"></rect><path fill="#404040" d="M19.2,15.3c0.2,0,0.4-0.1,0.6-0.2c0.3-0.3,0.3-0.8,0-1.1l-9.2-9.1c-0.3-0.3-0.8-0.3-1.1,0L0.2,14 c-0.3,0.3-0.3,0.8,0,1.1c0.3,0.3,0.8,0.3,1.1,0L10,6.5l8.7,8.6C18.8,15.2,19,15.3,19.2,15.3z"></path></g></svg>
            </a>
            </CardHeader>
            <UncontrolledCollapse toggler='#toggler13'>
                <Card >
                <CardBody className="border-top">
                <p>Yes. The order placed by the customer expires after 7 days from the time when customer receives a message informing him about the readiness of the order for pick up. All the expired orders are cancelled automatically and informed to the respective customers through a message on the registered mobile number.</p>
                 </CardBody>
                </Card>
                </UncontrolledCollapse>
        </div>
        <div  className="accordian-faq mb-2">            
            <CardHeader  id='toggler14'>
            How do I cancel an order?
            <a className="btn-title-right">
                <svg className="float-right mt-1" height="16" width="16" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsxlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" xmlspace="preserve"><g><rect id="BG_Guide_39_" fill="none" width="20" height="20"></rect><path fill="#404040" d="M19.2,15.3c0.2,0,0.4-0.1,0.6-0.2c0.3-0.3,0.3-0.8,0-1.1l-9.2-9.1c-0.3-0.3-0.8-0.3-1.1,0L0.2,14 c-0.3,0.3-0.3,0.8,0,1.1c0.3,0.3,0.8,0.3,1.1,0L10,6.5l8.7,8.6C18.8,15.2,19,15.3,19.2,15.3z"></path></g></svg>
            </a>
            </CardHeader>
            <UncontrolledCollapse toggler='#toggler14'>
                <Card >
                <CardBody className="border-top">
                <p>For guidance on returns and cancellations, <a href="javascript:void(0)" title="Click Here">Click Here</a>.</p>
                  </CardBody>
                </Card>
                </UncontrolledCollapse>
        </div>
        <div  className="accordian-faq mb-2">            
            <CardHeader  id='toggler15'>
            How do I return an order?
            <a className="btn-title-right">
                <svg className="float-right mt-1" height="16" width="16" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsxlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" xmlspace="preserve"><g><rect id="BG_Guide_39_" fill="none" width="20" height="20"></rect><path fill="#404040" d="M19.2,15.3c0.2,0,0.4-0.1,0.6-0.2c0.3-0.3,0.3-0.8,0-1.1l-9.2-9.1c-0.3-0.3-0.8-0.3-1.1,0L0.2,14 c-0.3,0.3-0.3,0.8,0,1.1c0.3,0.3,0.8,0.3,1.1,0L10,6.5l8.7,8.6C18.8,15.2,19,15.3,19.2,15.3z"></path></g></svg>
            </a>
            </CardHeader>
            <UncontrolledCollapse toggler='#toggler15'>
                <Card >
                <CardBody className="border-top">
                <p>For guidance on returns and cancellations, <a href="javascript:void(0)" title="Click Here">Click Here</a>.</p>
                 </CardBody>
                </Card>
                </UncontrolledCollapse>
        </div>            
        </div>       
    </React.Fragment>
    )
} 
export default Faq;
