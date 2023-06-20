import axios from "axios";
import { useState } from "react";
import socket from "../socket";
const JoinBlock = ({ onLogin }) => {
  console.log(socket);
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onEnter = async () => {
    if (!roomId || !userName) {
      return alert("Неверние данние");
    }
    const obj = {
      roomId,
      userName,
    };
    setIsLoading(true);
    await axios.post("/rooms", {
      roomId,
      userName,
    });
    onLogin(obj);
  };
  return (
    <div className="join-block">
      <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button
        className="btn btn-success"
        disabled={isLoading}
        onClick={onEnter}
      >
        {isLoading ? "Out" : "Join..."}
      </button>
    </div>
  );
};

export default JoinBlock;
