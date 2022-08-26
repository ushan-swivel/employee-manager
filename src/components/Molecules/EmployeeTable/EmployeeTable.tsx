import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IEmployeeTable } from "./IEmployeeTable.interface";
import { Avatar } from "@mui/material";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Link from "next/link";

import Image from "next/image";

const EmployeeTable = ({ data, onDeleteClicked }: IEmployeeTable) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Photo</TableCell>
            <TableCell align="center">First Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Avatar>
                  {row.photo ? (
                    <Image
                      src={String(row.photo)}
                      alt={row.firstName}
                      layout="fill"
                    />
                  ) : (
                    `${row.firstName.charAt(0).toUpperCase()}${row.lastName
                      .charAt(0)
                      .toUpperCase()}`
                  )}
                </Avatar>
              </TableCell>
              <TableCell align="center">{row.firstName}</TableCell>
              <TableCell align="center">{row.lastName}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.number}</TableCell>
              <TableCell align="center">{row.gender}</TableCell>
              <TableCell align="center">
                <IconButton>
                  <Link href={`/employee/edit/${row.id}`}>
                    <EditIcon />
                  </Link>
                </IconButton>
                <IconButton
                  onClick={() => {
                    onDeleteClicked(String(row.id));
                  }}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { EmployeeTable };
