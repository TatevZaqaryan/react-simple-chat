import React from "react";
import io from "socket.io-client";
import JoinBlock from "./components/JoinBlock";

function App() {
  return (
    <div className="wrapper">
      <JoinBlock />
    </div>
  );
}

export default App;
