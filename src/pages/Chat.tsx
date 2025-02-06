import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';

// Define a type for a message object
interface Message {
  text: string;
  sender: 'user' | 'bot'; // The sender can either be 'user' or 'bot'
}

const Chat: React.FC = () => {
  // State to manage the user's input and messages
  const [message, setMessage] = useState<string>(''); // The message the user is typing
  const [messages, setMessages] = useState<Message[]>([]); // Array of messages (user and bot)
  const { userData } = useAuth() 

  // Function to handle sending the message
  const sendMessage = (): void => {
    if (message.trim() === '') return;

    // Add the user's message to the message list
    const newMessages = [...messages, { text: message, sender: 'user' }];
    setMessages(newMessages);

    // Simulate a response (e.g., a ChatGPT-like response)
    setTimeout(() => {
      const response = 'This is a simulated response!';
      setMessages([...newMessages, { text: response, sender: 'bot' }]);
    }, 1000); // Simulating a 1 second delay for bot response

    setMessage(''); // Clear input field
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border border-gray-300 rounded-lg shadow-md">
      <h1>Hi {userData?.username}, What's on your mind today</h1>
      <div className="space-y-4 h-80 overflow-y-auto p-4 border-b border-gray-200">
        {/* Display all messages */}
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'user' ? 'text-right' : 'text-left'}>
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex">
        {/* Input field for user message */}
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-l-lg focus:outline-none"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
