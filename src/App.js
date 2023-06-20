import React, { useEffect, useReducer } from "react";
import JoinBlock from "./components/JoinBlock";
import reducer from "./reducer";
import socket from "./socket";
import Chat from "./components/Chat";
import axios from "axios";
function App() {
  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  });
  const onLogin = async (obj) => {
    dispatch({
      type: "joined",
      payload: obj,
    });
    socket.emit("ROOM:JOIN", obj);
    const { data } = await axios.get(`/rooms/${obj.roomId}`);
    setUsers(data.users);
  };
  const setUsers = (users) => {
    console.log(users);
    dispatch({
      type: "SET_USERS",
      payload: users,
    });
  };
  useEffect(() => {
    console.log("useEffect");
    socket.emit("ROOM:JOINED", setUsers);
    socket.on("ROOM:SET_USERS", setUsers);
  }, []);
  socket.on(`ROOM:NEW_MESSAGE`, (message) => {
    dispatch({
      type: "NEW_MESSAGE",
      payload: message,
    });
  });
  window.socket = socket;
  return (
    <div className="wrapper">
      {!state.joined ? <JoinBlock onLogin={onLogin} /> : <Chat {...state} />}
    </div>
  );
}

export default App;
