import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export default function Game() {
  const [messages, setMessages] = useState([]);
  const [nickname, setNickname] = useState("");
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => socket.off("message");
  }, []);

  const joinRoom = () => {
    if (!nickname || !roomId) {
      alert("Please enter both a nickname and a room ID!");
      return;
    }
    socket.emit("joinRoom", { roomId, nickname });
    setJoined(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Word Chain Game</h1>

      {!joined ? (
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Enter nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <input
            type="text"
            placeholder="Enter room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <button onClick={joinRoom} style={{ padding: "5px 10px" }}>
            Join Room
          </button>
        </div>
      ) : (
        <h3>
          Joined <strong>{roomId}</strong> as <strong>{nickname}</strong>
        </h3>
      )}

      <ul>
        {messages.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  );
}
