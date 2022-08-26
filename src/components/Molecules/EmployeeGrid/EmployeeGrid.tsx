import * as React from "react";

import { IEmployeeGrid } from "./EmployeeGrid.interface";
import { Grid } from "@mui/material";

import { EmployeeCard } from "@/components/index";

const EmployeeGrid = ({ data, onDeleteClicked }: IEmployeeGrid) => {
  return (
    <Grid container spacing={2}>
      {data.map((emp) => {
        return (
          <Grid item lg={3} xs={12} sm={6} key={emp.id}>
            <EmployeeCard employee={emp} onDeleteClicked={onDeleteClicked} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export { EmployeeGrid };
