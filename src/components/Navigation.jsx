import { useState } from "react";

import { useAppContext } from "../AppContext";
import Toast from "./Toast";
import "./Navigation.css";

export default function Navigation() {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    isError: false,
  });
  const { edges, nodes } = useAppContext();

  const validateNodes = () => {
    const nodeIdsWithIncomingEdges = new Set(edges.map((edge) => edge.target));
    const nodesWithoutIncomingEdges = nodes.filter(
      (node) => !nodeIdsWithIncomingEdges.has(node.id)
    );

    if (nodes.length > 1 && nodesWithoutIncomingEdges.length > 1) {
      setToast({
        show: true,
        message: "Cannot save flow",
        isError: true,
      });
      setTimeout(() => {
        setToast({ show: false, message: "", isError: false });
      }, 2000);
      return null;
    }

    setToast({
      show: true,
      message: "Flow saved",
      isError: false,
    });
    setTimeout(() => {
      setToast({ show: false, message: "", isError: false });
    }, 2000);

    return null;
  };

  console.log(toast);

  return (
    <nav className="nav-container">
      <button className="nav-button" onClick={validateNodes}>
        Save Changes
      </button>
      <Toast
        message={toast.message}
        show={toast.show}
        isError={toast.isError}
        onClose={() => setToast({ show: false, message: "", isError: false })}
      />
    </nav>
  );
}
