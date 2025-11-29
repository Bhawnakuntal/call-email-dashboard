import { useContext, useMemo, useState } from "react";
import { AppContext } from "../context/AppContext";
import UserDropdown from "../components/UserDropdown";
import PieChart from "../components/PieChart";
import CallsTable from "../components/CallsTable";

export default function Dashboard() {

  const { selectedUser, accounts, calls, emails } = useContext(AppContext);

  // ⭐ Correct place for useState
  const [selectedSegment, setSelectedSegment] = useState(null);

  // 1. Filter accounts based on selected user's territory
  const filteredAccounts = useMemo(() => {
    if (!selectedUser) return [];
    return accounts.filter(
      acc => acc.territory === selectedUser.territory
    );
  }, [selectedUser, accounts]);

  // 2. Extract account IDs
  const accountIds = useMemo(() => {
    return filteredAccounts.map(acc => acc.id);
  }, [filteredAccounts]);

  // 3. Filter calls for these accounts
  const filteredCalls = useMemo(() => {
    if (!selectedUser) return [];
    return calls.filter(call => accountIds.includes(call.accountId));
  }, [calls, accountIds, selectedUser]);

  // 4. Filter emails for these accounts
  const filteredEmails = useMemo(() => {
    if (!selectedUser) return [];
    return emails.filter(email => accountIds.includes(email.accountId));
  }, [emails, accountIds, selectedUser]);

  // 5. Group calls by type (for pie chart)
  const callTypeCounts = useMemo(() => {
    const counts = {
      faceToFace: 0,
      inPerson: 0,
      phone: 0,
      email: 0,
      other: 0
    };

    filteredCalls.forEach(call => {
      const type = call.callType.toLowerCase();

      if (type === "face to face") counts.faceToFace++;
      else if (type === "inperson") counts.inPerson++;
      else if (type === "phone") counts.phone++;
      else if (type === "email") counts.email++;
      else counts.other++;
    });

    return counts;
  }, [filteredCalls]);

  // 6. Filter calls when clicking a pie slice
  const segmentCalls = useMemo(() => {
    if (!selectedSegment) return [];

    return filteredCalls.filter(call =>
      call.callType.toLowerCase() === selectedSegment.toLowerCase()
    );
  }, [selectedSegment, filteredCalls]);


  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <UserDropdown />

      {/* Selected Territory */}
      {selectedUser ? (
        <p>Selected Territory: {selectedUser.territory}</p>
      ) : (
        <p>Please select a user.</p>
      )}

      {/* Accounts List */}
      {selectedUser && (
        <div
          style={{
            marginTop: "20px",
            maxHeight: "180px",
            overflowY: "auto",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
            background: "#fafafa"
          }}
        >
          <h3>Accounts in {selectedUser.territory} Territory:</h3>
          <p>Total Accounts: {filteredAccounts.length}</p>

          <ul>
            {filteredAccounts.map(acc => (
              <li key={acc.id}>{acc.name}</li>
            ))}
          </ul>
        </div>
      )}


      {/* PIE CHART + TABLE SECTION(table After clicking the segment) */}
      {selectedUser && (
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "40px"
          }}
        >

          {/* LEFT BOX → PIE CHART */}
          <div
            style={{
              background: "#e7f1ff",
              padding: "10px",
              borderRadius: "12px",
              width: "620px",
              minHeight: "585px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
            }}
          >
            <PieChart
              counts={callTypeCounts}
              onSliceClick={(segment) => setSelectedSegment(segment)}
            />
          </div>

          {/* RIGHT BOX → TABLE */}
          {selectedSegment && (
            <div
              style={{
                background: "#e7f1ff",
                padding: "30px",
                borderRadius: "12px",
                width: "620px",
                minHeight: "80px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
              }}
            >
              <CallsTable calls={segmentCalls} segmentName={selectedSegment} />
            </div>
          )}

        </div>
      )}


      {/* Calls Details */}
      {selectedUser && (
        <div style={{ marginTop: "20px" }}>
          <h3>Total Calls: {filteredCalls.length}</h3>
          <ul>
            {filteredCalls.map(call => (
              <li key={call.id}>
                {call.callType} - {call.callResult}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Emails Details */}
      {selectedUser && (
        <div style={{ marginTop: "20px" }}>
          <h3>Total Emails: {filteredEmails.length}</h3>
          <ul>
            {filteredEmails.map(email => (
              <li key={email.id}>{email.status}</li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}
