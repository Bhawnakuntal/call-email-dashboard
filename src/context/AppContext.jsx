import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [calls, setCalls] = useState([]);
  const [emails, setEmails] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);

  // Load JSON files from /data
  useEffect(() => {
    import("../data/users.json").then((d) => setUsers(d.default || d));
    import("../data/accounts.json").then((d) => setAccounts(d.default || d));
    import("../data/calls.json").then((d) => setCalls(d.default || d));
    import("../data/emails.json").then((d) => setEmails(d.default || d));
  }, []);

  return (
    <AppContext.Provider
      value={{
        users,
        accounts,
        calls,
        emails,
        selectedUser,
        setSelectedUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
