import { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [showInbox, setShowInbox] = useState(false);
  const [currentInboxID, setCurrentInboxID] = useState('');

  const startChat = ID => {
    setShowInbox(true);
    setCurrentInboxID(ID);
  };

  console.log(currentInboxID);

  const stopChat = () => {
    setShowInbox(false);
    setCurrentInboxID('');
  };

  return (
    <ChatContext.Provider
      value={{ startChat, currentInboxID, showInbox, stopChat }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useGlobalChatContext = () => {
  return useContext(ChatContext);
};
