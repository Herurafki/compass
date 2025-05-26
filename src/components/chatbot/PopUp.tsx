'use client'
import React, { useState } from 'react'


export default function PopUp() {
    const [showChat, setShowChat] = useState(false);

    const toggleChat = () => {
        setShowChat(!showChat);
      };
  return (
    <div style={{ position: 'relative', minHeight: '' }}>

        {/* Button Chat di pojok kanan bawah */}
      <button
        onClick={toggleChat}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#1C64F2',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          cursor: 'pointer',
          zIndex: 100,
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLButtonElement).style.backgroundColor = '#3b82f6';
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).style.backgroundColor = '#1C64F2';
        }}
      >
        {/* Chat icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>

        {/* Popup Chatbot */}
      {showChat && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',  // Memastikan chatbot muncul di atas tombol
            right: '20px',
            width: '500px',
            height: '600px',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 1000,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Chat Content - iframe untuk chatbot */}
          <iframe
            src="http://dify.rimcorpu.id/chatbot/IboDbWCM8O5fgVA5"
            style={{
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            title="Compostify Chatbot"
          /> 
        </div>
      )}

    </div>
  )
}
