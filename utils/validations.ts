import PhoneNumber from "awesome-phonenumber";

export const validateRequired = (value: string) =>
  value ? undefined : "Required";

export const validatePhoneNumbers = (value: string) => {
  if (!value) {
    return undefined;
  }

  const invalidNumbers: string[] = [];
  const numbers: string[] = value.split(",").map((number) => number.trim());

  numbers.forEach((number) => {
    const pnCa = new PhoneNumber(number, "CA");
    const pnUs = new PhoneNumber(number, "US");

    if (!pnCa.isValid() || !pnUs.isValid()) {
      invalidNumbers.push(number);
    }
  });

  if (invalidNumbers.length) {
    return invalidNumbers
      .map((number) => `${number} is an invalid CA/US number.`)
      .join("\n");
  }

  return undefined;
};
