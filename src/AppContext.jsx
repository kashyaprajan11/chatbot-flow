import { createContext, useContext, useEffect, useReducer } from "react";
import { useNodesState } from "reactflow";

import { nodes as initialNodes, edges as initialEdges } from "../initial_data";

const AppContext = createContext(null);

const initialState = {
  activeMessageId: null, // This stores the message that has been selected
  activeMessage: "",
};

const appActionTypes = {
  UPDATE_ACTIVE_MESSAGE: "UPDATE_ACTIVE_MESSAGE",
  REMOVE_ACTIVE_MESSAGE: "REMOVE_ACTIVE_MESSAGE",
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case appActionTypes.ADD_NODES:
      return { ...state, newNodes: action.nodes };
    case appActionTypes.ADD_EDGE:
      return { ...state };
    case appActionTypes.UPDATE_ACTIVE_MESSAGE:
      return {
        ...state,
        activeMessageId: action.activeMessageId,
        activeMessage: action.activeMessage,
      };
    case appActionTypes.REMOVE_ACTIVE_MESSAGE:
      return { ...state, activeMessageId: null, activeMessage: "" };
    default:
      return state;
  }
}

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  const handleUpdateNodeLabel = () => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === state.activeMessageId) {
          return {
            ...node,
            data: {
              ...node.data,
              label: state.activeMessage,
            },
          };
        }
        return node;
      })
    );
    dispatch({
      type: appActionTypes.REMOVE_ACTIVE_MESSAGE,
    });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        nodes,
        setNodes,
        onNodesChange,
        handleUpdateNodeLabel,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  return useContext(AppContext);
}

export { AppProvider, AppContext, useAppContext, appActionTypes };
