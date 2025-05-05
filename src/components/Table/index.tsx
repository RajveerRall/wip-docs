// src/components/MuiStyledTable.js
import React from 'react';
import PropTypes from 'prop-types';

// MUI Imports
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// Using Box as a styled wrapper instead of Paper to avoid default elevation/styles
import Box from '@mui/material/Box';

// --- Helper: Define CSS Variable Fallbacks (adjust if your variables differ) ---
const V = {
  borderColor: 'var(--border-default)',
  headerBg: 'var(--neutral-100,)',
  headerColor: 'var(--text-primary, #333333)',
  bodyColor: 'var(--text-secondary, #555555)',
  tableBg: 'var(--background-01, #ffffff)',
  codeBg: 'var(--ifm-code-background, #f2f2f2)',
  codeColor: 'var(--ifm-code-color, inherit)',
  leading: 'var(--ifm-leading, 1.5rem)',
};

// --- The React Component ---

/**
 * Renders a styled table using MUI components, matching the target design.
 * Accepts headers and rows data, suitable for MDX usage.
 */
function MuiStyledTable({ headers, rows, caption }) {
   // Basic validation
   if (!headers || !Array.isArray(headers) || headers.length === 0) {
    console.warn('MuiStyledTable: `headers` prop is required and must be a non-empty array.');
    return <Box sx={{ padding: 2, border: `1px solid ${V.borderColor}`, borderRadius: '12px', color: 'red' }}>Error: Missing table headers.</Box>;
  }
  if (!rows || !Array.isArray(rows)) {
     console.warn('MuiStyledTable: `rows` prop is required and must be an array.');
     return <Box sx={{ padding: 2, border: `1px solid ${V.borderColor}`, borderRadius: '12px', color: 'red' }}>Error: Missing table rows.</Box>;
  }

  return (
    // Use Box for the outer container with border-radius and border
    <Box>
      {/* TableContainer is good practice for accessibility and potential scrolling */}
      <TableContainer >
        <Table stickyHeader aria-label={caption || 'Styled data table'}>
          <TableHead>
            {/* Apply styling targeting TH cells within this TableHead */}
            <TableRow sx={{
               '& th': { // Target header cells
                    backgroundColor: V.headerBg,
                    color: V.headerColor,
                    fontWeight: 500,
                    fontSize: '14px',
                    fontFamily:'var(--font-family-sans-serif)',
                    padding: '0.75rem 1rem',
                    textAlign: 'left',
                    verticalAlign: 'top',
                    // Border Logic (mimic collapse)
                    borderBottom: `1px solid ${V.borderColor}`, // Always have bottom border
                    borderLeft: `1px solid ${V.borderColor}`, // Add left border by default
                    borderRight: `none`, // No right border by default (cell to the right will add its left)
                    borderTop: `none`, // No top border needed (handled by wrapper/tablecontainer border)

                    // First header cell: no left border (uses container border)
                    '&:first-of-type': {
                         borderLeft: 'none',
                    },
                    // Last header cell: add right border (uses container border)
                     '&:last-of-type': {
                        borderRight: `none`, // Keep this none, as the container provides the edge
                    },
               }
            }}>
              {headers.map((header, index) => (
                <TableCell key={`header-${index}`} sx={{minWidth:'160px'}} component="th" scope="col">
                    {/* Render header content (string or JSX node) */}
                    {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => {
                // --- Row Data Validation (Optional but recommended) ---
                let validatedRow = row;
                if (!Array.isArray(row)) {
                    console.warn(`MuiStyledTable: Row data at index ${rowIndex} is not an array. Rendering placeholder.`);
                    // Create a placeholder row array matching header length
                    validatedRow = Array(headers.length).fill(`Invalid data at row ${rowIndex}`);
                } else if (row.length !== headers.length) {
                    console.warn(`MuiStyledTable: Row at index ${rowIndex} has ${row.length} cells, expected ${headers.length}. Padding/truncating.`);
                     // Pad or truncate the row to match header length
                     validatedRow = [...row];
                     while (validatedRow.length < headers.length) validatedRow.push("Missing");
                     while (validatedRow.length > headers.length) validatedRow.pop();
                }
                // --- End Row Data Validation ---

              return (
                <TableRow
                    key={`row-${rowIndex}`}
                    sx={{
                        backgroundColor: 'transparent !important', // Ensure no theme zebra striping overrides
                        '& td': { // Target body cells
                            color: V.bodyColor + ' !important', // Add !important if needed to override MUI specifics
                            fontWeight: 400,
                            fontFamily:'var(--font-family-sans-serif)',
                            fontSize: '14px',
                            padding: '0.75rem 1rem',
                            textAlign: 'left',
                            verticalAlign: 'top',
                            // Border Logic (mimic collapse)
                            borderBottom: `1px solid ${V.borderColor}`, // Standard bottom border for row separation
                            borderLeft: `1px solid ${V.borderColor}`, // Add left border
                            borderRight: `none`, // No right border (next cell adds left)
                            borderTop: 'none', // Top border provided by row above

                            '&:first-of-type': { // First cell in row
                                borderLeft: 'none', // Use container border
                            },
                             '&:last-of-type': { // Last cell in row
                                borderRight: 'none', // Use container border
                            },

                            // Style embedded code elements
                            '& code': {
                                backgroundColor: V.codeBg,
                                color: V.codeColor,
                                padding: '0.2em 0.4em',
                                margin: '0 0.1em',
                                borderRadius: '3px',
                                fontSize: '0.9em',
                                whiteSpace: 'nowrap',
                            }
                        },
                        // Remove bottom border ONLY for the very last row's cells
                        '&:last-child td': {
                             borderBottom: 'none',
                        },
                    }}
                >
                  {validatedRow.map((cell, cellIndex) => (
                    <TableCell key={`cell-${rowIndex}-${cellIndex}`} component="td" scope="row">
                      {/* Render cell content (string or JSX node like <code>) */}
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

// --- Prop Type Definitions ---
MuiStyledTable.propTypes = {
  /** An array of strings or React nodes for table headers (th). */
  headers: PropTypes.arrayOf(PropTypes.node).isRequired,
  /** An array of arrays. Each inner array is a row (tr), containing cell (td) data (strings or React nodes). */
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node)).isRequired,
  /** Optional caption for table accessibility. */
  caption: PropTypes.string,
};

export default MuiStyledTable; // Make sure to export!