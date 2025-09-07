
import React, { useMemo, useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  rowKey?: keyof T;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
  rowKey = "id",
  className
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [asc, setAsc] = useState(true);
  const [selected, setSelected] = useState<Set<React.Key>>(new Set());

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    const col = columns.find(c => c.key === sortKey);
    if (!col) return data;
    const arr = [...data];
    arr.sort((a, b) => {
      const av = a[col.dataIndex];
      const bv = b[col.dataIndex];
      if (av === bv) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      return av < bv ? (asc ? -1 : 1) : (asc ? 1 : -1);
    });
    return arr;
  }, [data, columns, sortKey, asc]);

  const toggleRow = (rk: React.Key, row: T) => {
    const next = new Set(selected);
    if (next.has(rk)) next.delete(rk); else next.add(rk);
    setSelected(next);
    onRowSelect?.(sorted.filter(r => next.has(r[rowKey as keyof T])));
  };

  if (loading) return <div className="p-4 text-neutral-500" role="status" aria-live="polite">Loading…</div>;
  if (!data || data.length === 0) return <div className="p-4 text-neutral-500">No data available</div>;

  return (
    <div className={`overflow-x-auto ${className ?? ""}`}>
      <table className="min-w-full border border-neutral-300 dark:border-neutral-700 rounded-md text-sm">
        <thead className="bg-neutral-100 dark:bg-neutral-800">
          <tr>
            {selectable && <th className="p-2 w-10"></th>}
            {columns.map(col => (
              <th
                key={col.key}
                onClick={() => col.sortable && (setSortKey(col.key), setAsc(k => sortKey === col.key ? !k : true))}
                className={`p-2 text-left select-none ${col.sortable ? "cursor-pointer" : ""}`}
                scope="col"
                aria-sort={sortKey === col.key ? (asc ? "ascending" : "descending") : "none"}
              >
                <span className="inline-flex items-center gap-1">
                  {col.title}
                  {col.sortable && sortKey === col.key && (asc ? "▲" : "▼")}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => {
            const rk = row[rowKey as keyof T] as React.Key;
            return (
              <tr key={rk ?? i} className="border-t border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                {selectable && (
                  <td className="p-2">
                    <input
                      aria-label="Select row"
                      type="checkbox"
                      checked={selected.has(rk)}
                      onChange={() => toggleRow(rk, row)}
                    />
                  </td>
                )}
                {columns.map(col => (
                  <td key={String(col.key)} className="p-2 align-middle">
                    {String(row[col.dataIndex] ?? "")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
