// pages/chatbot.js
import React from 'react';

const ChatbotPage = () => {
  return (
    <div 
      style={{
        width: '100%',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden', // Menghindari overflow pada container
      }}
    >
      <iframe
        src="http://dify.rimcorpu.id/chatbot/IboDbWCM8O5fgVA5"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        frameBorder="0"
        allow="microphone"
      ></iframe>
    </div>
  );
};

export default ChatbotPage;
