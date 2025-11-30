import React, { useState, useMemo } from "react";

export default function TerritoryTable({ selectedUser, accounts, calls, emails }) {
  const rowsPerPage = 8;
  const [page, setPage] = useState(1);

  // --- Build rows with totals and latest dates ---
  const tableRows = useMemo(() => {
    return accounts.map(acc => {
      const accCalls = calls.filter(c => c.accountId === acc.id);
      const accEmails = emails.filter(e => e.accountId === acc.id);

      const totalCalls = accCalls.length;
      const totalEmails = accEmails.length;

      const latestCall = accCalls.length
        ? new Date(Math.max(...accCalls.map(c => new Date(c.callDate)))).toLocaleDateString("en-GB")
        : "—";

      const latestEmail = accEmails.length
        ? new Date(Math.max(...accEmails.map(e => new Date(e.emailDate)))).toLocaleDateString("en-GB")
        : "—";

      return {
        accountName: acc.name,
        totalCalls,
        totalEmails,
        latestCall,
        latestEmail
      };
    });
  }, [accounts, calls, emails]);

  // Pagination logic
  const totalPages = Math.ceil(tableRows.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const visibleRows = tableRows.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div
      style={{
        marginTop: "25px",
        background: "#e7f1ff",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "15px" }}>
        {selectedUser?.userName}'s Territory Account Details
      </h3>

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#d8e7ff", fontWeight: 600 }}>
            <th style={thStyle}>Account Name</th>
            <th style={thStyle}>Total Calls</th>
            <th style={thStyle}>Total Emails</th>
            <th style={thStyle}>Latest Call Date</th>
            <th style={thStyle}>Latest Email Date</th>
          </tr>
        </thead>

        <tbody>
          {visibleRows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 ? "#F8FBFF" : "white" }}>
              <td style={tdStyle}>{row.accountName}</td>
              <td style={tdStyle}>{row.totalCalls}</td>
              <td style={tdStyle}>{row.totalEmails}</td>
              <td style={tdStyle}>{row.latestCall}</td>
              <td style={tdStyle}>{row.latestEmail}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div
        style={{
          marginTop: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          style={navBtn}
        >
          Previous
        </button>

        <span style={{ fontWeight: "600" }}>
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          style={navBtn}
        >
          Next
        </button>
      </div>
    </div>
  );
}

// --- styles ---
const thStyle = {
  padding: "10px",
  textAlign: "left",
  fontSize: "14px",
  borderBottom: "1px solid #c9d8f0"
};

const tdStyle = {
  padding: "10px",
  textAlign: "left",
  fontSize: "14px",
  borderBottom: "1px solid #e1e9f5"
};

const navBtn = {
  padding: "8px 20px",
  background: "#2c6edb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};
