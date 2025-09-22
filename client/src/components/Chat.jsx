import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const Chat = () => {
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const socketRef = useRef(0)

    useEffect(() => {
        socketRef.current = io("http://localhost:3000")

        socketRef.current.on("connect", () => {
            console.log("User Connected Successfully -> ", socketRef.current.id)
        })

        socketRef.current.on("disconnect", () => {
            console.log("User disconneced -> ", socketRef.current.id)
        })

        socketRef.current.on("new-message", (msg) => {
            setMessages((prev) => ([
                ...prev,
                msg
            ]))
        })

        return () => {
            socketRef.current.disconnect();
        }
    }, [])

    const handleNewMessage = () => {
        if(newMessage == "") {
            alert("sent message cannot be empty!")
            return
        }

        socketRef.current.emit("message", newMessage)
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 text-lg font-semibold shadow">
        Real-Time Chat
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              index % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs shadow ${
                index % 2 === 0
                  ? "bg-white text-gray-800"
                  : "bg-blue-500 text-white"
              }`}
            >
              {msg}
            </div>
          </div>
        ))}
      </div>

      {/* Input section */}
      <div className="flex items-center p-4 border-t bg-white">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleNewMessage}
          className="ml-3 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;