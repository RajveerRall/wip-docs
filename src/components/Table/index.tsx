// src/components/ReusableHtmlTable.js
import React from 'react';
import PropTypes from 'prop-types';

export default function ReusableHtmlTable({ headers, rows, caption, tableAriaLabel }) {
  const V = {
    tableOverallBg: 'var(--background-01)',
    cellBorderColor: 'var(--border-default)',
    headerBg: 'var(--background-02)',
    headerColor: 'var(--text-primary)',
    bodyColor: 'var(--text-secondary)',
    rowHoverBg: 'var(--background-02)',
    tableBorderRadius: '12px',
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
    borderCollapse: 'separate',
    borderSpacing: 0,
    backgroundColor: V.tableOverallBg,
    border: `1px solid ${V.cellBorderColor}`,
    borderRadius: V.tableBorderRadius,
    overflow: 'hidden',
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
    boxSizing: 'border-box',
    backgroundColor: V.tableOverallBg,
  };

  const baseHeaderCellStyle = {
    ...commonCellStyle,
    backgroundColor: V.headerBg,
    color: V.headerColor,
    fontWeight: 600,
    borderBottom: `1px solid ${V.cellBorderColor}`,
  };

  const bodyCellStyle = {
    ...commonCellStyle,
    color: V.bodyColor,
    fontWeight: 400,
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
              overflow: 'hidden',
            };

            if (isFirstHeader) {
              specificHeaderStyle.borderTopLeftRadius = V.tableBorderRadius;
            }
            if (isLastHeader) {
              specificHeaderStyle.borderTopRightRadius = V.tableBorderRadius;
            }

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
              style={{ backgroundColor: V.tableOverallBg }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = V.rowHoverBg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = V.tableOverallBg;
              }}
            >
              {validatedRow.map((cellContent, cellIndex) => {
                const isFirstCellInRow = cellIndex === 0;
                const isLastCellInRow = cellIndex === numColumns - 1;

                const currentCellSpecificStyle = {
                  ...bodyCellStyle,
                  overflow: 'hidden',
                };

                if (!isLastRow) {
                  currentCellSpecificStyle.borderBottom = `1px solid ${V.cellBorderColor}`;
                }

                if (isLastRow) {
                  if (isFirstCellInRow) {
                    currentCellSpecificStyle.borderBottomLeftRadius = V.tableBorderRadius;
                  }
                  if (isLastCellInRow) {
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
