import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function CallsTable({ calls, segmentName }) {
  const { accounts } = useContext(AppContext);

  const getAccountName = (id) => {
    const acc = accounts.find(a => a.id === id);
    return acc ? acc.name : "Unknown";
  };

  // PAGINATION
  const rowsPerPage = 10;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(calls.length / rowsPerPage);

  const paginatedRows = calls.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div>
      {/* TABLE HEADER TITLE */}
      <h3 style={{
        textAlign: "center",
        marginBottom: "20px",
        fontWeight: "bold"
      }}>
        {segmentName} Details
      </h3>

      {/* TABLE ELEMENT */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#d8e7ff" }}>
            <th style={thStyle}>Call ID</th>
            <th style={thStyle}>Account Name</th>
            <th style={thStyle}>Call Date</th>
            <th style={thStyle}>Call Status</th>
          </tr>
        </thead>

        <tbody>
          {paginatedRows.map((call) => (
            <tr key={call.id} style={{ background: "#fff" }}>
              <td style={tdStyle}>{call.id}</td>
              <td style={tdStyle}>{getAccountName(call.accountId)}</td>
              <td style={tdStyle}>{call.callDate.slice(0, 10)}</td>
              <td style={tdStyle}>{call.callStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div style={{
        marginTop: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          style={btnStyle}
        >
          Previous
        </button>

        <span style={{ fontSize: "14px", fontWeight: "bold" }}>
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          style={btnStyle}
        >
          Next
        </button>

      </div>
    </div>
  );
}

const thStyle = {
  padding: "10px",
  borderBottom: "2px solid #c5d7f2",
  textAlign: "left",
  fontWeight: "bold"
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd"
};

const btnStyle = {
  background: "#4f8bff",
  color: "#fff",
  padding: "8px 16px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px"
};
