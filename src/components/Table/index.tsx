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
import Box from '@mui/material/Box';
import { useColorMode } from '@docusaurus/theme-common'; // Import the hook

/**
 * Renders a styled table using MUI components, matching the target design.
 * Accepts headers and rows data, suitable for MDX usage.
 */
function MuiStyledTable({ headers, rows, caption }) {
  const { colorMode } = useColorMode(); // 'light' or 'dark'
  const isDarkMode = colorMode === 'dark';

  // CSS Variable strings
  const V = {
    borderColor: isDarkMode ? 'var(--border-light)' : 'var(--border-default)',
    // Added example fallbacks in case CSS variables are not defined. Adjust/remove as needed.
    headerBg: 'var(--neutral-100, #f8f9fa)',
    headerColor: 'var(--text-primary, #212529)',
    bodyColor: 'var(--text-secondary, #495057)',
    tableBg: 'var(--background-01, #ffffff)',
    codeBg: 'var(--ifm-code-background, #f1f1f1)',
    codeColor: 'var(--ifm-code-color, #c7254e)', // Example, Docusaurus usually handles this well
  };

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
      <TableContainer sx={{
          backgroundColor: V.tableBg, // Apply background to the table area
          // No fixed height here, so it expands with content.
          // This prevents vertical scrollbars on the TableContainer itself.
      }}>
        <Table
          stickyHeader // Makes table headers stick to the top of the TableContainer when it scrolls.
                       // If TableContainer doesn't scroll (our case), it has minimal effect.
          aria-label={caption || 'Styled data table'}
          sx={{
            tableLayout: 'fixed', // CRITICAL: Allows text wrapping and predictable column behavior.
            width: '100%',        // Table will take the full width of its container.
            minWidth: '100%',     // Ensures it tries to occupy full space for layout.
            // borderCollapse: 'collapse', // Alternative to manual border logic below if simpler borders are okay
          }}
        >
          <TableHead>
            <TableRow sx={{
               '& th': {
                    backgroundColor: V.headerBg,
                    color: `${V.headerColor}!important`, // Retained !important from original
                    fontWeight: 500,
                    fontSize: '14px',
                    fontFamily:'var(--font-family-inter)',
                    padding: '0.75rem 1rem',
                    textAlign: 'left',
                    verticalAlign: 'top', // Better for multi-line wrapped content

                    // Text wrapping for header cells
                    whiteSpace: 'normal',
                    wordBreak: 'break-word', // Allow long words to break and wrap
                    overflowWrap: 'break-word', // Alias for word-break

                    // Border Logic (mimic collapse)
                    borderBottom: `1px solid ${V.borderColor}`,
                    borderLeft: `1px solid ${V.borderColor}`,
                    borderRight: 'none',
                    borderTop: 'none',

                    '&:first-of-type': {
                         borderLeft: 'none', // First header cell uses container's left border
                    },
                    // Last header cell's right border is effectively the container's right border
               }
            }}>
              {headers.map((header, index) => (
                <TableCell
                    key={`header-${index}`}
                    component="th"
                    scope="col"
                    sx={{
                        // maxWidth:'160px', // Retained from original: Caps column width.
                                           // Can be removed if fully dynamic width is preferred.
                        // maxHeight:'40px!important', // REMOVED: This prevents text wrapping.
                        // For explicit column width distribution with tableLayout: 'fixed':
                        // width: headers.length > 0 ? `${100 / headers.length}%` : 'auto',
                    }}
                >
                    {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => {
                // Row data validation (as in original)
                let validatedRow = row;
                if (!Array.isArray(row)) {
                    validatedRow = Array(headers.length).fill(`Invalid data at row ${rowIndex}`);
                } else if (row.length !== headers.length) {
                     validatedRow = [...row];
                     while (validatedRow.length < headers.length) validatedRow.push("Missing");
                     while (validatedRow.length > headers.length) validatedRow.pop();
                }

              return (
                <TableRow
                    key={`row-${rowIndex}`}
                    sx={{
                        backgroundColor: 'transparent !important',
                        '& td': {
                            color: `${V.bodyColor}!important`, // Retained !important
                            fontWeight: 400,
                            fontFamily:'var(--font-family-inter)',
                            fontSize: '14px',
                            // padding: '0.75rem 1rem',
                            textAlign: 'left',
                            verticalAlign: 'top', // Better for multi-line wrapped content

                            // Text wrapping for body cells
                            whiteSpace: 'normal',
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',

                            borderBottom: `1px solid ${V.borderColor}`,
                            borderLeft: `1px solid ${V.borderColor}`,
                            borderRight: 'none',
                            borderTop: 'none',

                            '&:first-of-type': {
                                borderLeft: 'none', // First cell uses container's left border
                            },

                            // Style embedded code elements for better wrapping
                            '& code': {
                                backgroundColor: V.codeBg,
                                color: V.codeColor,
                                padding: '0.2em 0.4em',
                                margin: '0 0.1em',
                                borderRadius: '3px',
                                fontSize: '0.9em',
                                whiteSpace: 'pre-wrap', // Allows wrapping but respects spaces/newlines
                                wordBreak: 'break-all', // More aggressive for long unbroken code strings
                            }
                        },
                        // Remove bottom border ONLY for the cells in the very last row
                        '&:last-child td': {
                             borderBottom: 'none',
                        },
                    }}
                >
                  {validatedRow.map((cell, cellIndex) => (
                    <TableCell key={`cell-${rowIndex}-${cellIndex}`} component="td" scope="row">
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    
  );
}

// Prop Type Definitions (as in original)
MuiStyledTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.node).isRequired,
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node)).isRequired,
  caption: PropTypes.string,
};

export default MuiStyledTable;