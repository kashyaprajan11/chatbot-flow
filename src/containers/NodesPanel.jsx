import { useEffect, useState } from "react";
import { appActionTypes, useAppContext } from "../AppContext";
import { label } from "three/examples/jsm/nodes/Nodes.js";

export default function NodesPanel() {
  const [messageText, setMessageText] = useState(""); // Active message id label value here
  const { state, nodes, setNodes, dispatch } = useAppContext();
  const { activeMessageId } = state;

  const handleChange = (e) => {
    setMessageText(e.target.value);
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

  const handleUpdate = () => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === activeMessageId) {
          return {
            ...node,
            data: {
              ...node.data,
              label: messageText,
            },
          };
        }
        return node;
      })
    );

    goBack();
  };
  if (activeMessageId) {
    return (
      <div>
        <button onClick={goBack}>Back</button>
        <button onClick={handleUpdate}>Save Changes</button>
        <hr />
        <input type="text" value={messageText} onChange={handleChange} />
      </div>
    );
  }

  const handleAddNode = () => {};

  return (
    <div>
      <div
        className="add-node-box"
        onDragStart={(event) => onDragStart(event, "text")}
        draggable
      >
        <p>Messages</p>
      </div>
    </div>
  );
}
