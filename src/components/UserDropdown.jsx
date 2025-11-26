import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function UserDropdown() {
    const { users, selectedUser, setSelectedUser } = useContext(AppContext);

    const handleChange = (e) => {
        const userId = e.target.value;
        const user = users.find((u) => u.id === userId);
        setSelectedUser(user);
    };
    return (
        <div style={{ marginBottom: "20px" }}>
            <label style ={{ marginRight: "10px" , fontWeight: "bold"}}>Select User:</label>
            
            <select value = {selectedUser?.id || ""} onChange={handleChange}>
                <option value= "" >-- choose User --</option>

                {users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {u.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
