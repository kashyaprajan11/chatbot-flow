import React, { memo } from "react";
import { Handle, useStore, Position, useReactFlow } from "reactflow";
import { useAppContext, appActionTypes } from "../AppContext";

export default memo(({ id, data }) => {
  const { state, dispatch } = useAppContext();

  const handleClick = () => {
    dispatch({
      type: appActionTypes.UPDATE_ACTIVE_MESSAGE_ID,
      activeMessageId: id,
    });
  };

  return (
    <div onClick={handleClick}>
      <p>Send Message</p>
      <p>{data.label}</p>
      <Handle type="target" position={Position.Right} />
      <Handle type="source" position={Position.Left} />
    </div>
  );
});
