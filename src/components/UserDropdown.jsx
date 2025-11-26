import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function UserDropdown() {
  const { users, selectedUser, setSelectedUser } = useContext(AppContext);

  const handleChange = (e) => {
    const userId = e.target.value;
    // users.json uses 'userId' and 'userName'
    const user = users.find((u) => u.userId === userId);
    setSelectedUser(user || null);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={{ marginRight: "10px", fontWeight: "bold" }}>
        Select User:
      </label>

      <select value={selectedUser?.userId || ""} onChange={handleChange}>
        <option value="">-- Choose User --</option>

        {users.map((u) => (
          <option key={u.userId} value={u.userId}>
            {u.userName}
          </option>
        ))}
      </select>
    </div>
  );
}
