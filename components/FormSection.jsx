import React from "react";
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field } from "react-final-form";
import { validateRequired } from "../utils/validations";

const fetchNumbers = (values) => {
  return fetch(process.env.NEXT_PUBLIC_FIND_TWILIO_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(values),
  }).then((res) => res.json());
};

const FormSection = ({
  values,
  submitting,
  pristine,
  invalid,
  loadingNumbers,
  setLoadingNumbers,
  setNumbers,
  setShowTwilioSection,
  setShowBottom,
}) => {
  const findNumbers = (values) => {
    setLoadingNumbers(true);
    fetchNumbers(values).then((numbersFromTwillio) => {
      setNumbers(numbersFromTwillio);
      setShowTwilioSection(false);
      setShowBottom(true);
      setLoadingNumbers(false);
    });
  };

  return (
    <Box>
      <Field
        name="accountSid"
        validate={validateRequired}
        render={({ input, meta }) => (
          <FormControl isInvalid={meta.touched && meta.error}>
            <FormLabel htmlFor="sid">Account SID</FormLabel>
            <Input {...input} id="sid" placeholder="Account SID" />
            {meta.touched && meta.error && (
              <FormErrorMessage>{meta.error}</FormErrorMessage>
            )}
          </FormControl>
        )}
      />
      <Field
        name="apiKey"
        validate={validateRequired}
        render={({ input, meta }) => (
          <FormControl mt="10px" isInvalid={meta.touched && meta.error}>
            <FormLabel htmlFor="api-key">API Key</FormLabel>
            <Input {...input} id="api-key" placeholder="API Key" />
            {meta.touched && meta.error && (
              <FormErrorMessage>{meta.error}</FormErrorMessage>
            )}
          </FormControl>
        )}
      />{" "}
      <Field
        name="apiSecret"
        validate={validateRequired}
        render={({ input, meta }) => (
          <FormControl mt="10px" isInvalid={meta.touched && meta.error}>
            <FormLabel htmlFor="api-secret">API Key Secret</FormLabel>
            <Input {...input} id="api-secret" placeholder="API Key Secret" />
            {meta.touched && meta.error && (
              <FormErrorMessage>{meta.error}</FormErrorMessage>
            )}
          </FormControl>
        )}
      />{" "}
      <Flex mt={"24px"} m="10px auto" justifyContent="center">
        <Button
          type="button"
          disabled={submitting || pristine || invalid || loadingNumbers}
          isLoading={loadingNumbers}
          loadingText="Searching..."
          onClick={() => {
            findNumbers(values);
          }}
        >
          Find number(s)
        </Button>
      </Flex>
    </Box>
  );
};

export default FormSection;
