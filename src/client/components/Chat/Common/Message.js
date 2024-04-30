import React from "react";
import BotMessage from "../Common/MessageTypes/BotMessage";
import OutgoingMessage from "./MessageTypes/OutgoingMessage";
import "../css/Message.css";

/**
 * Functional component for Message
  @param {} props
 */
const Message = (props) => {
  const message = props.message;
  const date = message.date ? message.date : new Date();
  const time = date
    .toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
    .toLowerCase();
  let dialogue = null;
  let type = message.type;
  if (message.extras && message.extras.viewType) {
    type = message.extras.viewType
  }
  let text = message.textToShow;
  if (!text) {
    text = message.text;
  }
  switch (type) {
    case "message": {
      dialogue = <BotMessage message={message} time={time} sendQuickRepliesMessage={props.sendQuickRepliesMessage} sendCustomMessage={props.sendCustomMessage} sendImageMessage={props.sendImageMessage} canShowAvatar={props.canShowAvatar} updateInputData={props.updateInputData} sendRadioButtonMessage={props.sendRadioButtonMessage} scrollBottom={props.scrollBottom} />
      return dialogue;
    }
    case "typing": {
      dialogue = <TypingMessage canShowAvatar={props.canShowAvatar} />
      break;
    }
    case "outgoing": {
      dialogue = <OutgoingMessage text={text} time={time} />
      break;
    }
    case "image": {
      dialogue = message.images.map(image => {
        return <OutgoingMessage image={image} time={time} />
      });
      break;
    }
    case "separator": {
      dialogue = <DateSeparator text={text} />;
      break;
    }
    default: {
      dialogue = <div></div>;
      break;
    }
  }
  return dialogue;
};

/**
 * Functional component for date separator
  @param {} props 
 */
const DateSeparator = (props) => {
  const dialogue = (
    <div class="section_divide">
      <div class="separator">{props.text}</div>
    </div>
  );
  return dialogue;
}

/**
 * Component for typing message
 * @param {} props 
 */
const TypingMessage = (props) => {
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
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
  return dialogue;
}

export default Message;