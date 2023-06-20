import { useState } from "react";
import socket from "../socket";

const Chat = ({ users, messages, userName, roomId }) => {
  const [messageValue, setMessageValue] = useState("");
  console.log(users);
  const onSendMessage = () => {
    socket.emit(`ROOM:NEW_MESSAGE`, {
      userName,
      roomId,
      text: messageValue,
    });
  };
  return (
    <div className="chat">
      <div className="chat-users">
        <hr />
        <b>Онлайн :({users.length}):</b>
        <ul>
          {users.map((name, index) => (
            <li key={name + index}>{name}</li>
          ))}
        </ul>
      </div>
      <div className="chat-messages">
        <div className="messages">
          {messages.map((message) => (
            <div className="message">
              <p>{message.text}</p>
              <div>
                <span>{message.userName}</span>
              </div>
            </div>
          ))}
        </div>
        <form>
          <textarea
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            className="form-control"
            rows="3"
          ></textarea>
          <button
            onClick={onSendMessage}
            type="button"
            className="btn btn-primary"
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
