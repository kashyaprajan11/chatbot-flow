import { useEffect, useState } from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { IoIosArrowRoundBack } from "react-icons/io";

import { appActionTypes, useAppContext } from "../AppContext";
import "./NodesPanel.css";

export default function NodesPanel() {
  const { state, nodes, setNodes, dispatch } = useAppContext();
  const [messageText, setMessageText] = useState(""); // Active message id label value here
  const { activeMessageId } = state;

  const handleChange = (e) => {
    setMessageText(e.target.value);
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === activeMessageId) {
          return {
            ...node,
            data: {
              ...node.data,
              label: e.target.value,
            },
          };
        }
        return node;
      })
    );
  };

  useEffect(() => {
    if (activeMessageId === null) {
      return;
    }
    if (activeMessageId) {
      const labelText = nodes.find((nds) => nds.id === activeMessageId)?.data
        .label;
      setMessageText(labelText);
    }
  }, [activeMessageId]);

  const goBack = () => {
    dispatch({
      type: appActionTypes.REMOVE_ACTIVE_MESSAGE_ID,
    });
  };

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  if (activeMessageId) {
    return (
      <div>
        <div className="edit-node-box-header">
          <button className="back-button" onClick={goBack}>
            <IoIosArrowRoundBack style={{ height: "25px", width: "25px" }} />
          </button>
          <p>Message</p>
        </div>
        <hr style={{ marginBlock: "1px" }} />

        <div style={{ marginTop: "0.8rem" }}>
          <p style={{ fontSize: "0.8rem", color: "grey" }}>Text</p>
          <textarea
            className="input-message"
            type="text"
            rows={5}
            value={messageText}
            onChange={handleChange}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        className="add-node-box"
        onDragStart={(event) => onDragStart(event, "text")}
        draggable
      >
        <BiMessageRoundedDetail style={{ height: "23px", width: "23px" }} />
        <p>Messages</p>
      </div>
    </div>
  );
}
