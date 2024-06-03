import { createContext, useContext, useEffect, useReducer } from "react";
import { useNodesState } from "reactflow";

import { nodes as initialNodes, edges as initialEdges } from "../initial_data";

const AppContext = createContext(null);

const initialState = {
  activeMessageId: null, // This stores the message that has been selected
};

const appActionTypes = {
  ADD_NODES: "ADD_NODES",
  ADD_EDGE: "ADD_EDGE",
  UPDATE_ACTIVE_MESSAGE_ID: "UPDATE_ACTIVE_MESSAGE_ID",
  REMOVE_ACTIVE_MESSAGE_ID: "REMOVE_ACTIVE_MESSAGE_ID",
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case appActionTypes.ADD_NODES:
      return { ...state, newNodes: action.nodes };
    case appActionTypes.ADD_EDGE:
      return { ...state };
    case appActionTypes.UPDATE_ACTIVE_MESSAGE_ID:
      return { ...state, activeMessageId: action.activeMessageId };
    case appActionTypes.REMOVE_ACTIVE_MESSAGE_ID:
      return { ...state, activeMessageId: null };
    default:
      return state;
  }
}

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  //   useEffect(() => {
  //     dispatch({
  //       type: appActionTypes.ADD_NODES,
  //       newNodes: nodes,
  //     });
  //   }, [nodes, setNodes]);

  const handleNodeTextChange = (id, newMessage) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          node.data = {
            ...node.data,
            label: newMessage,
          };
        }
        return node;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{ state, dispatch, nodes, setNodes, onNodesChange }}
    >
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  return useContext(AppContext);
}

export { AppProvider, AppContext, useAppContext, appActionTypes };
