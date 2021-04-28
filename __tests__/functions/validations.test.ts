import React from "react";
import { validatePhoneNumbers } from "../../utils/validations";

describe("Validate Phone Numbers", () => {
  test("Expect validatePhoneNumbers to return undefined if given no argument", () => {
    //@ts-ignore
    expect(validatePhoneNumbers(false)).toBe(undefined);
  });
  test("Expect validatePhoneNumbers to return undefined when given valid number", () => {
    const validNumber = "4165625168";
    expect(validatePhoneNumbers(validNumber)).toBe(undefined);
  });
});
