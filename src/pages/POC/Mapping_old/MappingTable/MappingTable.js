import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import Paper from "@mui/material/Paper";
import { useState } from "react";

const MappingTable = (props) => {
  const { mapping, selectedRow } = props;

  return (
    <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Value</TableCell>
            <TableCell>Target</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mapping.map((row, index) => (
            <TableRow
              onClick={(event) => {
                event.stopPropagation();
                props.onClick(row);
              }}
              key={index}
              style={{
                background: selectedRow === row ? "lightblue" : "white",
                cursor: "pointer",
              }}
            >
              <TableCell component="th" scope="row">
                {row.sourcePath}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.targetPath}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { MappingTable };
