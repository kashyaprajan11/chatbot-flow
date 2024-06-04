import { useAppContext, appActionTypes } from "../AppContext";
import "./Navigation.css";

export default function Navigation() {
  const { handleUpdateNodeLabel } = useAppContext();

  return (
    <nav className="nav-container">
      <button className="nav-button" onClick={handleUpdateNodeLabel}>
        Save Changes
      </button>
    </nav>
  );
}
