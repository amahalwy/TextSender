import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import React from "react";
import { Field } from "react-final-form";
import { validateRequired } from "../../utils/validations";

const API = () => (
  <Field
    name="apiKey"
    validate={validateRequired}
    render={({ input, meta }) => (
      <FormControl mt="10px" isInvalid={meta.touched && meta.error}>
        <FormLabel htmlFor="api-key">API Key</FormLabel>
        <Input
          {...input}
          id="api-key"
          placeholder="API Key"
          data-testid="api-input"
        />
        {meta.touched && meta.error && (
          <FormErrorMessage>{meta.error}</FormErrorMessage>
        )}
      </FormControl>
    )}
  />
);

export default API;
