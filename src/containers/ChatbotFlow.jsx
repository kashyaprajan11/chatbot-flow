import React, { useCallback } from "react";
import ReactFlow, { addEdge, Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

import TextNode from "../components/TextNode";
import { useAppContext } from "../AppContext";

const nodeTypes = {
  text: TextNode,
};

export default function ChatbotFlow(props) {
  const { nodes, onNodesChange, edges, setEdges, onEdgesChange } =
    useAppContext();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        {...props}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
