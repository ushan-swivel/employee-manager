import {
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  Fab,
  Grid,
} from "@mui/material";
import { GridView } from "@mui/icons-material";
import type { NextPage } from "next";
import { useSelector } from "react-redux";
import {
  deleteEmployees,
  fetchEmployees,
  selectEmployeeState,
} from "../../redux/slices/employee.slice";

import { useAppDispatch, wrapper } from "@/redux/store";
import styles from "@/styles/EmployeeList.module.css";
import { EmployeeTable, AlertDialog, EmployeeGrid } from "@/components/index";
import { useRouter } from "next/router";
import { useState } from "react";

const List: NextPage = (props) => {
  //Next Router
  const router = useRouter();

  //Debug Redux State
  // console.log("State on render", useStore().getState(), props);

  //Access state from redux employee state
  const { statusListFetching, messageLoading, empList } = useSelector(
    selectEmployeeState()
  );

  //Keep track of grid mode status
  const [gridMode, setGridMode] = useState<boolean>(false);
  // Show confirmation Dialog on Delete
  const [showDialog, setShowDialog] = useState<boolean>(false);
  // Keep Track of delete employee id
  const [deleteId, setDeleteId] = useState<string>();

  //Redux dispatch function
  const dispatch = useAppDispatch();

  //Handle Deleting Employee
  const handleDeleteEmployee = (id: string) => {
    setDeleteId(id);
    setShowDialog(true);
  };

  //Delete Selected employee after confirmation
  const deleteEmployee = () => {
    dispatch(deleteEmployees({ id: String(deleteId) }));
    setDeleteId("");
    setShowDialog(false);
  };
  return (
    <div className={styles.container}>
      <h1>Employee List</h1>
      <div className={styles.actionsWrapper}>
        <Button
          type="button"
          variant="contained"
          onClick={() => router.push("/employee/add")}
        >
          Add New Employee
        </Button>

        <Fab
          color="primary"
          size="small"
          sx={{ marginLeft: 4 }}
          onClick={() => {
            setGridMode(!gridMode);
          }}
        >
          <GridView />
        </Fab>
      </div>

      {statusListFetching == "failed" && (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <Alert severity="error">
              <AlertTitle>{messageLoading}</AlertTitle>
            </Alert>
          </Grid>
        </Grid>
      )}
      {statusListFetching == "pending" ? (
        <CircularProgress />
      ) : gridMode ? (
        <EmployeeGrid
          data={empList}
          onDeleteClicked={(id) => handleDeleteEmployee(id)}
        />
      ) : (
        <EmployeeTable
          data={empList}
          onDeleteClicked={(id) => handleDeleteEmployee(id)}
        />
      )}
      <AlertDialog
        show={showDialog}
        title={"Delete Dialog"}
        message="Are You Sure You Want To Delete This?"
        onClickOkay={() => {
          deleteEmployee();
        }}
        onClickCancel={() => {
          setShowDialog(false);
        }}
      />
    </div>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      await store.dispatch(fetchEmployees());

      //Debug State on redux store inside the server
      //console.log("State on server", store.getState());

      return {
        props: {},
      };
    }
);

export default List;
