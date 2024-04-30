import React, {useState} from 'react';
import QuickRepliesMessage from "./Common/QuickReplies";
import ProductSelection from './Common/ProductSelection';
import ProductExpiry from './Common/ProductExpiry';
import ImageUploadMessage from "./Common/ImageUploadMessage";
import InputFieldMessage from "./Common/InputFieldMessage";
import RadioButton from "./Common/RadioButtion";
import ReactHtmlParser from 'react-html-parser';
import "../../css/BotMessage.css";
import LocalDB from "../../../../DataBase/LocalDB";


/**
 * Functional component for BotMessage
  @param {} props
 */
const BotMessage = (props) => {

  const updateInputData = (data) => {
    props.updateInputData(data);
  }

  const openPopupLogin = () =>{
    window.parent.postMessage({
      type:"openLoginFromChat",
    },window.parent.location);
  }

  const setLocalityAndRedirectToFlexiRewards = async (locality) => {
    LocalDB.setObject("flexiLocality", locality);
    window.top.location.href = "/flexiRewards";
  }

  const getMessageOptions = (message, time) => {
    if (message.quick_replies) {
      return <QuickRepliesMessage message={message} time={time} sendMessage={props.sendQuickRepliesMessage} />
    } else if (message.blocks) {
      const viewType = message.blocks.viewType;
      switch (viewType) {
        case "PRODUCT_SELECTION_VIEW":
          return <ProductSelection message={message} time={time} updateInputData={updateInputData} sendMessage={props.sendCustomMessage} scrollBottom={props.scrollBottom} />;
        case "PRODUCT_EXPIRY_VIEW":
          return <ProductExpiry message={message} time={time} updateInputData={updateInputData} sendMessage={props.sendCustomMessage} />
        case "IMAGE_UPLOAD_VIEW":
          return <ImageUploadMessage message={message} time={time} updateInputData={updateInputData} sendMessage={props.sendImageMessage} scrollBottom={props.scrollBottom} />
        case "INPUT_FIELD_VIEW":
          return <InputFieldMessage message={message} time={time} updateInputData={updateInputData} sendMessage={props.sendCustomMessage} />
        case "RADIO_BUTTON_VIEW":
          return <RadioButton message={message} time={time} updateInputData={updateInputData} sendMessage={props.sendRadioButtonMessage}  scrollBottom={props.scrollBottom} />;
      }
    }
    return (
      <React.Fragment>
        {message.blocks && message.blocks.BACK_TO_PREVIOUS_MENU && (
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault();
              props.sendRadioButtonMessage({
                data: message.blocks.BACK_TO_PREVIOUS_MENU.payload,
                isValid: true,
                textToShow: message.blocks.BACK_TO_PREVIOUS_MENU.title,
              });
            }}
            className="back-to-previous-option btn btn-sm text-left ml-n2"
          >
            {message.blocks.BACK_TO_PREVIOUS_MENU.title}
          </a>
        )}
        <span className="time-stamp">{time}</span>
      </React.Fragment>
    );
  }

  const dialogue = (
    <div
      className={
        props.canShowAvatar
          ? "section_message bot_avatar"
          : "section_message"
      }
    >
      {props.canShowAvatar && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="42"
          height="42"
          viewBox="0 0 52 52"
        >
          <defs>
            <style>{`.a{fill:url(#a);}.b{fill:#fff;}.c{fill:#08ce73;}`}</style>
            <linearGradient
              id="a"
              x1="0.985"
              y1="0.5"
              x2="0"
              y2="0.5"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0" stop-color="#fe4f30" />
              <stop offset="1" stop-color="#e71c37" />
            </linearGradient>
          </defs>
          <g transform="translate(-6369 -655)">
            <rect
              class="a"
              width="52"
              height="52"
              rx="6"
              transform="translate(6369 655)"
            />
            <path
              class="b"
              d="M125.759,117.911a9.938,9.938,0,0,0,.276-2.392,10.518,10.518,0,0,0-21.036,0,10.132,10.132,0,0,0,1.028,4.517,3.87,3.87,0,0,1-.748,4.369.956.956,0,0,0,.676,1.632h9.562a9.86,9.86,0,0,0,2.377-.274A10.587,10.587,0,0,0,125.759,117.911Zm10.714,13.616a10.156,10.156,0,0,0,1.036-4.534,10.527,10.527,0,0,0-9.619-10.473,11.389,11.389,0,0,1-.276,1.852,12.492,12.492,0,0,1-9.286,9.254,11.08,11.08,0,0,1-1.809.267,10.527,10.527,0,0,0,10.473,9.618h9.562a.956.956,0,0,0,.676-1.632A3.864,3.864,0,0,1,136.473,131.527Zm-13.306-3.578a.956.956,0,1,1,.956-.956A.956.956,0,0,1,123.166,127.949Zm3.825,0a.956.956,0,1,1,.956-.956A.956.956,0,0,1,126.991,127.949Zm3.825,0a.956.956,0,1,1,.956-.956A.956.956,0,0,1,130.816,127.949Z"
              transform="translate(6274.001 560)"
            />
            <path
              class="c"
              d="M-4779.722,502v-4.278H-4784v-2.444h4.279V491h2.444v4.278H-4773v2.444h-4.277V502Z"
              transform="translate(11168 179)"
            />
          </g>
        </svg>
      )}
      <div className="message message">
        <p>{ReactHtmlParser(props.message.text, {
          transform: function (node) {
            if (node.type === 'tag' && node.attribs.id === 'bio-updation' && node.attribs.href.endsWith('login')) {
              return <a href="javascript:void();" onClick={() => { openPopupLogin(); return false; }}>Login</a>;
            } else if (node.type === 'tag' && node.attribs.id === 'flexireward-location') {
              return <a href="javascript:void();" onClick={() => { setLocalityAndRedirectToFlexiRewards(JSON.parse(node.attribs.href.split('locality=')[1])); return false; }}>FlexiRewards</a>
            } else if (node.type == 'tag' && node.attribs.id === 'displayStoreDetails') {
              const storeDetails = JSON.parse(node.children[0].data);
              return (
                <React.Fragment>
                  <section class="p-0">
                    <p class="ellips font-weight-bold" title="${storeDetails.name}">
                      {storeDetails.name}
                    </p>
                    <p class="size-12 store-address">{storeDetails.address}</p>
                    <p>
                      Maps:
                      <a class="text-primary ml-1" href={`http://maps.google.com/?saddr=${storeDetails.sourceLatLong}&daddr=${storeDetails.locationLatLong}`} target="_blank" title="Get Directions">
                        Get Directions
                      </a>
                    </p>
                    <p>
                      Distance: {parseFloat(storeDetails.distance).toFixed(2)} kms
                    </p>
                    {storeDetails.phone && 
                      <p>
                        Phone:
                        <a class="text-primary ml-1" href={`tel:+91 ${storeDetails.phone}`} title={`+91 ${storeDetails.phone}`}> +91 {storeDetails.phone}</a>
                      </p>
                    }
                  </section>
                  <p class="mt-3">Please <a title='' href={`https://pharmacy.medplusmart.com/${storeDetails.id}`} id='openLinkInSystemBrowser' target='_blank' rel='noopener noreferrer'>Click Here</a> to know more about this store.</p>
                  <p class='d-block mt-3'>Thank you for reaching out.</p>
                </React.Fragment>
              )
            }
          }
        })}</p>
        {getMessageOptions(props.message, props.time)}
      </div>
    </div>
  );
  return dialogue;
};

export default BotMessage;