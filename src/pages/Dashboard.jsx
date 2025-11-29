import { useContext, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import { AppContext } from "../context/AppContext";
import PieChart from "../components/PieChart";
import CallsTable from "../components/CallsTable";

export default function Dashboard() {

  const { selectedUser, accounts, calls, emails } = useContext(AppContext);

  // ⭐ Correct place for useState
  const [selectedSegment, setSelectedSegment] = useState(null);

  // 1. Filter accounts based on user's territory
  const filteredAccounts = useMemo(() => {
    if (!selectedUser) return [];
    return accounts.filter(acc => acc.territory === selectedUser.territory);
  }, [selectedUser, accounts]);

  // 2. Extract account IDs
  const accountIds = filteredAccounts.map(acc => acc.id);

  // 3. Filter calls
  const filteredCalls = useMemo(() => {
    if (!selectedUser) return [];
    return calls.filter(call => accountIds.includes(call.accountId));
  }, [calls, accountIds, selectedUser]);

  // 4. Filter emails
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
    <>
      <Navbar />

       {/* TOP LIGHT BLUE BOX */}
      {!selectedUser && (
        <div
          style={{
            background: "#eef4ff",
            padding: "25px",
            marginTop: "20px",
            textAlign: "center",
            fontSize: "18px",
            fontWeight: "600",
            color: "#2a4ea2",
            borderRadius: "10px",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"
          }}
        >
          Please Select a User to View Analytics
        </div>
      )}

      {/* SECOND LIGHT BLUE BOX */}
      {!selectedUser && (
        <div
          style={{
            background: "#eef4ff",
            padding: "25px",
            marginTop: "20px",
            textAlign: "center",
            fontSize: "18px",
            fontWeight: "600",
            color: "#2a4ea2",
            borderRadius: "10px",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"
          }}
        >
          Please select a user to view account details.
        </div>
      )}

      {/* IF USER SELECTED → Show Pie Chart + Bottom Table */}
      
      {selectedUser && (
        <div style={{ padding: "20px" }}>

          {/* PIE CHART + RIGHT TABLE (only when a segment is clicked) */}
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "40px",
            }}
          >
            {/* LEFT PIE BOX ALWAYS visible after selecting user */}
            <div
              style={{
                background: "#e7f1ff",
                padding: "10px",
                borderRadius: "12px",
                width: "620px",
                minHeight: "580px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              }}
            >
              <PieChart
                counts={callTypeCounts}
                onSliceClick={(segment) => setSelectedSegment(segment)}
              />
            </div>

            {/* RIGHT TABLE ONLY WHEN A SEGMENT IS CLICKED */}
            {selectedSegment && (
              <div
                style={{
                  background: "#e7f1ff",
                  padding: "30px",
                  borderRadius: "12px",
                  width: "620px",
                  minHeight: "80px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                }}
              >
                <CallsTable calls={segmentCalls} segmentName={selectedSegment} />
              </div>
            )}
          </div>

          {/* USER TERRITORY ACCOUNT DETAILS TABLE BELOW EVERYTHING */}
          <div
            style={{
              marginTop: "40px",
              background: "#e7f1ff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            }}
          >
            <h3>{selectedUser.userName}'s Territory Account Details</h3>
            <table style={{ width: "100%", marginTop: "10px" }}>
              <thead>
                <tr>
                  <th>Account Name</th>
                  <th>Total Calls</th>
                  <th>Total Emails</th>
                  <th>Latest Call Date</th>
                  <th>Latest Email Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((acc) => {
                  const accCalls = filteredCalls.filter(c => c.accountId === acc.id);
                  const accEmails = filteredEmails.filter(e => e.accountId === acc.id);

                  return (
                    <tr key={acc.id}>
                      <td>{acc.name}</td>
                      <td>{accCalls.length}</td>
                      <td>{accEmails.length}</td>
                      <td>{accCalls[0]?.callDate?.slice(0,10) || "-"}</td>
                      <td>{accEmails[0]?.emailDate?.slice(0,10) || "-"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
      