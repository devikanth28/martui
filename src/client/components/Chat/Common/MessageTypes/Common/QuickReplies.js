import React from "react";
import '../../../css/QuickReplies.css';

/**
 * Functional component for QuickReplies
 * @param {*} props
 */
const QuickReplies = (props) => {

  const quickReplies = props.message.quick_replies;
  const blocks = props.message.blocks ? props.message.blocks : null;
  // const openRegistrationPopUp = () => {
  //   window.parent.postMessage({
  //     type:"openRegistrationPopUpFromChat",
  //   },window.parent.location);
  // }
  const handleQuickreplies = (event,reply) =>{
    switch(reply.title){
      // case "Create new customer ID" : openRegistrationPopUp();break;
      // case "Update email address" : window.top.location.href = "/myProfile";break;
      // case "Update mobile number" : window.top.location.href = "/myProfile";break;
      // case "Update name" : window.top.location.href = "/myProfile";break;
      // case "Request for a product" : window.top.location.href = "/requestProduct";break;
      // case "How to redeem my Flexi Reward points" : window.top.location.href = "/flexiRewardsFaq";break;
      //case "Location " : window.top.location.href = "/storelocator";break;
      //case "Store Phone Number" : window.top.location.href = "/storelocator";break;  
      default :  event.preventDefault();props.sendMessage(event, reply);
    }
  }
  const dialogue = (
    <div id="message_replies">
      <div id="message_replies_container">
        <ul>
          {quickReplies.map((reply, index) => {
            return (
              <li key={index}>
                <a
                  href="/"
                  className="quick-replies"
                  onClick={(event) => {handleQuickreplies(event,reply);}}
                >
                  {reply.title}
                </a>
              </li>
            );
          })}
        </ul>
        {
          blocks && blocks.BACK_TO_PREVIOUS_MENU ?
            (<a
              href="/"
              onClick={(event) => {
                event.preventDefault();
                props.sendMessage(event, blocks.BACK_TO_PREVIOUS_MENU);
              }}
              className="back-to-previous-option btn btn-sm text-left ml-n2"
            >
              {blocks.BACK_TO_PREVIOUS_MENU.title}
            </a>) : null
        }
        <span className="time-stamp">{props.time}</span>
      </div>
    </div>
  );
  return dialogue;
};

export default QuickReplies;