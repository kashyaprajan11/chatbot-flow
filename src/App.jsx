import { useState } from "react";

import { AppProvider } from "./AppContext";
import ChatbotFlow from "./containers/ChatbotFlow";
import NodesPanel from "./containers/NodesPanel";
import "./App.css";

function App() {
  return (
    <AppProvider>
      <div style={{ display: "flex" }}>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "80vw",
            height: "100vh",
          }}
        >
          <ChatbotFlow />
        </div>
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "20vw",
            height: "100vh",
            borderLeft: "1px solid rgba(0,0,0,0.1)",
            padding: "0.75em 0.5em",
          }}
        >
          <NodesPanel />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
