import React from "react";

type Column = {
  key: string;
  label: string;
  /** Högerjustera (för siffror). Default vänster. */
  align?: "left" | "right";
  /** Använd JetBrains Mono + tabular-nums. */
  mono?: boolean;
  /** Dölj kolumnen på små skärmar. */
  hideOnMobile?: boolean;
};

type Row = Record<string, React.ReactNode>;

type Props = {
  columns: Column[];
  rows: Row[];
  /** Zebra-striping. Default på. */
  zebra?: boolean;
};

/**
 * Enhetlig tabellkomponent — eyebrow-rubriker, zebra, tabular numbers,
 * ramkant via --border. Används på tävlingsresultat, licenskrav,
 * radiofrekvenser och nödkontakter.
 */
const DataTable: React.FC<Props> = ({ columns, rows, zebra = true }) => (
  <div
    className="w-full overflow-x-auto"
    style={{
      border: "1px solid var(--border, #e2e8f0)",
      borderRadius: "var(--radius, 10px)",
    }}
  >
    <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              scope="col"
              className={`py-3 px-4 font-semibold uppercase ${col.hideOnMobile ? "hidden sm:table-cell" : ""}`}
              style={{
                textAlign: col.align ?? "left",
                letterSpacing: "0.1em",
                fontSize: "0.72rem",
                color: "var(--slate, #62748e)",
                background: "#fafbfc",
                borderBottom: "1px solid var(--border, #e2e8f0)",
              }}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr
            key={i}
            style={{
              background: zebra && i % 2 === 1 ? "#fafbfc" : undefined,
              borderTop: i > 0 ? "1px solid var(--border, #e2e8f0)" : undefined,
            }}
          >
            {columns.map((col) => (
              <td
                key={col.key}
                className={`py-3 px-4 ${col.hideOnMobile ? "hidden sm:table-cell" : ""} ${col.mono ? "font-mono tabular-nums" : ""}`}
                style={{
                  textAlign: col.align ?? "left",
                  color: "var(--ink-2, #0f172b)",
                  verticalAlign: "top",
                  lineHeight: 1.5,
                }}
              >
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DataTable;
