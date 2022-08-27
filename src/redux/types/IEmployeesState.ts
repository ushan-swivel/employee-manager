import { IEmployee } from "src/interfaces/IEmployee.interface";

interface IEmployeeState {
  empList: any[];
  empListFiltered?: any[];
  employee?: IEmployee;
  messageLoading: string;
  statusListFetching: "success" | "failed" | "pending" | "waiting";
  messageAdding: string;
  statusAdding: "success" | "failed" | "pending" | "waiting";
  messageUpdating: string;
  statusUpdating: "success" | "failed" | "pending" | "waiting";
}

export default IEmployeeState;
