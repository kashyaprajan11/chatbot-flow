import React, { memo } from "react";
import { Handle, useStore, Position, useReactFlow } from "reactflow";

export default memo(({ data }) => {
  const { setNodes } = useReactFlow();

  return (
    <div>
      <p>Send Message</p>
      <p>{data.label}</p>
      <Handle type="target" position={Position.Right} />
      <Handle type="source" position={Position.Left} />
    </div>
  );
});
