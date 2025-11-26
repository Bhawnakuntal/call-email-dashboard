import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import UserDropdown from "../components/UserDropdown";

export default function Dashboard() {
  const { selectedUser } = useContext(AppContext);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <UserDropdown />

      {selectedUser ? (
        <p>Selected Territory: {selectedUser.territory}</p>
      ) : (
        <p>Please select a user.</p>
      )}
    </div>
  );
}
