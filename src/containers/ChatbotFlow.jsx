import React, { useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";

import TextNode from "../components/TextNode";
import { useAppContext } from "../AppContext";
import {
  nodes as initialNodes,
  edges as initialEdges,
} from "../../initial_data";

const nodeTypes = {
  text: TextNode,
};

export default function ChatbotFlow() {
  const { state, nodes, onNodesChange } = useAppContext();
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
