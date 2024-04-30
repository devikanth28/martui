import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import CONFIG from "../../../constants/ServerConfig";
import Message from "./Message";
import "../css/ChatDialog.css";

const webSocketConfig = {
  maxReconnect: 3,
  reconnectTimeout: 3000,
  webSocketUrl: CONFIG.BOT_WEBSOCKET_URL,
  reconnectCount: 0,
};
let websocketConnection = null;
let remainingHistoryMessages = 0;
let historyLock = false;

const ChatDialog = (props) => {
  const user = props.user;
  let extras = props.extras;
  let greetType = "HELLO";
  let currentScrollTop = 0;
  let application = props.application;
  const defaultMaxInputLength = 4096; //max characters of input
  const defaultDescriptionPlaceHolder = "Type your message here...";
  const RESTART_CHAT = "Chat Again";
  const CHAT_AGAIN = "Chat Again";
  const MESSAGE_CHAT_AGAIN = "Still have issues or query about this order?";
  const MESSAGE_RESTART_FAILED = "Your chat was disconnected";
  const userInputRef = useRef();
  const bottomContainerRef = useRef();
  const messageWindowRef = useRef();
  const [conversation, setConversation] = useState([]);
  const [botStatus, setBotStatus] = useState(null);
  const [botHeaderStatus, setBotHeaderStatus] = useState(null);
  const [enableUserInput, setEnableUserInput] = useState(false);
  const [numberToReturn, setNumberToReturn] = useState(10);
  const [numberToSkip, setNumberToSkip] = useState(10);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const [historyLoader, setHistoryLoader] = useState(false);
  const [inputData, setInputData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);
  const [maxInputLength, setMaxInputLength] = useState(defaultMaxInputLength);
  const [descriptionPlaceHolder, setDescriptionPlaceHolder] = useState(
    defaultDescriptionPlaceHolder
  );
  const [description, setDescription] = useState();
  const [reconnectSectionDetails, setReconnectSectionDetails] = useState({
    show: false,
    message: MESSAGE_CHAT_AGAIN,
    name: CHAT_AGAIN,
  });

  useEffect(() => {
    async function boot() {
      //loading history
      setBotStatus("loading history...");
      await renderHistory(true, true, null);
      setBotStatus(null);
    }
    if (props.user && props.extras) {
      boot();
    }
  }, [props.user, props.extras]);

  const renderHistory = async (
    shouldScrollBottom,
    getHistoryCount,
    previousDateMessage
  ) => {
    let historyObject = null;
    if (extras && extras.loadHistory) {
      const loadBy = extras.loadHistory.loadBy;
      if (loadBy === "orderId") {
        historyObject = await loadHistory(
          extras.orderId,
          loadBy,
          getHistoryCount
        );
      } else if (loadBy === "customerId") {
        if (user && user.id) {
          const userParsed = JSON.parse(user.id);
          const customerId =
            userParsed && userParsed.customerId ? customerId : null;
          historyObject = await loadHistory(
            customerId,
            loadBy,
            getHistoryCount
          );
        }
      }
    }
    if (
      historyObject &&
      historyObject.history &&
      historyObject.history.length > 0
    ) {
      let history = historyObject.history;
      if (historyObject.historyCount) {
        remainingHistoryMessages =
          historyObject.historyCount - numberToReturn < 0
            ? 0
            : historyObject.historyCount - numberToReturn;
      } else {
        remainingHistoryMessages =
          remainingHistoryMessages - numberToReturn < 0
            ? 0
            : remainingHistoryMessages - numberToReturn;
      }
      history = formatHistory(history);
      greetType = "WELCOME_BACK";
      if (remainingHistoryMessages < numberToReturn) {
        setNumberToReturn(remainingHistoryMessages);
        setNumberToSkip(
          (numberToSkip) => numberToSkip + remainingHistoryMessages
        );
      } else {
        setNumberToSkip((numberToSkip) => numberToSkip + numberToReturn);
      }
      const scrollHeight = messageWindowRef.current.scrollHeight;
      const scrollTop = messageWindowRef.current.scrollTop;
      const currentPosition = scrollHeight - scrollTop;
      setConversation((conversation) => {
        const lastHistoryMessage = history[history.length - 1];
        const lastHistoryMessageDate = lastHistoryMessage.date.toLocaleDateString(
          { weekday: "long", year: "numeric", month: "long", day: "numeric" }
        );
        if (
          conversation.length > 0 &&
          previousDateMessage.date !== lastHistoryMessageDate
        ) {
          conversation.unshift(previousDateMessage);
        }
        return [...history, ...conversation];
      });
      if (shouldScrollBottom) {
        setReconnectSectionDetails({
          ...reconnectSectionDetails,
          show: true,
        });
        scrollBottom();
      } else {
        scrollHistory(currentPosition);
      }
    } else {
      await connect();
    }
  };

  const formatHistory = (hist) => {
    let history = [];
    let currentDateString = null;
    const todayDateString = new Date().toLocaleDateString({
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    hist.forEach((element) => {
      const date = new Date(element.date);
      const dateString = date.toLocaleDateString({
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      if (currentDateString != dateString) {
        currentDateString = dateString;
        if (dateString === todayDateString) {
          history.push({ type: "separator", text: "today", date: dateString });
        } else {
          history.push({
            type: "separator",
            text: dateString,
            date: dateString,
          });
        }
      }
      const message = {
        type: element.message.type,
        date: date,
      };
      if (element.message.type === "image") {
        message.images = element.message.images;
      } else {
        message.text = element.message.text;
      }
      history.push(message);
    });
    return history;
  };

  const loadHistory = async (id, loadBy, getHistoryCount) => {
    if (!id || !loadBy) return;
    let params = {
      numberToReturn: numberToReturn,
      numberToSkip: numberToSkip,
      getHistoryCount: getHistoryCount,
    };
    params[loadBy] = id;
    let historyResponse = null;
    await axios
      .get(CONFIG.API.BOT.GET_BOT_ORDER_HISTORY.PATH, {
        headers: {
          "content-type": "application/json",
        },
        params: params,
      })
      .then((response) => {
        if (response && response.success) {
          historyResponse = response;
        } else if (response && response.data && response.data.success) {
          historyResponse = response.data;
        }
      })
      .catch((error) => console.error(error));
    return historyResponse;
  };

  const scrollBottom = () => {
    if (application == "WEB") {
      props.scrollBottom(messageWindowRef);
    } else if (application == "MOBILE") {
      props.scrollBottom(bottomContainerRef);
    }
  };

  const connect = async () => {
    if (user && user.id && extras && extras.eventType) {
      setBotStatus("connecting...");
      setBotHeaderStatus("connecting...");
      extras.greet = greetType;
      await connectWebSocket();
    }
  };

  const connectWebSocket = async () => {
    websocketConnection = new WebSocket(webSocketConfig.webSocketUrl);
    //on websocket open
    websocketConnection.onopen = wsOpen;
    //on websocket message
    websocketConnection.onmessage = wsMessage;
    // websocket onclose event listener
    websocketConnection.onclose = wsClose;
    // websocket onerror event listener
    websocketConnection.onerror = wsError;
  };

  const wsOpen = () => {
    setBotStatus("online");
    setBotHeaderStatus("Online");
    webSocketConfig.reconnectCount = 0;
    deliverMessage({
      type: extras.eventType,
      user: user.id,
      channel: "socket",
      user_profile: user,
      extras: extras,
    });
  };

  const wsMessage = (event) => {
    try {
      let message = JSON.parse(event.data);
      let delay = 0;
      if(message.blocks && message.blocks.delayMessageTime){
        delay = message.blocks.delayMessageTime;
      }
      setTimeout(()=>{
          renderMessage(message);
      }, delay);
      if (message && message.blocks) {
        if (message.blocks.disconnectChat) {
          if (message.blocks.disconnectChat.error) {
            websocketConnection.close(4001);
          } else {
            websocketConnection.close(4002);
          }
        }
        setMaxInputLength(
          message.blocks.maxInputLength
            ? message.blocks.maxInputLength
            : defaultMaxInputLength
        );
        setDescriptionPlaceHolder(
          message.blocks.descriptionPlaceHolder
            ? message.blocks.descriptionPlaceHolder
            : defaultDescriptionPlaceHolder
        );
      }
      setNumberToSkip((numberToSkip) => numberToSkip + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const wsClose = async (event) => {
    const reconnectMessage = MESSAGE_RESTART_FAILED;
    switch (event.code) {
      case 1006: {
        setBotStatus(null);
        setBotHeaderStatus("offline");
        renderMessage({
          type: "message",
          text:
            "Sorry, I cannot help you at this moment. Please try again later or give us a call at <a class='text-primary ml-1' href='tel:040 6700 6700' title='040 6700 6700'>040 6700 6700</a>",
        });
        setReconnectSectionDetails({
          ...reconnectSectionDetails,
          show: true,
          message: reconnectMessage,
          name: RESTART_CHAT,
        });
        break;
      }
      case 4000: {
        setBotStatus(null);
        setBotHeaderStatus("offline");
        renderMessage({
          type: "message",
          text: "Oh! It looks like this session ended.",
        });
        setReconnectSectionDetails({
          ...reconnectSectionDetails,
          show: true,
          message: reconnectMessage,
          name: RESTART_CHAT,
        });
        break;
      }
      case 4001: {
        setBotStatus(null);
        setBotHeaderStatus("offline");
        setReconnectSectionDetails({
          ...reconnectSectionDetails,
          show: true,
          message: reconnectMessage,
          name: RESTART_CHAT,
        });
        break;
      }
      case 4002: {
        setBotStatus(null);
        setBotHeaderStatus("offline");
        setReconnectSectionDetails({
          ...reconnectSectionDetails,
          show: true,
          message: "Your chat has ended",
          name: RESTART_CHAT,
        });
        break;
      }
      default: {
        if (webSocketConfig.reconnectCount < webSocketConfig.maxReconnect) {
          console.log(
            `Socket is closed. Reconnect will be attempted.`,
            ++webSocketConfig.reconnectCount
          );
          setBotStatus("reconnecting...");
          setBotHeaderStatus("reconnecting...");
          setTimeout(reConnectWebSocket, webSocketConfig.reconnectTimeout);
        } else {
          setBotStatus(null);
          renderMessage({
            type: "message",
            text:
              "Sorry, I cannot help you at this moment. Please try again later or give us a call at <a class='text-primary ml-1' href='tel:040 6700 6700' title='040 6700 6700'>040 6700 6700</a>",
          });
          setReconnectSectionDetails({
            ...reconnectSectionDetails,
            show: true,
            message:
              "Sorry, I cannot help you at this moment. Please try again later or give us a call at <a class='text-primary ml-1' href='tel:040 6700 6700' title='040 6700 6700'>040 6700 6700</a>",
            name: RESTART_CHAT,
          });
        }
      }
    }
    scrollBottom();
  };

  const wsError = (error) => {
    console.log("error : " + JSON.stringify(error));
    console.error(
      "Socket encountered error: ",
      error.message,
      "Closing socket"
    );
    websocketConnection.close();
  };

  const deliverMessage = (message) => {
    websocketConnection.send(JSON.stringify(message));
  };

  const renderMessage = async (message) => {
    if (message.blocks && message.blocks.enableUserInput) {
      setInputData(null);
      setEnableUserInput(true);
      setDisableSubmitButton(true);
    } else {
      setEnableUserInput(false);
    }

    setConversation((conversation) => {
      conversation = getReplyClearedConversation(conversation);
      let previousMessage =
        conversation.length > 0 ? conversation[conversation.length - 1] : null;
      if (previousMessage && previousMessage.type === "typing") {
        conversation.pop();
      }
      return [...conversation, message];
    });
    scrollBottom();
  };

  const getReplyClearedConversation = (convo) => {
    let length = convo.length;
    let previousMessage = convo[length - 1];
    if (length > 0 && previousMessage.quick_replies) {
      previousMessage.quick_replies = null;
    } else if (
      length > 0 &&
      previousMessage.blocks &&
      previousMessage.blocks.viewType
    ) {
      previousMessage.blocks.viewType = null;
    }
    if(length > 0 &&
      previousMessage.blocks &&
      previousMessage.blocks.BACK_TO_PREVIOUS_MENU){
      previousMessage.blocks.BACK_TO_PREVIOUS_MENU = null;
    }
    return convo;
  };

  const reConnectWebSocket = () => {
    if (
      !websocketConnection ||
      websocketConnection.readyState === WebSocket.CLOSED
    )
      connectWebSocket(webSocketConfig.webSocketUrl, extras); //check if websocket instance is closed, if so call `connect` function.
  };

  const canShowAvatar = (messageType, previousMessageType) => {
    let showAvatar = true;
    if (messageType && messageType === previousMessageType) {
      showAvatar = false;
    }
    if (previousMessageType === "message" && messageType === "typing") {
      showAvatar = false;
    }
    previousMessageType = messageType;
    return showAvatar;
  };

  const sendCustomMessage = () => {
    let message = {
      type: "outgoing",
      text: JSON.stringify(inputData.data),
      textToShow: inputData.textToShow,
      user: user.id,
      channel: "socket",
      extras: { eventType: extras.eventType, orderId: extras.orderId },
    };
    sendOutgoingMessage(message, message);
  };

  const sendQuickRepliesMessage = (event, reply) => {
    if (event) event.preventDefault();
    let message = {
      type: "outgoing",
      text: reply.payload,
      textToShow: reply.title,
      user: user.id,
      channel: "socket",
      extras: {
        type: "quick_reply",
        eventType: extras.eventType,
        orderId: extras.orderId,
      },
    };
    sendOutgoingMessage(message, message);
  };

  const sendImageMessage = async (message, images, imageData) => {
    const messageToShow = {
      type: "image",
      images: images,
    };
    const messageToSend = {
      type: "image",
      text: JSON.stringify(imageData),
      images: images,
      user: user.id,
      channel: "socket",
      extras: { eventType: "ORDER_CHAT", orderId: message.blocks.orderId },
    };
    sendOutgoingMessage(messageToShow, messageToSend);
  };

  const sendTextMessage = async (event) => {
    if (event) event.preventDefault();
    let textToSend =
      userInputRef && userInputRef.current ? userInputRef.current.value : ""; //input from user input
    let textToShow = textToSend;
    if (!textToShow || textToShow === "" || textToShow.trim().length === 0) {
      return;
    }
    let message = {
      type: "outgoing",
      text: textToSend,
      textToShow: textToShow,
      user: user.id,
      channel: "socket",
      extras: { eventType: extras.eventType, orderId: extras.orderId },
    };
    sendOutgoingMessage(message, message);
    if (userInputRef && userInputRef.current) {
      userInputRef.current.value = "";
    }
    setDescription();
  };

  const sendRadioButtonMessage = (radioInputData) => {
    let message = {
      type: "outgoing",
      text: JSON.stringify(radioInputData.data),
      textToShow: radioInputData.textToShow,
      user: user.id,
      channel: "socket",
      extras: { eventType: extras.eventType, orderId: extras.orderId },
    };
    sendOutgoingMessage(message, message);
  };

  const sendOutgoingMessage = (messageToShow, messageToSend) => {
    renderMessage(messageToShow);
    deliverMessage(messageToSend);
    setNumberToSkip((numberToSkip) => numberToSkip + 1);
  };

  const updateInputData = (inputData) => {
    if (inputData.data.length > 0 && inputData.isValid) {
      setErrorMessage(null);
    } else {
      setErrorMessage(inputData.errorMessage);
    }
    setInputData(inputData);
  };

  const generateChatMessages = () => {
    return conversation.map((message, index) => {
      return (
        <Message
          key={index}
          message={message}
          canShowAvatar={canShowAvatar(
            message.type,
            index > 0 ? conversation[index - 1].type : null
          )}
          updateInputData={updateInputData}
          setErrorMessage={setErrorMessage}
          sendQuickRepliesMessage={sendQuickRepliesMessage}
          sendCustomMessage={sendCustomMessage}
          sendImageMessage={sendImageMessage}
          scrollBottom={scrollBottom}
          sendRadioButtonMessage={sendRadioButtonMessage}
        />
      );
    });
  };

  const scrollHistory = (height) => {
    if (messageWindowRef && messageWindowRef.current) {
      messageWindowRef.current.scrollTo(
        0,
        messageWindowRef.current.scrollHeight - height
      );
    }
  };

  const onScrollHandler = async (e) => {
    const element = e.target;
    let isScrollingTop = true;
    if (currentScrollTop <= element.scrollTop) {
      isScrollingTop = false;
    }
    currentScrollTop = element.scrollTop;
    const currentScrollHeight = element.scrollHeight;
    let amountScrolled =
      currentScrollHeight - element.offsetHeight - currentScrollTop;
    if (
      !historyLock &&
      isScrollingTop &&
      currentScrollTop < 10 &&
      remainingHistoryMessages > 0
    ) {
      historyLock = true;
      setHistoryLoader(true);
      let dateMessage = conversation[0];
      setConversation((conversation) => {
        conversation.shift();
        return conversation;
      });
      await renderHistory(false, false, dateMessage);
      setHistoryLoader(false);
      historyLock = false;
    }
    if (amountScrolled > 50 && !showScrollBottom) {
      setShowScrollBottom(true);
    } else if (amountScrolled <= 50 && showScrollBottom) {
      setShowScrollBottom(false);
    }
  };

  const connectChat = async (message, name) => {
    if (reconnectSectionDetails.name === CHAT_AGAIN) {
      setConversation((conversation) => {
        conversation.push({ type: "separator", text: "now" });
        return [...conversation];
      });
    }
    setReconnectSectionDetails({
      ...reconnectSectionDetails,
      show: false,
    });
    await connect();
  };

  const onDescriptionChange = (e) => {
    if (e.target.value.length <= maxInputLength) {
      setDescription(e.target.value);
    }
    if (e.target.value.trim().length > 0) {
      setDisableSubmitButton(false);
    } else {
      setDisableSubmitButton(true);
    }
  };

  return (
    <div className="wrapper">
      <div id="message_window">
        <React.Fragment>
          <div className="powered_by flex-column">
            <div className="align-items-center d-flex w-100">
              <svg
                className="w-auto h-auto"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="36"
                height="36"
                viewBox="0 0 52 52"
              >
                <defs>
                  <style>{`.chatIcon{fill:url(#chatIcon);}`}</style>
                  <linearGradient
                    id="chatIcon"
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
                    className="chatIcon"
                    width="52"
                    height="52"
                    rx="6"
                    transform="translate(6369 655)"
                  />
                  <path
                    fill="#fff"
                    d="M125.759,117.911a9.938,9.938,0,0,0,.276-2.392,10.518,10.518,0,0,0-21.036,0,10.132,10.132,0,0,0,1.028,4.517,3.87,3.87,0,0,1-.748,4.369.956.956,0,0,0,.676,1.632h9.562a9.86,9.86,0,0,0,2.377-.274A10.587,10.587,0,0,0,125.759,117.911Zm10.714,13.616a10.156,10.156,0,0,0,1.036-4.534,10.527,10.527,0,0,0-9.619-10.473,11.389,11.389,0,0,1-.276,1.852,12.492,12.492,0,0,1-9.286,9.254,11.08,11.08,0,0,1-1.809.267,10.527,10.527,0,0,0,10.473,9.618h9.562a.956.956,0,0,0,.676-1.632A3.864,3.864,0,0,1,136.473,131.527Zm-13.306-3.578a.956.956,0,1,1,.956-.956A.956.956,0,0,1,123.166,127.949Zm3.825,0a.956.956,0,1,1,.956-.956A.956.956,0,0,1,126.991,127.949Zm3.825,0a.956.956,0,1,1,.956-.956A.956.956,0,0,1,130.816,127.949Z"
                    transform="translate(6274.001 560)"
                  />
                  <path
                    fill="#08ce73"
                    d="M-4779.722,502v-4.278H-4784v-2.444h4.279V491h2.444v4.278H-4773v2.444h-4.277V502Z"
                    transform="translate(11168 179)"
                  />
                </g>
              </svg>
              <div>
                <p className="mb-0 ml-2">
                  <strong>MedPlus</strong>Chat bot
                </p>
                {botHeaderStatus &&
                  (botHeaderStatus === "Online" ||
                    botHeaderStatus === "connecting...") && (
                    <small className="help-text d-flex align-items-center">
                      {botHeaderStatus === "Online" && (
                        <span className="bg-success status-dot"></span>
                      )}
                      {botHeaderStatus === "connecting..." && (
                        <span className="bg-warning status-dot"></span>
                      )}
                      {botHeaderStatus}
                    </small>
                  )}
              </div>
            </div>
            <button onClick={() => props.toggleChat()} className="end-chat-btn btn btn-sm remove" style={{"position": "absolute","right": "0.5rem"}}>
              End Chat
            </button>
            {props.chatHeaderDetails &&
              <div className="pt-2 w-100">
                {props.chatHeaderDetails.displayOrderId &&
                  <p className="mb-0 text-dark text-truncate">
                    <label className="font-14 mr-1 text-secondary">Order ID </label>
                    <strong className="font-14">{props.chatHeaderDetails.displayOrderId}</strong>
                  </p>
                }
                <div className="d-flex justify-content-between clearfix">
                  <p className="flex-fill pl-0 font12">
                    {props.chatHeaderDetails.status &&
                      <React.Fragment>
                        <span className= {props.chatHeaderDetails.statusClass ? props.chatHeaderDetails.statusClass : "text-secondary"}>
                          {props.chatHeaderDetails.status}
                        </span>
                        <span className="dot-separator"></span>
                      </React.Fragment>
                    }
                    {props.chatHeaderDetails.amount &&
                      <span className="text-secondary">
                        <span className="rupee">&#x20B9;</span>{props.chatHeaderDetails.amount}
                      </span>
                    }
                  </p>
                </div>
              </div>
            }
          </div>
        </React.Fragment>
        <section
          id="msg-container"
          onScroll={onScrollHandler}
          ref={messageWindowRef}
        >
          <div id="message_list">
            <div
              className="typing-indicator"
              style={{
                display: historyLoader ? "table" : "none",
                padding: "1.5rem",
              }}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div
              id="bot_status_container"
              style={{
                display: botStatus && botStatus !== "online" ? "block" : "none",
              }}
            >
              <small>{botStatus}</small>
            </div>
            {generateChatMessages()}

            <div
              id="scroll_bottom_button"
              style={{
                display: showScrollBottom ? "flex" : "none",
                bottom: enableUserInput ? "85px" : "55px",
              }}
              onClick={scrollBottom}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <g transform="translate(-762 -906.838)">
                  <rect
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    width="18"
                    height="18"
                    transform="translate(762 906.838)"
                  ></rect>
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#ffffff"
                    d="M61.559,501.985l4.049-4.049a.917.917,0,1,0-1.3-1.3l-3.4,3.39-3.4-3.4a.921.921,0,0,0-1.569.649.912.912,0,0,0,.272.649l4.049,4.059A.922.922,0,0,0,61.559,501.985Z"
                    transform="translate(710.032 416.557)"
                  ></path>
                </g>
              </svg>
            </div>
            {props.application === "MOBILE" && <div ref={bottomContainerRef} />}
          </div>
        </section>
        {reconnectSectionDetails.show && (
          <footer>
            <div className="chatAgain">
              <p>{reconnectSectionDetails.message}</p>
              <button className="btn btn-danger btn-sm"
                onClick={async () => {
                  await connectChat();
                }}
              >
                {reconnectSectionDetails.name}
              </button>
            </div>
          </footer>
        )}
        {errorMessage && <div className="error-message p-2">{errorMessage}</div>}
        {enableUserInput && (
          <footer>
            <form onSubmit={sendTextMessage}>
              <input
                className="form-control ml-0"
                type="text"
                autoComplete="off"
                id="messenger_input"
                placeholder={descriptionPlaceHolder}
                ref={userInputRef}
                maxLength={maxInputLength}
                autoFocus
                value={description}
                onChange={(e) => {
                  onDescriptionChange(e);
                }}
              />
              <button type="submit" disabled={disableSubmitButton} className="btn btn-danger" style={{"min-height":"unset"}}>Send</button>
            </form>
          </footer>
        )}
      </div>
    </div>
  );
};

export default ChatDialog;
