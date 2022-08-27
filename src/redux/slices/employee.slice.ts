import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import IEmployeeState from "../types/IEmployeesState";
import { AppState } from "../store";
import { IEmployee } from "src/interfaces/IEmployee.interface";
import { BASE_URL } from "@/utils/Configurations";

export const fetchEmployees = createAsyncThunk(
  "employee/fetch",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}employee`);
      const data = await response.json();
      return data.data;
    } catch (e) {
      return rejectWithValue("Server Error");
    }
  }
);

export const fetchEmployeeById = createAsyncThunk(
  "employee/fetchById",
  async (id: string) => {
    const response = await fetch(`${BASE_URL}employee/${id}`);
    const data = await response.json();
    return data.data;
  }
);

export const addEmployees = createAsyncThunk(
  "employee/add",
  async (empData: IEmployee, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}employee`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(empData),
      });
      const data = await response.json();
      console.log(data);
      if (data.data) {
        return data.data;
      } else return rejectWithValue(data.message);
    } catch (e) {
      return rejectWithValue("Server Error");
    }
  }
);

export const updateEmployees = createAsyncThunk(
  "employee/update",
  async (
    { id, empData }: { id: string; empData: IEmployee },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${BASE_URL}employee/${id}`, {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(empData),
      });
      const data = await response.json();
      console.log(data);
      if (data.data) {
        return data.data;
      } else return rejectWithValue(data.message);
    } catch (e) {
      return rejectWithValue("Server Error");
    }
  }
);

export const deleteEmployees = createAsyncThunk(
  "employee/delete",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}employee/${id}`, {
        method: "DELETE", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.data) {
        return data.data;
      } else return rejectWithValue(data.message);
    } catch (e) {
      return rejectWithValue("Server Error");
    }
  }
);

export const employeeSlice = createSlice({
  name: "employee",

  initialState: {
    empList: [],
    messageLoading: "Test",
    messageAdding: "Test",
    messageUpdating: "",
    statusListFetching: "waiting",
    statusAdding: "waiting",
    statusUpdating: "waiting",
  } as IEmployeeState,

  reducers: {
    searchByName: (state, action) => {
      // The object you return is the full state object update in your reducer
      return {
        ...state,
        empListFiltered: [...state.empList].filter(
          (emp: IEmployee) =>
            emp.firstName
              .toLowerCase()
              .includes(action.payload.toLowerCase()) ||
            emp.lastName.toLowerCase().includes(action.payload.toLowerCase()) ||
            emp.email.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    },
  },

  extraReducers: (builder) => {
    //Hydrate state with wrapper
    builder.addCase(HYDRATE, (state, action: any) => {
      console.log("HYDRATE", state, action.payload);
      return {
        ...state,
        ...action.payload.employee,
      };
    });

    //Fetch Employees Reducer
    builder.addCase(fetchEmployees.fulfilled, (state, action: any) => {
      state.empList.push(...action.payload);
      state.statusListFetching = "success";
    });
    builder.addCase(fetchEmployees.pending, (state, action: any) => {
      state.statusListFetching = "pending";
    });
    builder.addCase(fetchEmployees.rejected, (state, action: any) => {
      state.statusListFetching = "failed";
      state.messageLoading = "Error Loading data, Server error!";
    });

    //Fetch Employee By Id Reducer
    builder.addCase(fetchEmployeeById.fulfilled, (state, action: any) => {
      state.employee = action.payload;
    });
    builder.addCase(fetchEmployeeById.rejected, (state, action: any) => {
      state.statusUpdating = "failed";
      state.messageUpdating = "Error Loading data";
    });

    //Add Employee Reducers
    builder.addCase(addEmployees.fulfilled, (state, action: any) => {
      console.log(action.payload);
      state.statusAdding = "success";
      state.messageAdding = "Successfully added Employee!";
      state.empList.push(action.payload);
    });
    builder.addCase(addEmployees.rejected, (state, action: any) => {
      state.messageAdding = action.payload ?? "Server Error";
      state.statusAdding = "failed";
    });

    //Update Employee Reducers
    builder.addCase(updateEmployees.fulfilled, (state, action: any) => {
      console.log(action.payload);
      state.statusUpdating = "success";
      state.messageUpdating = "Successfully updated Employee!";
    });
    builder.addCase(updateEmployees.rejected, (state, action: any) => {
      state.messageAdding = action.payload ?? "Server Error";
      state.statusAdding = "failed";
    });

    //delete Employee Reducers
    builder.addCase(deleteEmployees.fulfilled, (state, action: any) => {
      console.log(action.payload);
      state.empList = state.empList.filter(
        (emp: IEmployee) => emp.id !== action.payload.id
      );
      state.empListFiltered = state.empListFiltered?.filter(
        (emp: IEmployee) => emp.id !== action.payload.id
      );
    });
    builder.addCase(deleteEmployees.rejected, (state, action: any) => {
      state.messageAdding = action.payload ?? "Server Error";
      state.statusAdding = "failed";
    });
  },
});

export const { searchByName } = employeeSlice.actions;

export const selectEmployeeState = () => (state: AppState) =>
  state?.[employeeSlice.name];
