import React from 'react';
import '../../styles/Table.css'

const Table = ({ data, columns, emptyMessage = "No data available", loading = false }) => {
  // Check if data is valid
  if (!data || !Array.isArray(data)) {
    console.error('Table component received invalid data:', data);
    return (
      <div className="table-error">
        <p>Invalid data provided to table</p>
        <p>Expected array, received: {typeof data}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="table-loading">
        <div className="loading-spinner"></div>
        <p>Loading data...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return <div className="table-empty">{emptyMessage}</div>;
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessor}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={column.accessor}>
                  {column.render ? column.render(row) : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;