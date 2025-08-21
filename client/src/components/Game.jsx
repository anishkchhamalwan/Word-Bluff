import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export default function Game() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => socket.off("message");
  }, []);

  const joinRoom = () => {
    const nickname = prompt("Enter your nickname:");
    socket.emit("joinRoom", { roomId: "room1", nickname });
  };

  return (
    <div>
      <h1>Word Chain Game</h1>
      <button onClick={joinRoom}>Join Room</button>
      <ul>
        {messages.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  );
}