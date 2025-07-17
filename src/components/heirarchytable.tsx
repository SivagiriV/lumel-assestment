import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import type { RowData } from "../data/initialData";
import { applyAllocation } from "../utils";

interface Props {
  data: RowData[];
  setData: React.Dispatch<React.SetStateAction<RowData[]>>;
}

const HierarchyTable: React.FC<Props> = ({ data, setData }) => {
  const [inputs, setInputs] = useState<Record<string, string>>({});

  const onInputChange = (id: string, val: string) =>
    setInputs((prev) => ({ ...prev, [id]: val }));

  const allocate = (id: string, mode: "percent" | "value") => {
    const val = parseFloat(inputs[id]);
    if (isNaN(val)) return;
    const updated = applyAllocation(data, id, val, mode);
    setData(updated);
    setInputs((prev) => ({ ...prev, [id]: "" }));
  };

  const renderRows = (rows: RowData[], level = 0.5): React.ReactNode[] =>
    rows.flatMap((r) => [
      <TableRow key={r.id}>
        <TableCell sx={{ pl: level * 4, color: "#fff" }}>{r.label}</TableCell>
        <TableCell sx={{ color: "#fff" }}>{r.value.toFixed(2)}</TableCell>
        <TableCell sx={{ color: "#fff" }}>
          <TextField
            size="small"
            variant="outlined"
            value={inputs[r.id] || ""}
            onChange={(e) => onInputChange(r.id, e.target.value)}
            inputProps={{ style: { color: "#fff" } }}
          />
        </TableCell>
        <TableCell>
          <Button variant="contained" onClick={() => allocate(r.id, "percent")}>
            %
          </Button>
        </TableCell>
        <TableCell>
          <Button variant="outlined" onClick={() => allocate(r.id, "value")}>
            Val
          </Button>
        </TableCell>
        <TableCell sx={{ color: "#fff" }}>{r.variance.toFixed(2)}%</TableCell>
      </TableRow>,
      ...(r.children ? renderRows(r.children, level + 1) : []),
    ]);

  const total = data.reduce((sum, x) => sum + x.value, 0);
  const tableHeadData = [
    {
      id: 1,
      label: "Label",
    },
    {
      id: 2,
      label: "Value",
    },
    {
      id: 3,
      label: "Input",
    },
    {
      id: 4,
      label: "Allocation %",
    },
    {
      id: 5,
      label: "Allocation Val",
    },
    {
      id: 6,
      label: "Variance",
    },
  ];
  return (
    <TableContainer component={Paper} sx={{ bgcolor: "#2c2c2c", mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "#212121" }}>
            {tableHeadData.map((item, idx) => {
              return (
                <TableCell key={idx} sx={{ color: "#fff", fontWeight: "bold" }}>
                  {item?.label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {renderRows(data)}
          <TableRow>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              Grand Total
            </TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              {total.toFixed(2)}
            </TableCell>
            <TableCell colSpan={3} />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HierarchyTable;
