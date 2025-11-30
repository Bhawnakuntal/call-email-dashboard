import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Navbar() {
  const { users, selectedUser, setSelectedUser } = useContext(AppContext);

  return (
    <div
      style={{
        width: "100%",
        background: "#0a3d91",
        padding: "20px 40px",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>Select User</h2>

      {/* USER DROPDOWN */}
      <select
        value={selectedUser?.userId || ""}
        onChange={(e) => {
          const user = users.find((u) => u.userId === e.target.value);
          setSelectedUser(user || null);
        }}
        style={{
          padding: "8px 12px",
          borderRadius: "5px",
          fontSize: "16px",
          border: "1px solid #ccc",
          width: "250px",
        }}
      >
        <option value="">Select User</option>
        {users.map((u) => (
          <option key={u.userId} value={u.userId}>
            {u.userName}
          </option>
        ))}
      </select>
    </div>
  );
}
