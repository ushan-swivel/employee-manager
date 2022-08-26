import { IEmployee } from "../../../interfaces/IEmployee.interface";

export interface IEmployeeGrid {
  data: IEmployee[];
  onDeleteClicked: (id: string) => void;
}
