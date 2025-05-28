import React from 'react';

interface Column {
  label: string;
  width?: string; // e.g., "30%", "150px", "auto"
  key?: string;
}

interface CommonTableProps {
  columns: Column[];
  rows: (string | number | React.ReactNode)[][];
  caption?: string;
  tableAriaLabel?: string;
  className?: string;
}

const CommonTable: React.FC<CommonTableProps> = ({
  columns,
  rows,
  caption,
  tableAriaLabel = 'Data table',
  className = ''
}) => {
  // Error handling for invalid props
  if (!columns || !Array.isArray(columns) || columns.length === 0) {
    return (
      <div style={{ 
        padding: '16px', 
        border: '1px solid var(--alert-error)', 
        color: 'var(--alert-error)',
        borderRadius: '8px',
        backgroundColor: 'var(--background-02)',
        fontFamily: 'var(--font-family-inter)'
      }}>
        Error: Missing or invalid table columns.
      </div>
    );
  }

  if (!rows || !Array.isArray(rows)) {
    return (
      <div style={{ 
        padding: '16px', 
        border: '1px solid var(--alert-error)', 
        color: 'var(--alert-error)',
        borderRadius: '8px',
        backgroundColor: 'var(--background-02)',
        fontFamily: 'var(--font-family-inter)'
      }}>
        Error: Missing or invalid table rows.
      </div>
    );
  }

  const numColumns = columns.length;
  const defaultColumnWidth = numColumns > 0 ? `${100 / numColumns}%` : 'auto';

  const tableStyle: React.CSSProperties = {
    width: '100%',
    tableLayout: 'fixed',
    borderCollapse: 'separate',
    borderSpacing: 0,
    backgroundColor: 'var(--background-01)',
    border: '1px solid var(--border-default)',
    borderRadius: '8px',
    overflow: 'hidden',
    fontFamily: 'var(--font-family-inter)'
  };

  const commonCellStyle: React.CSSProperties = {
    fontSize: '14px',
    padding: '12px 16px',
    textAlign: 'left',
    verticalAlign: 'top',
    whiteSpace: 'normal',
    wordBreak: 'break-word',
    boxSizing: 'border-box',
    overflow: 'hidden'
  };

  const headerCellStyle: React.CSSProperties = {
    ...commonCellStyle,
    backgroundColor: 'var(--background-02)',
    color: 'var(--text-primary)',
    fontWeight: 600,
    borderBottom: '1px solid var(--border-default)'
  };

  const bodyCellStyle: React.CSSProperties = {
    ...commonCellStyle,
    color: 'var(--text-secondary)',
    fontWeight: 400,
    backgroundColor: 'var(--background-01)'
  };

  return (
    <div className={className}>
      {caption && (
        <div style={{ 
          marginBottom: '8px', 
          fontSize: '18px', 
          fontWeight: 600, 
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-family-inter)'
        }}>
          {caption}
        </div>
      )}
      
      <table
        aria-label={tableAriaLabel}
        style={tableStyle}
      >
        <thead>
          <tr>
            {columns.map((column, index) => {
              const isFirstHeader = index === 0;
              const isLastHeader = index === numColumns - 1;

              const specificHeaderStyle: React.CSSProperties = {
                ...headerCellStyle,
                width: column.width || defaultColumnWidth
              };

              if (!isLastHeader) {
                specificHeaderStyle.borderRight = '1px solid var(--border-default)';
              }
              if (isFirstHeader) {
                specificHeaderStyle.borderTopLeftRadius = '8px';
              }
              if (isLastHeader) {
                specificHeaderStyle.borderTopRightRadius = '8px';
              }
              if (rows.length === 0) {
                if (isFirstHeader) {
                  specificHeaderStyle.borderBottomLeftRadius = '8px';
                }
                if (isLastHeader) {
                  specificHeaderStyle.borderBottomRightRadius = '8px';
                }
              }

              return (
                <th
                  key={column.key || `header-${index}`}
                  scope="col"
                  style={specificHeaderStyle}
                >
                  {column.label}
                </th>
              );
            })}
          </tr>
        </thead>
        
        <tbody>
          {rows.map((row, rowIndex) => {
            let validatedRow = row;
            
            // Handle invalid row data
            if (!Array.isArray(row)) {
              validatedRow = Array(numColumns).fill(
                <span style={{ color: 'var(--alert-error)' }}>
                  {`Invalid data at row ${rowIndex}`}
                </span>
              );
            } else if (row.length !== numColumns) {
              validatedRow = [...row];
              // Add missing cells
              while (validatedRow.length < numColumns) {
                validatedRow.push(
                  <span style={{ fontStyle: 'italic', color: 'var(--text-tertiary)' }}>
                    Missing
                  </span>
                );
              }
              // Remove extra cells
              while (validatedRow.length > numColumns) {
                validatedRow.pop();
              }
            }

            const isLastRow = rowIndex === rows.length - 1;

            return (
              <tr
                key={`row-${rowIndex}`}
                style={{ backgroundColor: 'transparent' }}
                onMouseEnter={(e) => {
                  Array.from(e.currentTarget.children).forEach((cell: any) => {
                    cell.style.backgroundColor = 'var(--background-02)';
                  });
                }}
                onMouseLeave={(e) => {
                  Array.from(e.currentTarget.children).forEach((cell: any) => {
                    cell.style.backgroundColor = 'var(--background-01)';
                  });
                }}
              >
                {validatedRow.map((cellContent, cellIndex) => {
                  const isFirstCellInRow = cellIndex === 0;
                  const isLastCellInRow = cellIndex === numColumns - 1;

                  const currentCellStyle: React.CSSProperties = {
                    ...bodyCellStyle
                  };

                  if (!isLastRow) {
                    currentCellStyle.borderBottom = '1px solid var(--border-default)';
                  }
                  if (!isLastCellInRow) {
                    currentCellStyle.borderRight = '1px solid var(--border-default)';
                  }

                  if (isLastRow) {
                    if (isFirstCellInRow) {
                      currentCellStyle.borderBottomLeftRadius = '8px';
                    }
                    if (isLastCellInRow) {
                      currentCellStyle.borderBottomRightRadius = '8px';
                    }
                  }

                  const CellComponent = isFirstCellInRow ? 'th' : 'td';

                  return (
                    <CellComponent
                      key={`cell-${rowIndex}-${cellIndex}`}
                      scope={isFirstCellInRow ? 'row' : undefined}
                      style={currentCellStyle}
                    >
                      {cellContent}
                    </CellComponent>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CommonTable;