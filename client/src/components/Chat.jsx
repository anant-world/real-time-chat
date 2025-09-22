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
        <div>
            <div>
                {messages.map((id, value) => (
                    <li key={id}>message - {value}</li>
                ))}
            </div>
            <div>
                <input type="text" name="" id="" value={newMessage} onChange={(er) => setNewMessage(er.target.value)} />
                <button onClick={handleNewMessage}></button>
            </div>
        </div>
    )
}

export default Chat
