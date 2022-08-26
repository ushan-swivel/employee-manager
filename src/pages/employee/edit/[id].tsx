import {
  Alert,
  Button,
  Card,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import type { NextPage } from "next";
import { useSelector, useStore } from "react-redux";
import {
  fetchEmployeeById,
  selectEmployeeState,
  updateEmployees,
} from "@/redux/slices/employee.slice";
import { useAppDispatch, wrapper } from "@/redux/store";
import styles from "@/styles/EmployeeForm.module.css";
import { useFormik } from "formik";
import { IEmployee } from "src/interfaces/IEmployee.interface";
import { useRouter } from "next/router";
import { EmployeeValidationSchema } from "@/utils/validations/Employee.validation";
const Edit: NextPage = (props) => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const { employee, statusUpdating, messageUpdating } = useSelector(
    selectEmployeeState()
  );

  //initial values
  const initialValues: IEmployee = {
    firstName: employee?.firstName ?? "",
    lastName: employee?.lastName ?? "",
    email: employee?.email ?? "",
    number: employee?.number ?? "",
    photo: employee?.photo ?? "",
    gender: employee?.gender ?? "",
  };

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: EmployeeValidationSchema,
      enableReinitialize: true,
      onSubmit: (values) => {
        console.log(values);
        dispatch(
          updateEmployees({ id: String(employee?.id), empData: values })
        );
      },
    });

  return (
    <div className={styles.container}>
      <h1>Edit Employee</h1>
      <Button
        type="button"
        variant="contained"
        onClick={() => router.back()}
        className={styles.listViewButton}
      >
        List View
      </Button>

      <form className={styles.addForm} onSubmit={handleSubmit}>
        <Card elevation={4} className={styles.wrapperCard}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <p>First Name</p>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                type="text"
                size="small"
                variant="standard"
                name="firstName"
                className={styles.textField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <p>Last Name</p>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                type="text"
                variant="standard"
                name="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <p>Email</p>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                type="text"
                variant="standard"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <p>Phone</p>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                type="text"
                variant="standard"
                name="number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.number}
                error={touched.number && Boolean(errors.number)}
                helperText={touched.number && errors.number}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <p>Photo Url</p>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                type="text"
                variant="standard"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.photo}
                error={touched.photo && Boolean(errors.photo)}
                helperText={touched.photo && errors.photo}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <p>Gender</p>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Select
                type="text"
                variant="standard"
                name="gender"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.gender}
                error={touched.gender && Boolean(errors.gender)}
                fullWidth
              >
                <MenuItem value={"choose"}>Choose</MenuItem>
                <MenuItem value={"M"}>Male</MenuItem>
                <MenuItem value={"F"}>Female</MenuItem>
              </Select>
              <FormHelperText error={true}>
                {touched.gender && errors.gender}
              </FormHelperText>
            </Grid>
            <Grid item xs={8} />
            <Grid item xs={4}>
              <Button
                type="submit"
                variant="outlined"
                className={styles.saveButton}
              >
                Save
              </Button>
            </Grid>

            {(statusUpdating == "failed" || statusUpdating == "success") && (
              <Grid item xs={12}>
                <Alert
                  color={statusUpdating == "failed" ? "error" : "success"}
                  className={styles.alert}
                >
                  {messageUpdating}
                </Alert>
              </Grid>
            )}
          </Grid>
        </Card>
      </form>
    </div>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      await store.dispatch(fetchEmployeeById(String(params?.id)));

      //Debug State on redux store inside the server
      //console.log("State on server", store.getState());

      return {
        props: {},
      };
    }
);

export default Edit;
