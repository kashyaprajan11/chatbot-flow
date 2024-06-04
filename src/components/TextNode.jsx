import React, { memo } from "react";
import { Handle, useStore, Position, useReactFlow } from "reactflow";
import { IoChatbubbleOutline } from "react-icons/io5";
import { PiWhatsappLogoFill } from "react-icons/pi";

import { useAppContext, appActionTypes } from "../AppContext";
import "./TextNode.css";

export default memo(({ id, data }) => {
  const { state, dispatch } = useAppContext();

  const handleClick = () => {
    dispatch({
      type: appActionTypes.UPDATE_ACTIVE_MESSAGE,
      activeMessageId: id,
      activeMessage: data.label,
    });
  };

  const isSelected = id === state.activeMessageId;

  return (
    <div
      className="text-node"
      style={{ outline: isSelected ? "1px solid #1ecbe1" : "none" }}
      onClick={handleClick}
    >
      <div className="text-node-header">
        <div className="send-message-box">
          <IoChatbubbleOutline />
          <p>Send Message</p>
        </div>
        <div className="whatsapp-icon-box">
          <PiWhatsappLogoFill style={{ color: "green" }} />
        </div>
      </div>

      <p className="text-node-message">{data.label}</p>

      <Handle type="target" position={Position.Right} />
      <Handle type="source" position={Position.Left} />
    </div>
  );
});
