import { createContext, useContext, useEffect, useReducer } from "react";
import { useNodesState, useEdgesState } from "reactflow";

import { nodes as initialNodes, edges as initialEdges } from "../initial_data";

const AppContext = createContext(null);

const initialState = {
  activeMessageId: null, // id of the selected node
};

const appActionTypes = {
  UPDATE_ACTIVE_MESSAGE_ID: "UPDATE_ACTIVE_MESSAGE_ID",
  REMOVE_ACTIVE_MESSAGE_ID: "REMOVE_ACTIVE_MESSAGE_ID",
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case appActionTypes.UPDATE_ACTIVE_MESSAGE_ID:
      return {
        ...state,
        activeMessageId: action.activeMessageId,
      };
    case appActionTypes.REMOVE_ACTIVE_MESSAGE_ID:
      return { ...state, activeMessageId: null };
    default:
      return state;
  }
}

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Setting up nodes and edges hook in the context api so that they are availble everywhere
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        nodes,
        setNodes,
        onNodesChange,
        edges,
        setEdges,
        onEdgesChange,
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
