// src/components/ReusableStyledTable.js or ReusableHtmlTable.js
import React from 'react';
import PropTypes from 'prop-types';
import { useColorMode } from '@docusaurus/theme-common';

export default function ReusableHtmlTable({ headers, rows, caption, tableAriaLabel }) {
  const { colorMode } = useColorMode();
  // const isDarkMode = colorMode === 'dark';

  const V = {
    tableOverallBg: 'var(--background-01)',
    cellBorderColor: 'var(--border-default)',
    headerBg: 'var(--background-02)',
    headerColor: 'var(--text-primary)',
    bodyColor: 'var(--text-secondary)',
    rowHoverBg: 'var(--background-02)',
    codeBg: 'var(--ifm-code-background, #282C34)',
    codeColor: 'var(--ifm-code-color, #ABB2BF)',
    tableBorderRadius: 'var(--ifm-card-border-radius, 8px)',
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

  const tableContainerStyle = {
    backgroundColor: V.tableOverallBg,
    borderRadius: V.tableBorderRadius,
    overflow: 'hidden',
    border: `1px solid ${V.cellBorderColor}`,
    // --- KEY ADJUSTMENTS FOR TIGHT FIT ---
    padding: 0,                 // Ensure no padding inside the container
    margin: 0,                  // Ensure no margin around the container
    lineHeight: 1,              // Can sometimes help with tight vertical wrapping, though cell padding is main factor
    boxSizing: 'border-box',    // Ensure border and padding are included in width/height calculation
    // display: 'block',        // Default for div, explicitly setting it
                               // Using `display: inline-block` might cause it to shrink wrap if table width wasn't 100%
                               // but with table width 100%, 'block' is fine.
  };

  const tableStyle = {
    width: '100%',
    height: '100%',             // Make table attempt to fill container's height
    tableLayout: 'fixed',
    borderCollapse: 'collapse',
    // The table borders are now handled by individual cells due to border-collapse
    // and the outer border by the container.
    // Remove explicit table border here if any was previously set.
    // border: 'none', // Or remove the border property entirely
  };

  const commonCellStyle = {
    fontFamily: V.fontFamily,
    fontSize: '14px',
    fontWeight: 500,
    padding: '16px', // Cell padding contributes to table height
    textAlign: 'left',
    verticalAlign: 'top',
    whiteSpace: 'normal',
    wordBreak: 'break-word',
    borderTop: `1px solid ${V.cellBorderColor}`,
    borderRight: `1px solid ${V.cellBorderColor}`,
    borderBottom: `1px solid ${V.cellBorderColor}`,
    borderLeft: `1px solid ${V.cellBorderColor}`,
    boxSizing: 'border-box', // Good for cells too
    
  };

  const headerCellStyle = {
    ...commonCellStyle,
    backgroundColor: V.headerBg,
    color: V.headerColor,
    maxWidth: '160px!important', // This will contribute to row height
  };

  const bodyCellStyle = {
    ...commonCellStyle,
    color: V.bodyColor,
    fontWeight: 400,
    
  };

  return (
      <table
        aria-label={caption || tableAriaLabel || 'Styled data table'}
        style={tableStyle}
      >
        <thead>
          <tr style={{ borderBottom:'none'}}>
            {headers.map((header, index) => (
              <th key={`header-${index}`} scope="col" style={headerCellStyle}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => {
            let validatedRow = row;
            if (!Array.isArray(row)) {
                validatedRow = Array(headers.length).fill(
                  <span style={{ color: V.alertErrorColor }}>{`Invalid data at row ${rowIndex}`}</span>
                );
            } else if (row.length !== headers.length) {
                 validatedRow = [...row];
                 while (validatedRow.length < headers.length) validatedRow.push(
                   <span style={{ fontStyle: 'italic', color: V.bodyColor }}>Missing</span>
                 );
                 while (validatedRow.length > headers.length) validatedRow.pop();
            }

            const rowStyle = {
                backgroundColor: V.tableOverallBg,
            };

            return (
              <tr
                key={`row-${rowIndex}`}
                style={rowStyle}
                // onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = V.rowHoverBg; }}
                // onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = V.tableOverallBg; }}
              >
                {validatedRow.map((cellContent, cellIndex) => {
                  const isFirstCell = cellIndex === 0;
                  const currentBodyCellStyle = {
                      ...bodyCellStyle,
                      minWidth:'160px'
                      // fontWeight: isFirstCell ? 'bold' : bodyCellStyle.fontWeight,
                  };

                  return (
                    isFirstCell ? (
                      <th key={`cell-${rowIndex}-${cellIndex}`} scope="row" style={currentBodyCellStyle}>
                        {cellContent}
                      </th>
                    ) : (
                      <td key={`cell-${rowIndex}-${cellIndex}`} style={currentBodyCellStyle}>
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