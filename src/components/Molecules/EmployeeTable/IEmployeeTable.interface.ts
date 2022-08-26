import { IEmployee } from "../../../interfaces/IEmployee.interface";

export interface IEmployeeTable {
  data: IEmployee[];
  onDeleteClicked: (id: string) => void;
}
