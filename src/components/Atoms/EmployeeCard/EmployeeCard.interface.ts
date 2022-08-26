import { IEmployee } from "../../../interfaces/IEmployee.interface";

export interface IEmployeeCard {
  employee: IEmployee;
  onDeleteClicked: (id: string) => void;
}
