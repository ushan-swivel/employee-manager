// import EmployeeList from "../pages/employee/list";
import { EmployeeTable } from "@/components/index";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Employee Table", () => {
  let expectedProps;
  let expectedPropsWithoutImage;

  beforeEach(() => {
    expectedProps = {
      data: [
        {
          id: "2121",
          firstName: "FirstName",
          lastName: "LastName",
          email: "test@gmail.com",
          number: "0765678567",
          gender: "M",
          photo: "https://randomuser.me/api/portraits/men/92.jpg",
        },
      ],
    };
  });

  test("should render firstName, lastName, email, phone, gender and image", () => {
    const { getByText, getByAltText } = render(
      <EmployeeTable {...expectedProps} />
    );
    const firstName = getByText(expectedProps.data[0].firstName);
    const lastName = getByText(expectedProps.data[0].lastName);
    const email = getByText(expectedProps.data[0].email);
    const number = getByText(expectedProps.data[0].number);
    const gender = getByText(expectedProps.data[0].gender);
    const photo = getByAltText(expectedProps.data[0].firstName);

    expect(firstName).toBeVisible();
    expect(lastName).toBeVisible();
    expect(email).toBeVisible();
    expect(number).toBeVisible();
    expect(gender).toBeVisible();
    expect(photo).toBeVisible();
  });
});
