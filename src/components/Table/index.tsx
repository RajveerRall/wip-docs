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
  const V = {
    tableBorderRadius: '8px',
    alertError: 'var(--alert-error, #D32F2F)',
    background01: 'var(--background-01, #1E1E1E)', // Default body cell background
    // background02: 'var(--background-02, #2C2C2C)', // No longer needed for hover
    background03: 'var(--background-03, #3A3A3A)', // Header cell background
    borderDefault: 'var(--border-default, #4A4A4A)',
    textPrimary: 'var(--text-primary, #FFFFFF)',
    textSecondary: 'var(--text-secondary, #CCCCCC)',
    textTertiary: 'var(--text-tertiary, #888888)',
    fontFamilyInter: 'var(--font-family-inter, sans-serif)',
  };

  if (!columns || !Array.isArray(columns) || columns.length === 0) {
    return (
      <div style={{ padding: '16px', border: `1px solid ${V.alertError}`, color: V.alertError, borderRadius: V.tableBorderRadius, backgroundColor: V.background01, fontFamily: V.fontFamilyInter }}>
        Error: Missing or invalid table columns.
      </div>
    );
  }
  if (!rows || !Array.isArray(rows)) {
    return (
      <div style={{ padding: '16px', border: `1px solid ${V.alertError}`, color: V.alertError, borderRadius: V.tableBorderRadius, backgroundColor: V.background01, fontFamily: V.fontFamilyInter }}>
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
    minWidth:'160px',
    borderSpacing: 0,
    backgroundColor: V.background01, // Or a distinct table wrapper background
    fontFamily: V.fontFamilyInter,
    border: `1px solid ${V.borderDefault}`,
    borderRadius: V.tableBorderRadius,
    overflow: 'hidden',
  };

  const commonCellStyle: React.CSSProperties = {
    fontSize: '14px',
    padding: '12px 16px',
    textAlign: 'left',
    verticalAlign: 'top',
    whiteSpace: 'normal',
    wordBreak: 'break-word',
    boxSizing: 'border-box',
  };

  const headerCellStyle: React.CSSProperties = {
    ...commonCellStyle,
    backgroundColor: V.background03, // Header cells get their specific background
    color: V.textPrimary,
    fontWeight: 600,
    borderBottom: `1px solid ${V.borderDefault}`,
  };

  const bodyCellStyle: React.CSSProperties = {
    ...commonCellStyle,
    backgroundColor: V.background01, // Body cells get their specific background
    color: V.textSecondary,
    fontWeight: 400,
  };

  return (
    <div className={className}>
      {caption && (
        <div style={{ marginBottom: '8px', fontSize: '18px', fontWeight: 600, color: V.textPrimary, fontFamily: V.fontFamilyInter }}>
          {caption}
        </div>
      )}
      <table aria-label={tableAriaLabel} style={tableStyle}>
        <thead>
          <tr>
            {columns.map((column, index) => {
              const isFirstHeader = index === 0;
              const isLastHeader = index === numColumns - 1;
              const specificHeaderStyle: React.CSSProperties = {
                ...headerCellStyle,
                width: column.width || defaultColumnWidth,
              };
              if (!isLastHeader) {
                specificHeaderStyle.borderRight = `1px solid ${V.borderDefault}`;
              }
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
                <th key={column.key || `header-${index}`} scope="col" style={specificHeaderStyle}>
                  {column.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => {
            let validatedRow = row;
            if (!Array.isArray(row)) { validatedRow = Array(numColumns).fill(<span style={{ color: V.alertError }}>{`Invalid data at row ${rowIndex}`}</span>); }
            else if (row.length !== numColumns) { validatedRow = [...row]; while (validatedRow.length < numColumns) validatedRow.push(<span style={{ fontStyle: 'italic', color: V.textTertiary }}>Missing</span>); while (validatedRow.length > numColumns) validatedRow.pop(); }

            const isLastRow = rowIndex === rows.length - 1;

            return (
              <tr
                key={`row-${rowIndex}`}
                // Removed onMouseEnter and onMouseLeave
                // style={{ backgroundColor: 'transparent' }} // Row itself can be transparent, cells define BG
              >
                {validatedRow.map((cellContent, cellIndex) => {
                  const isFirstCellInRow = cellIndex === 0;
                  const isLastCellInRow = cellIndex === numColumns - 1;
                  const currentCellStyle: React.CSSProperties = { ...bodyCellStyle }; // Gets default V.background01
                  if (!isLastRow) {
                    currentCellStyle.borderBottom = `1px solid ${V.borderDefault}`;
                  }
                  if (!isLastCellInRow) {
                    currentCellStyle.borderRight = `1px solid ${V.borderDefault}`;
                  }
                  if (isLastRow) {
                    if (isFirstCellInRow) {
                      currentCellStyle.borderBottomLeftRadius = V.tableBorderRadius;
                    }
                    if (isLastCellInRow) {
                      currentCellStyle.borderBottomRightRadius = V.tableBorderRadius;
                    }
                  }
                  const CellComponent = isFirstCellInRow ? 'th' : 'td';
                  return (
                    <CellComponent key={`cell-${rowIndex}-${cellIndex}`} scope={isFirstCellInRow ? 'row' : undefined} style={currentCellStyle}>
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