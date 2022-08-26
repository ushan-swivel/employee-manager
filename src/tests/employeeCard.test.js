// import EmployeeList from "../pages/employee/list";
import { EmployeeCard } from "@/components/index";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("EmployeeCard", () => {
  let expectedProps;
  let expectedPropsWithoutImage;

  beforeEach(() => {
    expectedProps = {
      employee: {
        firstName: "FirstName",
        lastName: "LastName",
        email: "test@gmail.com",
        number: "0765678567",
        gender: "M",
        photo: "https://randomuser.me/api/portraits/men/92.jpg",
      },
    };
    expectedPropsWithoutImage = {
      employee: {
        firstName: "FirstName",
        lastName: "LastName",
        email: "test@gmail.com",
        number: "0765678567",
        gender: "M",
      },
    };
  });

  test("should render name, email, phone, gender and image", () => {
    const { getByText, getByAltText } = render(
      <EmployeeCard {...expectedProps} />
    );
    const name = getByText(
      `${expectedProps.employee.firstName} ${expectedProps.employee.lastName}`
    );
    const email = getByText(expectedProps.employee.email);
    const number = getByText(expectedProps.employee.number);
    const gender = getByText("Male");
    const photo = getByAltText(expectedProps.employee.firstName);

    expect(name).toBeVisible();
    expect(email).toBeVisible();
    expect(number).toBeVisible();
    expect(gender).toBeVisible();
    expect(photo).toBeVisible();
  });

  test("should render name, email, phone, gender and text avatar", () => {
    const { getByText, getByAltText } = render(
      <EmployeeCard {...expectedPropsWithoutImage} />
    );
    const name = getByText(
      `${expectedPropsWithoutImage.employee.firstName} ${expectedPropsWithoutImage.employee.lastName}`
    );
    const email = getByText(expectedPropsWithoutImage.employee.email);
    const number = getByText(expectedPropsWithoutImage.employee.number);
    const gender = getByText("Male");
    const textAvatar = getByText("FL");

    expect(name).toBeVisible();
    expect(email).toBeVisible();
    expect(number).toBeVisible();
    expect(gender).toBeVisible();
    expect(textAvatar).toBeVisible();
  });
});
