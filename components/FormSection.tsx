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
import { IFormSection, IValues } from "../typescript/interfaces";
import endpoints from "../config/endpoints";

const fetchNumbers = async (values: IValues) => {
  return await fetch(endpoints.FindTwilioEndpoint, {
    method: "POST",
    body: JSON.stringify(values),
  }).then((res) => res.json());
};

const FormSection: React.FC<IFormSection> = ({
  values,
  invalid,
  pristine,
  submitting,
  loadingNumbers,
  setNumbers,
  setShowBottom,
  setLoadingNumbers,
  setShowTwilioSection,
}) => {
  const findNumbers = (values: IValues) => {
    setLoadingNumbers(true);
    fetchNumbers(values).then((numbersFromTwillio) => {
      setNumbers(numbersFromTwillio);
      setShowTwilioSection(false);
      setShowBottom(true);
      setLoadingNumbers(false);
    });
  };

  return (
    <Box as="section">
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
      <Flex mt="6%" justifyContent="center">
        <Button
          type="button"
          disabled={submitting || pristine || invalid || loadingNumbers}
          isLoading={loadingNumbers}
          loadingText="Searching..."
          onClick={() => findNumbers(values)}
        >
          Find number(s)
        </Button>
      </Flex>
    </Box>
  );
};

export default FormSection;
