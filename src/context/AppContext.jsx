import React, { createContext, useState, useEffect } from "react";

import usersData from "../data/users.json";
import accountsData from "../data/accounts.json";
import callsData from "../data/calls.json";
import emailsData from "../data/emails.json";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [calls, setCalls] = useState([]);
  const [emails, setEmails] = useState([]);

  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    setUsers(usersData);
    setAccounts(accountsData);
    setCalls(callsData);
    setEmails(emailsData);
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
