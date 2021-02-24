import PhoneNumber from "awesome-phonenumber";

export const validateRequired = (value) => {
  if (!value) {
    return "Required";
  }

  return undefined;
};

export const validatePhoneNumbers = (value) => {
  if (!value) {
    return undefined;
  }

  const invalidNumbers = [];
  const numbers = value.split(",").map((number) => number.trim());

  numbers.forEach((number) => {
    const pnCa = PhoneNumber(number, "CA");
    const pnUs = PhoneNumber(number, "US");

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
