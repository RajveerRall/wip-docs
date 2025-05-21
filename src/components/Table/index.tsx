// src/components/ReusableStyledTable.js or ReusableHtmlTable.js
import React from 'react';
import PropTypes from 'prop-types';

export default function ReusableHtmlTable({ headers, rows, caption, tableAriaLabel }) {
  // const { colorMode } = useColorMode(); // Kept for context, though not directly used in JS logic

  const V = {
    tableOverallBg: 'var(--background-01)',
    cellBorderColor: 'var(--border-default)',
    headerBg: 'var(--background-02)',
    headerColor: 'var(--text-primary)',
    bodyColor: 'var(--text-secondary)',
    rowHoverBg: 'var(--background-02)', // Can be same as headerBg or different
    tableBorderRadius: '12px', // e.g., '0.5rem' or '8px'
    fontFamily: 'var(--font-family-inter)',
    alertErrorColor: 'var(--alert-error)'
  };

  if (!headers || !Array.isArray(headers) || headers.length === 0) {
    return (
      <div style={{ padding: '16px', border: `1px solid ${V.alertErrorColor}`, color: V.alertErrorColor }}>
        Error: Missing or invalid table headers.
      </div>
    );
  }
  if (!rows || !Array.isArray(rows)) {
     return (
      <div style={{ padding: '16px', border: `1px solid ${V.alertErrorColor}`, color: V.alertErrorColor }}>
        Error: Missing or invalid table rows.
      </div>
     );
  }

  const tableStyle = {
    width: '100%',
    tableLayout: 'fixed',
    borderCollapse: 'collapse',
    backgroundColor: V.tableOverallBg,
    borderRadius: V.tableBorderRadius, // For semantic correctness; visual rounding is via cells
    overflow: 'hidden', // Important for clipping content at table's rounded corners
  };

  const commonCellStyle = {
    fontFamily: V.fontFamily,
    fontSize: '14px',
    fontWeight: 500,
    padding: '16px',
    textAlign: 'left',
    verticalAlign: 'top',
    whiteSpace: 'normal',
    wordBreak: 'break-word',
    borderTop: `1px solid ${V.cellBorderColor}`,
    borderRight: `1px solid ${V.cellBorderColor}`,
    borderBottom: `1px solid ${V.cellBorderColor}`,
    borderLeft: `1px solid ${V.cellBorderColor}`,
    boxSizing: 'border-box',
  };

  const baseHeaderCellStyle = {
    ...commonCellStyle,
    backgroundColor: V.headerBg, // Headers have their own distinct background
    color: V.headerColor,
  };

  const bodyCellStyle = {
    ...commonCellStyle,
    color: V.bodyColor,
    fontWeight: 400,
    // No explicit background color here, so it inherits from <tr> or <table>
  };

  const numColumns = headers.length;
  const columnWidth = numColumns > 0 ? `${100 / numColumns}%` : 'auto';

  return (
    <table
      aria-label={caption || tableAriaLabel || 'Styled data table'}
      style={tableStyle}
    >
      <thead>
        <tr>
          {headers.map((header, index) => {
            const isFirstHeader = index === 0;
            const isLastHeader = index === numColumns - 1;

            const specificHeaderStyle = {
              ...baseHeaderCellStyle,
              width: columnWidth,
              overflow: 'hidden', // Clip content within rounded corners
              // --- THIS IS THE ADDED LINE ---
              borderBottom: 'none', // This ensures the header row effectively has no bottom border
              // --- END OF ADDED LINE ---
            };

            if (isFirstHeader) {
              specificHeaderStyle.borderTopLeftRadius = V.tableBorderRadius;
            }
            if (isLastHeader) {
              specificHeaderStyle.borderTopRightRadius = V.tableBorderRadius;
            }

            // If no body rows, header cells also form the bottom edge of the table.
            // The borderBottom: 'none' above will still apply.
            // The borderRadius logic below will just round the corners of these border-less bottom edges of header cells.
            if (rows.length === 0) {
              if (isFirstHeader) {
                specificHeaderStyle.borderBottomLeftRadius = V.tableBorderRadius;
              }
              if (isLastHeader) {
                specificHeaderStyle.borderBottomRightRadius = V.tableBorderRadius;
              }
            }

            return (
              <th
                key={`header-${index}`}
                scope="col"
                style={specificHeaderStyle}
              >
                {header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => {
          let validatedRow = row;
          if (!Array.isArray(row)) {
              validatedRow = Array(numColumns).fill(
                <span style={{ color: V.alertErrorColor }}>{`Invalid data at row ${rowIndex}`}</span>
              );
          } else if (row.length !== numColumns) {
               validatedRow = [...row];
               while (validatedRow.length < numColumns) validatedRow.push(
                 <span style={{ fontStyle: 'italic', color: V.bodyColor }}>Missing</span>
               );
               while (validatedRow.length > numColumns) validatedRow.pop();
          }

          const isLastRow = rowIndex === rows.length - 1;

          return (
            <tr
              key={`row-${rowIndex}`}
              style={{ backgroundColor: V.tableOverallBg }} // Default background for rows
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = V.rowHoverBg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = V.tableOverallBg; // Revert to default row background
              }}
            >
              {validatedRow.map((cellContent, cellIndex) => {
                const isFirstCellInRow = cellIndex === 0;
                const isLastCellInRow = cellIndex === numColumns - 1;

                // Apply bodyCellStyle to all body cells (th and td)
                const currentCellSpecificStyle = {
                  ...bodyCellStyle,
                  overflow: 'hidden', // Clip content within rounded corners, especially for corner cells
                };

                if (isLastRow) {
                  if (isFirstCellInRow) {
                    currentCellSpecificStyle.borderBottomLeftRadius = V.tableBorderRadius;
                  }
                  if (isLastCellInRow) {
                    // This specifically targets the condition: table tr:last-child td:last-child (or th:last-child)
                    currentCellSpecificStyle.borderBottomRightRadius = V.tableBorderRadius;
                  }
                }

                return (
                  isFirstCellInRow ? (
                    <th key={`cell-${rowIndex}-${cellIndex}`} scope="row" style={currentCellSpecificStyle}>
                      {cellContent}
                    </th>
                  ) : (
                    <td key={`cell-${rowIndex}-${cellIndex}`} style={currentCellSpecificStyle}>
                      {cellContent}
                    </td>
                  )
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

ReusableHtmlTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.node).isRequired,
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node)).isRequired,
  caption: PropTypes.string,
  tableAriaLabel: PropTypes.string,
};

ReusableHtmlTable.defaultProps = {
  caption: undefined,
  tableAriaLabel: 'Styled data table',
};