import { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import UserDropdown from "../components/UserDropdown";

export default function Dashboard() {
  const { selectedUser, accounts, calls, emails } = useContext(AppContext);

  // 1. Filter accounts based on selected user's territory
  const filteredAccounts = useMemo(() => {
    if (!selectedUser) return [];
    return accounts.filter(
      (acc) => acc.territory === selectedUser.territory
    );
  }, [selectedUser, accounts]);

   // 2. Get all accountIds for the selected user's accounts
  const accountIds = useMemo(() => {
    return filteredAccounts.map((acc) => acc.id);
  }, [filteredAccounts]);

  // 3. Filter calls for these accountIds
  const filteredCalls = useMemo(() => {
    if (!selectedUser) return [];
    return calls.filter((call) => accountIds.includes(call.accountId));
  }, [calls, accountIds, selectedUser]);

  // 4. Filter emails for these accountIds
  const filteredEmails = useMemo(() => {
    if (!selectedUser) return [];
    return emails.filter((email) => accountIds.includes(email.accountId));
  }, [emails, accountIds, selectedUser]);


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

      {selectedUser && (
        <div style={{ marginTop: "20px" }}>
          <h3>Total Calls: {filteredCalls.length}</h3>
          <h3>Total Emails: {filteredEmails.length}</h3>

          <div style={{ marginTop: "10px" }}>
            <h4>Calls:</h4>
            <ul>
              {filteredCalls.map((call) => (
                <li key={call.id}>
                  {call.callType} - {call.callResult}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: "10px" }}>
            <h4>Emails:</h4>
            <ul>
              {filteredEmails.map((email) => (
                <li key={email.id}>
                  {email.status}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

    </div>
  );
}
