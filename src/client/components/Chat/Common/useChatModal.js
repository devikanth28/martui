import { useState } from "react"

export const useChatModal = () => {
    const [startChat, setStartChat] = useState(false);
    const [chatHeaderDetails, setChatHeaderDetails] = useState({});
    const toggleChat = (chatHeaderData) => {
        setChatHeaderDetails(chatHeaderData);
        setStartChat(!startChat);
    };
    return [startChat,chatHeaderDetails,toggleChat]
}