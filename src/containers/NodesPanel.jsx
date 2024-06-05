import { useEffect, useState } from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { IoIosArrowRoundBack } from "react-icons/io";

import { appActionTypes, useAppContext } from "../AppContext";
import "./NodesPanel.css";

export default function NodesPanel() {
  const { state, nodes, setNodes, dispatch } = useAppContext();
  const [messageText, setMessageText] = useState(""); // Active message id label value here
  const { activeMessageId } = state;

  // Disabling back button in case textarea is empty
  const isBackButtonDisabled = messageText.length === 0;

  useEffect(() => {
    // If activeMessageId is null the do nothing
    if (activeMessageId === null) {
      return;
    }
    // If any node is selected then active id isn't null. In that case add the label value in messageText.
    if (activeMessageId) {
      const labelText = nodes.find((nds) => nds.id === activeMessageId)?.data
        .label;
      setMessageText(labelText);
    }
  }, [activeMessageId]);

  // Any change in the messageText textfield should change the value of that particular node label as well
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

  // Function to go back to the message panel
  const goBack = () => {
    dispatch({
      type: appActionTypes.REMOVE_ACTIVE_MESSAGE_ID,
    });
  };

  // Todo: check here once
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  // If user has selected a node then show this ui
  if (activeMessageId) {
    return (
      <div>
        <div className="edit-node-box-header">
          <button
            className="back-button"
            onClick={goBack}
            disabled={isBackButtonDisabled}
          >
            <IoIosArrowRoundBack style={{ height: "25px", width: "25px" }} />
          </button>
          <p>Message</p>
        </div>
        <hr style={{ marginBlock: "1px" }} />

        <div style={{ marginTop: "0.8rem" }}>
          <p style={{ fontSize: "0.8rem", color: "grey" }}>Text</p>
          <textarea
            className={`input-message ${
              isBackButtonDisabled ? "input-error" : ""
            }`}
            type="text"
            rows={5}
            value={messageText}
            onChange={handleChange}
          />
          {isBackButtonDisabled && (
            <p className="error-message">Cannot be empty</p>
          )}
        </div>
      </div>
    );
  }

  // Ui to be shown by default
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
