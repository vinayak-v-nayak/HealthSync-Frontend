import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  // Function to call Gemini API with the specific prompt format
  const gemini = async (userQuestion) => {
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyB_fnNcfHjnnLCI0-xYhwlCbgFefmU6k0E");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Customize the prompt to reflect an insurance policyholder asking a question
      const prompt = `You are an expert insurance agent. A policyholder has asked the following question: "${userQuestion}". `;

      const result = await model.generateContent(prompt);
      setAiResponse(result ? result.response.text() : "No response received");
    } catch (error) {
      console.error("Error with Gemini API:", error);
      setAiResponse("Sorry, there was an error while fetching the response.");
    }
  };

  // Handle sending the user's question and displaying the response
  const handleSend = async () => {
    if (!userInput.trim()) {
      return;
    }

    // Add the user's message
    const newUserMessage = { type: "user", text: userInput };
    setMessages((prev) => [...prev, newUserMessage]);

    // Check user authentication
    const token = Cookies.get("token");
    if (!token) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "You need to log in to send messages." },
      ]);
      setUserInput("");
      return;
    }

    // Set user question and send it to Gemini API for response
    setUserQuestion(userInput);

    // Clear the input for the next question
    setUserInput("");
  };

  // Whenever the user question changes, trigger the Gemini API
  useEffect(() => {
    if (userQuestion) {
      gemini(userQuestion);
    }
  }, [userQuestion]);

  // Whenever the AI response is received, append the bot's message
  useEffect(() => {
    if (aiResponse) {
      const newBotMessage = { type: "bot", text: aiResponse };
      setMessages((prev) => [...prev, newBotMessage]);
      setAiResponse(""); // Reset the AI response state to avoid duplicate replies
    }
  }, [aiResponse]);

  // Scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div id="chat-widget" className="chat-widget">
      {!isOpen ? (
        <button className="chat-toggle-btn" onClick={toggleChat}>
          💬
        </button>
      ) : (
        <div className="chat-window">
          <div className="chat-header">
            <button
              onClick={() => setMessages([])}
              className="new-chat-btn"
              title="Start New Chat"
            >
              🔄
            </button>
            <h2>IVA Chatbot</h2>
            <button onClick={toggleChat} className="close-chat-btn">
              X
            </button>
          </div>

          <div className="chat-body">
            {/* Render all messages */}
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.type}`}>
                {msg.text}
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          <div className="chat-footer">
            <input
              type="text"
              placeholder="Type your question..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="chat-input"
            />
            <button onClick={handleSend} className="send-btn">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
