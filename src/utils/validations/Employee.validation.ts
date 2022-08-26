import * as yup from "yup";
const EmployeeValidationSchema = yup.object({
  firstName: yup
    .string()
    .required("First Name is required!")
    .max(10, "First Name max length is 10 characters")
    .min(6, "First Name min length is 6 characters")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  lastName: yup
    .string()
    .required("First Name is required!")
    .max(10, "First Name max length is 10 characters")
    .min(6, "First Name min length is 6 characters")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  number: yup
    .string()
    .matches(
      /^(?:0|94|\+94)?(7(0|1|2|4|5|6|7|8)( |-)?)\d{7}$/,
      "Enter a valid Sri Lankan Number"
    )
    .required("Phone is required"),
  gender: yup
    .string()
    .required("Gender is required")
    .equals(["M", "F"], "Gender is required"),
});

export { EmployeeValidationSchema };
