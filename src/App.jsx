import { useRef, useCallback, useState } from "react";
import { ReactFlowProvider } from "reactflow";

import { AppProvider, useAppContext } from "./AppContext";
import Navigation from "./components/Navigation";
import ChatbotFlow from "./containers/ChatbotFlow";
import NodesPanel from "./containers/NodesPanel";
import "./App.css";

function App() {
  const { setNodes } = useAppContext();
  const idRef = useRef(2);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Whenever a new node is created generate an new id for the node
  const getId = () => {
    idRef.current = idRef.current + 1;
    return `sm-${idRef.current}`;
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: "New node is here" },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div>
      <Navigation />
      <ReactFlowProvider>
        <div style={{ display: "flex" }}>
          <div className="chatbot-flow-container">
            <ChatbotFlow
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
            />
          </div>
          <div className="nodes-panel-container">
            <NodesPanel />
          </div>
        </div>
      </ReactFlowProvider>
    </div>
  );
}

function AppMain() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}

export default AppMain;
