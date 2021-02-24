import { Form, Field } from "react-final-form";
import { useTimeoutFn, useAsyncFn } from "react-use";
import { CloseIcon, CheckIcon } from "@chakra-ui/icons";
import {
  Heading,
  Box,
  Button,
  VStack,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
  Select,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import PhoneNumber from "awesome-phonenumber";

const validatePhoneNumbers = (value) => {
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

export default BottomSection = ({
  submitting,
  pristine,
  form,
  values,
  setShow,
  numbers,
  invalid,
}) => {
  return (
    <Box>
      <Field
        name="from"
        validate={validateRequired}
        render={({ input, meta }) => (
          <FormControl isInvalid={meta.touched && meta.error}>
            <FormLabel htmlFor="from">Twilio phone number</FormLabel>
            <Select {...input} id="from" placeholder="Phone Number">
              <option value={undefined} />
              {numbers.map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </Select>
            {meta.touched && meta.error && (
              <FormErrorMessage>{meta.error}</FormErrorMessage>
            )}
          </FormControl>
        )}
      />

      <Field name="message" validate={validateRequired}>
        {({ input, meta }) => (
          <FormControl isInvalid={meta.touched && meta.error}>
            <FormLabel mt="10px" htmlFor="message">
              Message
            </FormLabel>
            <Textarea {...input} id="message" placeholder="Type here..." />
            {meta.touched && meta.error && (
              <FormErrorMessage>{meta.error}</FormErrorMessage>
            )}
          </FormControl>
        )}
      </Field>

      <Field
        name="numbers"
        validate={(value) =>
          validateRequired(value) || validatePhoneNumbers(value)
        }
        render={({ input, meta }) => (
          <FormControl isInvalid={meta.touched && meta.error}>
            <FormLabel htmlFor="phoneNumbers">Phone numbers</FormLabel>
            <Textarea
              {...input}
              id="phoneNumbers"
              placeholder="Phone numbers"
            />
            {meta.touched && meta.error && (
              <FormErrorMessage>{meta.error}</FormErrorMessage>
            )}
          </FormControl>
        )}
      />

      <Stack direction="row" mt="24px">
        <Button
          type="submit"
          disabled={submitting || pristine || invalid}
          colorScheme="teal"
        >
          Submit
        </Button>

        <Button
          type="reset"
          onClick={() => {
            setShow(false);
            form.reset();
          }}
          disabled={submitting || pristine}
        >
          Reset form
        </Button>
      </Stack>
    </Box>
  );
};
