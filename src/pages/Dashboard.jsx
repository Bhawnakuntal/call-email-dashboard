import { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import UserDropdown from "../components/UserDropdown";

export default function Dashboard() {
  const { selectedUser, accounts } = useContext(AppContext);

  // Filter accounts based on selected user's territory
  const filteredAccounts = useMemo(() => {
    if (!selectedUser) return [];
    return accounts.filter(
      (acc) => acc.territory === selectedUser.territory
    );
  }, [selectedUser, accounts]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <UserDropdown />

      {selectedUser ? (
        <p>Selected Territory: {selectedUser.territory}</p>
      ) : (
        <p>Please select a user.</p>
      )}

      {selectedUser && (
        <div style={{ marginTop: "20px" }}>
          <h3>Accounts in {selectedUser.territory} Territory:</h3>
          <ul>
            {filteredAccounts.map((acc) => (
              <li key={acc.id}>{acc.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
