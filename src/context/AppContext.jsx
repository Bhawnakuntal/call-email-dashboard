import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export default function AppProvider({children}){
    const [users, setUsers] = usestate([]);
    const [accounts, setAccounts] = useState([]);
    const [calls, setCalls] = useState([]);
    const [emails, setEmails] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null);

    // Load JSON files from /data
    useEffect(() => {
        import("../data/users.json").then((d) => setUsers(d.default));
        import("../data/accounts.json").then((d) => setAccounts(d.default));
        import("../data/calls.json").then((d) => setCalls(d.default));
        import("../data/emails.json").then((d) => setEmails(d.default));
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