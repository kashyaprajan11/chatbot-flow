export const nodes = [
  {
    id: "sm-1", // send-message-1
    type: "text", // New types can be added when expanding features
    data: {
      label: "Test message 1",
    },
    position: { x: 500, y: 100 },
  },
  {
    id: "sm-2",
    type: "text",
    data: {
      label: "Test message 2",
    },
    position: { x: 200, y: 200 },
  },
];

export const edges = [
  {
    id: "e1-2",
    source: "sm-1",
    target: "sm-2",
    // label: "edge",
    // type: "smoothstep",
  },
];
